import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

test('lead submission source files avoid browser secret exposure', () => {
  const client = fs.readFileSync('src/components/forms/submission.ts', 'utf8');
  assert.equal(client.includes('BIZOSTO_API_KEY'), false);
  assert.equal(client.includes('TURNSTILE_SECRET_KEY'), false);
});

test('environment example keeps secrets server-only', () => {
  const env = fs.readFileSync('.env.example', 'utf8');
  assert.match(env, /BIZOSTO_API_KEY=/);
  assert.equal(env.includes('NEXT_PUBLIC_BIZOSTO'), false);
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
  assert.match(route, /sendToBizosto/);
  assert.match(route, /after\(async \(\) =>/);
  assert.ok(
    route.indexOf('sendToBizosto') < route.indexOf('sendMetaLeadEvent'),
    'Meta delivery must be scheduled only after Bizosto succeeds',
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
    BIZOSTO_API_URL: 'https://api.example.test/leads',
    BIZOSTO_TENANT_ID: 'wdd',
    BIZOSTO_API_KEY: 'server-only-test-key',
    BIZOSTO_API_KEY_HEADER: 'x-api-key',
    BIZOSTO_TENANT_HEADER: 'x-tenant-id',
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

  const missingRateLimit = { ...complete };
  delete missingRateLimit.LEAD_DISTRIBUTED_RATE_LIMIT_ID;
  assert.equal(run(missingRateLimit).status, 1);

  const missingHostname = { ...complete };
  delete missingHostname.TURNSTILE_ALLOWED_HOSTNAMES;
  assert.equal(run(missingHostname).status, 1);

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
