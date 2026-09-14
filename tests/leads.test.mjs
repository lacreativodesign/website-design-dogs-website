import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire, Module } from 'node:module';

const require = createRequire(import.meta.url);

function loadBizostoAdapter() {
  const typescript = require('typescript');
  const previous = Module._extensions['.ts'];

  Module._extensions['.ts'] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const result = typescript.transpileModule(source, {
      compilerOptions: {
        module: typescript.ModuleKind.CommonJS,
        target: typescript.ScriptTarget.ES2022,
      },
    });

    module._compile(result.outputText, filename);
  };

  try {
    return require('../src/lib/leads/bizosto-adapter.ts');
  } finally {
    if (previous) Module._extensions['.ts'] = previous;
    else delete Module._extensions['.ts'];
  }
}

const leadEnvelope = {
  submissionId: 'a9a46c77-9929-4ed2-8b93-2c9f09b0e5b3',
  formType: 'quote',
  source: 'website',
  contact: {
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555 0100',
  },
  business: {
    name: 'Acme Ltd',
    website: 'https://acme.example',
    industry: 'Professional services',
  },
  enquiry: {
    service: 'New Website',
    summary: 'We need a website that creates qualified enquiries.',
  },
  project: {
    types: ['New Website'],
    pages: '1–5 pages',
    goal: 'Generate qualified enquiries',
    features: ['Contact or quote form'],
    contentStatus: 'Ready',
    brandingStatus: 'Brand materials ready',
    notWorking: 'Our old website is difficult to navigate.',
    accomplish: 'Turn visitors into qualified leads.',
    details: 'Add a prominent booking call to action.',
  },
  package: {
    preferred: 'Starter',
    budget: '$500–$999',
    timing: 'Within 30 days',
  },
  attribution: {
    landingPage: 'https://websitedesigndogs.com/services?utm_source=google',
    currentPage: 'https://websitedesigndogs.com/contact',
    referrer: 'https://www.google.com/',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'spring',
    utmTerm: 'web design',
    utmContent: 'creative-a',
    gclid: 'google-click-id',
    fbclid: 'facebook-click-id',
  },
  consent: {
    contact: true,
    privacyPolicy: true,
    agreedAt: '2026-08-18T10:00:00.000Z',
  },
};

const leadConfig = {
  apiUrl: 'https://app.bizosto.com/api/ingest/leads',
  apiKey: 'server-only-test-key',
  timeoutMs: 1_000,
};

test('lead submission source files avoid browser secret exposure', () => {
  const client = fs.readFileSync('src/components/forms/submission.ts', 'utf8');
  assert.equal(client.includes('BIZOSTO_INGEST_KEY'), false);
  assert.equal(client.includes('TURNSTILE_SECRET_KEY'), false);
  assert.equal(client.includes('RESEND_API_KEY'), false);
});

test('environment example keeps secrets server-only', () => {
  const env = fs.readFileSync('.env.example', 'utf8');
  assert.match(env, /BIZOSTO_INGEST_KEY=/);
  assert.match(env, /RESEND_API_KEY=/);
  assert.match(env, /LEAD_EMAIL_TO=leads@websitedesigndogs\.com/);
  assert.equal(env.includes('NEXT_PUBLIC_BIZOSTO'), false);
  assert.equal(env.includes('NEXT_PUBLIC_RESEND'), false);

  const audit = fs.readFileSync('scripts/audit-production-build.mjs', 'utf8');
  assert.match(audit, /BIZOSTO_INGEST_KEY/);
});

test('first-touch attribution is initialized from the shared root layout', () => {
  const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
  const capture = fs.readFileSync(
    'src/components/forms/attribution-capture.tsx',
    'utf8',
  );
  const attribution = fs.readFileSync(
    'src/components/forms/attribution.ts',
    'utf8',
  );

  assert.match(layout, /<AttributionCapture\s*\/>/);
  assert.match(capture, /getAttribution\(\)/);
  assert.match(attribution, /sessionStorage\.setItem/);
  assert.match(attribution, /window\.location\.origin/);
});

test('consent values and timestamp come from the checked visitor submission', () => {
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');
  assert.match(validation, /contact: p\.consent === true/);
  assert.match(validation, /privacyPolicy: p\.consent === true/);
  assert.match(validation, /agreedAt: submittedAt/);

  for (const file of [
    'src/components/forms/contact-form.tsx',
    'src/components/forms/quote-form.tsx',
    'src/components/campaigns/campaign-lead-form.tsx',
  ]) {
    const form = fs.readFileSync(file, 'utf8');
    assert.match(form, /type="checkbox"\s+required/);
    assert.match(form, /href="\/privacy-policy"/);
  }
});

test('Bizosto payload preserves enquiry details, attribution, and checked consent', () => {
  const { toBizostoPayload } = loadBizostoAdapter();
  const payload = toBizostoPayload(leadEnvelope);

  assert.equal(payload.lead.name, 'Jane Smith');
  assert.equal(payload.lead.email, 'jane@example.com');
  assert.equal(payload.lead.phone, '+1 555 0100');
  assert.equal(payload.lead.company, 'Acme Ltd');
  assert.equal(payload.lead.source, 'website');
  assert.match(payload.lead.message, /Preferred package: Starter/);
  assert.match(payload.lead.message, /Generate qualified enquiries/);
  assert.deepEqual(payload.attribution.utm, {
    source: 'google',
    medium: 'cpc',
    campaign: 'spring',
    term: 'web design',
    content: 'creative-a',
  });
  assert.equal(payload.attribution.landingPage, leadEnvelope.attribution.landingPage);
  assert.equal(payload.attribution.currentPage, leadEnvelope.attribution.currentPage);
  assert.equal(payload.attribution.gclid, 'google-click-id');
  assert.equal(payload.attribution.fbclid, 'facebook-click-id');
  assert.deepEqual(payload.consent, leadEnvelope.consent);
});

test('upstream retry reuses the idempotency key and accepts duplicate success', async () => {
  const { sendToBizosto } = loadBizostoAdapter();
  const originalFetch = globalThis.fetch;
  const requests = [];

  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });

    if (requests.length === 1) {
      return Response.json(
        { ok: false, error: 'Temporary upstream failure.' },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      duplicate: true,
      leadId: 'bizosto-existing-lead',
    });
  };

  try {
    const result = await sendToBizosto(leadEnvelope, leadConfig);

    assert.equal(requests.length, 2);
    assert.equal(requests[0].url, leadConfig.apiUrl);
    assert.equal(requests[0].options.headers['x-api-key'], leadConfig.apiKey);
    assert.equal(
      requests[0].options.headers['Idempotency-Key'],
      leadEnvelope.submissionId,
    );
    assert.equal(
      requests[1].options.headers['Idempotency-Key'],
      requests[0].options.headers['Idempotency-Key'],
    );
    assert.deepEqual(result, {
      referenceId: 'bizosto-existing-lead',
      upstreamStatus: 200,
      duplicate: true,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('upstream authentication failures retain diagnostics without leaking the secret', async () => {
  const { sendToBizosto } = loadBizostoAdapter();
  const originalFetch = globalThis.fetch;
  let attempts = 0;

  globalThis.fetch = async () => {
    attempts += 1;
    return Response.json(
      { ok: false, error: `Invalid credentials: ${leadConfig.apiKey}` },
      { status: 401 },
    );
  };

  try {
    await assert.rejects(
      sendToBizosto(leadEnvelope, leadConfig),
      (error) => {
        assert.equal(error.code, 'INTEGRATION_MISCONFIGURED');
        assert.equal(error.upstreamStatus, 401);
        assert.equal(error.upstreamMessage, 'Invalid credentials: [redacted]');
        assert.equal(error.upstreamMessage.includes(leadConfig.apiKey), false);
        return true;
      },
    );
    assert.equal(attempts, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('campaign implementation uses server-owned offer mapping and allowlisted slugs', () => {
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');
  const retiredPrice = [2, 4, 9].join('');
  assert.match(validation, /WDD-STARTER-499/);
  assert.match(validation, /regularPrice: 499/);
  assert.match(validation, /promotionalPrice: 499/);
  assert.match(validation, /savings: 0/);
  assert.equal(validation.includes(retiredPrice), false);
  assert.match(validation, /cleaning: "Cleaning Companies"/);
  assert.match(validation, /"home-services": "Home-Service Businesses"/);
});

test('campaign client does not send browser-controlled pricing or PII analytics fields', () => {
  const form = fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8');
  assert.equal(/regularPrice|promotionalPrice|savings/.test(form.replace(/campaignOffer\.(regularPrice|promotionalPrice|savings)/g, '')), false);
  const events = fs.readFileSync('src/components/forms/analytics-events.ts', 'utf8');
  assert.equal(/fullName|email|phone|businessName|note|referenceId|turnstile/i.test(events), false);
});

test('Turnstile is bound to the form action, submission, hostname, and current token lifetime', () => {
  const widget = fs.readFileSync('src/components/forms/turnstile-widget.tsx', 'utf8');
  const server = fs.readFileSync('src/lib/leads/turnstile.ts', 'utf8');
  const route = fs.readFileSync('src/app/api/leads/route.ts', 'utf8');

  for (const action of ['contact_lead', 'quote_lead', 'campaign_lead']) {
    assert.match(widget, new RegExp(action));
    assert.match(route, new RegExp(action));
  }

  assert.match(widget, /cData/);
  assert.match(widget, /interaction-only/);
  assert.match(widget, /refresh-expired/);
  assert.match(server, /idempotency_key/);
  assert.match(server, /maxTokenLength = 2_048/);
  assert.match(server, /maxTokenAgeMs = 5 \* 60 \* 1_000/);
  assert.match(server, /turnstileAllowedHostnames\.includes/);
  assert.match(server, /data\?\.action === context\.action/);
  assert.match(server, /data\?\.cdata === context\.cData/);
});

test('production lead gate requires managed anti-spam infrastructure', () => {
  const script = fs.readFileSync('scripts/check-production-env.mjs', 'utf8');
  const env = fs.readFileSync('.env.example', 'utf8');

  assert.match(script, /LEAD_DISTRIBUTED_RATE_LIMIT_ID/);
  assert.match(script, /TURNSTILE_ALLOWED_HOSTNAMES/);
  assert.match(env, /LEAD_DISTRIBUTED_RATE_LIMIT_REQUIRED=true/);
  assert.match(env, /TURNSTILE_REQUIRED=true/);
});

test('Meta CAPI is server-only, consent-gated, hashed, and deduplicated', () => {
  const client = fs.readFileSync('src/components/forms/submission.ts', 'utf8');
  const server = fs.readFileSync('src/lib/tracking/meta-capi.ts', 'utf8');
  const route = fs.readFileSync('src/app/api/leads/route.ts', 'utf8');
  const events = fs.readFileSync('src/lib/tracking/events.ts', 'utf8');

  assert.equal(client.includes('META_CAPI_ACCESS_TOKEN'), false);
  assert.match(server, /META_CAPI_ACCESS_TOKEN/);
  assert.match(server, /marketingConsent === true/);
  assert.match(server, /sha256\(envelope\.contact\.email/);
  assert.match(server, /event_id: envelope\.submissionId/);
  assert.match(route, /deliverLead/);
  assert.match(route, /after\(async \(\) =>/);
  assert.ok(
    route.indexOf('deliverLead') < route.indexOf('sendMetaLeadEvent'),
    'Meta delivery must be scheduled only after durable lead capture succeeds',
  );
  assert.match(events, /"eventId"/);
});

test('production environment gate validates Meta activation without exposing the token', () => {
  const script = fs.readFileSync('scripts/check-production-env.mjs', 'utf8');
  const env = fs.readFileSync('.env.example', 'utf8');

  assert.match(script, /META_DATASET_ID/);
  assert.match(script, /META_GRAPH_API_VERSION/);
  assert.match(script, /META_CAPI_TEST_EVENT_CODE/);
  assert.doesNotMatch(script, /console\.log\([^)]*META_CAPI_ACCESS_TOKEN/);
  assert.match(env, /META_CAPI_ENABLED=false/);
  assert.match(env, /META_CAPI_ACCESS_TOKEN=/);
});

test('production environment gate passes a complete setup and blocks missing controls', () => {
  const complete = {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: 'https://websitedesigndogs.com',
    LEAD_SUBMISSION_ENABLED: 'true',
    LEAD_EMAIL_ENABLED: 'true',
    LEAD_BIZOSTO_ENABLED: 'false',
    RESEND_API_KEY: 'test-resend-key-value',
    LEAD_EMAIL_FROM: 'Website Design Dogs <leads@websitedesigndogs.com>',
    LEAD_EMAIL_TO: 'leads@websitedesigndogs.com',
    LEAD_EMAIL_TIMEOUT_MS: '8000',
    BIZOSTO_API_URL: 'https://app.bizosto.com/api/ingest/leads',
    LEAD_ALLOWED_ORIGINS: 'https://websitedesigndogs.com,https://www.websitedesigndogs.com',
    LEAD_REQUEST_TIMEOUT_MS: '10000',
    LEAD_RATE_LIMIT_WINDOW_MS: '600000',
    LEAD_RATE_LIMIT_MAX: '5',
    LEAD_DISTRIBUTED_RATE_LIMIT_ID: 'wdd-lead-submission',
    LEAD_DISTRIBUTED_RATE_LIMIT_REQUIRED: 'true',
    TURNSTILE_REQUIRED: 'true',
    TURNSTILE_SECRET_KEY: 'turnstile-test-secret',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'turnstile-test-site-key',
    TURNSTILE_ALLOWED_HOSTNAMES: 'websitedesigndogs.com,www.websitedesigndogs.com',
    NEXT_PUBLIC_ENABLE_GTM: 'true',
    NEXT_PUBLIC_GTM_ID: 'GTM-ABC1234',
    NEXT_PUBLIC_CONSENT_BANNER_ENABLED: 'true',
    META_CAPI_ENABLED: 'false',
  };
  const run = (env) =>
    spawnSync(
      process.execPath,
      ['scripts/check-production-env.mjs', '--production'],
      { env, encoding: 'utf8' },
    );

  assert.equal(run(complete).status, 0);

  const missingEmailKey = { ...complete };
  delete missingEmailKey.RESEND_API_KEY;
  assert.equal(run(missingEmailKey).status, 1);

  const missingRateLimit = { ...complete };
  delete missingRateLimit.LEAD_DISTRIBUTED_RATE_LIMIT_ID;
  assert.equal(run(missingRateLimit).status, 1);

  const missingHostname = { ...complete };
  delete missingHostname.TURNSTILE_ALLOWED_HOSTNAMES;
  assert.equal(run(missingHostname).status, 1);

  const bizostoMode = {
    ...complete,
    LEAD_BIZOSTO_ENABLED: 'true',
    BIZOSTO_INGEST_KEY: 'server-only-test-key',
  };
  assert.equal(run(bizostoMode).status, 0);

  const defaultEndpoint = { ...bizostoMode };
  delete defaultEndpoint.BIZOSTO_API_URL;
  assert.equal(run(defaultEndpoint).status, 0);

  const missingIngestKey = { ...bizostoMode };
  delete missingIngestKey.BIZOSTO_INGEST_KEY;
  assert.equal(run(missingIngestKey).status, 1);

  const metaTestMode = {
    ...complete,
    META_CAPI_ENABLED: 'true',
    META_DATASET_ID: '1234567890',
    META_CAPI_ACCESS_TOKEN: 'meta-server-only-test-access-token',
    META_GRAPH_API_VERSION: 'v25.0',
    META_CAPI_TEST_EVENT_CODE: 'TEST123',
  };
  assert.equal(run(metaTestMode).status, 1);

  delete metaTestMode.META_CAPI_TEST_EVENT_CODE;
  assert.equal(run(metaTestMode).status, 0);
});