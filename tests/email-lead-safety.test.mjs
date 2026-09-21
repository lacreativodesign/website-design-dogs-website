import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire, Module } from 'node:module';

const require = createRequire(import.meta.url);

function loadTypeScriptModule(modulePath) {
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
    for (const key of Object.keys(require.cache)) {
      if (key.includes('/src/lib/leads/')) delete require.cache[key];
    }
    return require(modulePath);
  } finally {
    if (previous) Module._extensions['.ts'] = previous;
    else delete Module._extensions['.ts'];
  }
}

const envelope = {
  schemaVersion: '1.0',
  submissionId: '11111111-2222-4333-8444-555555555555',
  formType: 'quote',
  brand: 'Website Design Dogs',
  brandSlug: 'website-design-dogs',
  submittedAt: '2026-09-13T20:00:00.000Z',
  source: 'website',
  contact: {
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+14159002374',
    phoneCountry: 'US',
  },
  business: {
    name: 'Acme Home Services',
    website: 'https://acme.example',
    industry: 'Home services',
  },
  enquiry: {
    service: 'Website Design',
    summary: 'Need a lead-generating website.',
  },
  project: {
    primaryType: 'website-design',
    scope: {
      size: 'web-pages-8-10',
      complexity: 'web-integrations-3',
    },
    types: ['Website Design & Development', 'Analytics & Reporting'],
    pages: '6–10 pages',
    goal: 'Generate qualified leads',
    features: ['Contact or quote form', 'Analytics & reporting'],
    contentStatus: 'Needs copywriting',
    brandingStatus: 'Some materials ready',
    existingPlatform: 'WordPress',
    notWorking: 'The current website is dated and does not convert.',
    accomplish: 'Generate qualified leads and present the business professionally.',
    details: 'Prioritize mobile performance and clear calls to action.',
  },
  package: {
    preferred: 'Starter',
    budget: '$500–$999',
    timing: 'Within 30 days',
  },
  attribution: {
    landingPage: 'https://www.websitedesigndogs.com/?utm_source=meta',
    currentPage: 'https://www.websitedesigndogs.com/contact',
    utmSource: 'meta',
    utmMedium: 'paid_social',
    utmCampaign: 'wdd-launch',
    fbclid: 'meta-click-id',
  },
  consent: {
    contact: true,
    privacyPolicy: true,
    agreedAt: '2026-09-13T20:00:00.000Z',
  },
};

const config = {
  enabled: true,
  bizostoEnabled: true,
  emailEnabled: true,
  apiUrl: 'https://app.bizosto.com/api/ingest/leads',
  apiKey: 'bizosto-test-value',
  emailApiKey: 'email-test-value',
  emailFrom: 'Website Design Dogs <leads@websitedesigndogs.com>',
  emailTo: 'leads@websitedesigndogs.com',
  emailTimeoutMs: 1000,
  timeoutMs: 1000,
};

test('email adapter sends the complete lead to the permanent WDD safety inbox', async () => {
  const { sendLeadEmail, toLeadEmailText } = loadTypeScriptModule(
    '../src/lib/leads/email-adapter.ts',
  );
  const originalFetch = globalThis.fetch;
  const requests = [];

  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return Response.json({ id: 'provider-message-id' }, { status: 200 });
  };

  try {
    const result = await sendLeadEmail(envelope, config);
    assert.equal(result.providerMessageId, 'provider-message-id');
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, 'https://api.resend.com/emails');
    assert.equal(
      requests[0].options.headers['Idempotency-Key'],
      `wdd-lead/${envelope.submissionId}`,
    );

    const body = JSON.parse(requests[0].options.body);
    assert.deepEqual(body.to, ['leads@websitedesigndogs.com']);
    assert.equal(body.reply_to, envelope.contact.email);
    assert.match(body.subject, /WDD quote lead/);
    assert.match(body.text, /UTM campaign: wdd-launch/);
    assert.match(body.text, /Meta click ID: meta-click-id/);
    assert.match(body.text, /Phone country: United States/);
    assert.match(toLeadEmailText(envelope), /Privacy policy consent: yes/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('customer receives a branded transactional confirmation with the complete quote brief', async () => {
  const {
    sendCustomerConfirmationEmail,
    toCustomerConfirmationHtml,
    toCustomerConfirmationText,
  } = loadTypeScriptModule('../src/lib/leads/email-adapter.ts');
  const originalFetch = globalThis.fetch;
  const requests = [];

  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return Response.json({ id: 'customer-confirmation-id' }, { status: 200 });
  };

  try {
    const result = await sendCustomerConfirmationEmail(envelope, config);
    assert.equal(result.providerMessageId, 'customer-confirmation-id');
    assert.equal(requests.length, 1);
    assert.equal(
      requests[0].options.headers['Idempotency-Key'],
      `wdd-confirmation/${envelope.submissionId}`,
    );

    const body = JSON.parse(requests[0].options.body);
    assert.deepEqual(body.to, [envelope.contact.email]);
    assert.equal(body.reply_to, 'leads@websitedesigndogs.com');
    assert.match(body.subject, /project brief/i);
    assert.match(body.text, /Preferred package: Starter/);
    assert.match(body.text, /Phone country: United States/);
    assert.match(body.text, /Budget: \$500–\$999/);
    assert.match(body.text, /Primary service: Website Design & Development/);
    assert.match(body.text, /Approximate website size: 8–10 pages/);
    assert.match(body.text, /Forms, embeds, or standard integrations: Up to 3/);
    assert.match(body.text, /Additional needs: Analytics & Reporting/);
    assert.match(body.text, /Requested features: Contact or quote form, Analytics & reporting/);
    assert.match(body.text, /Current challenges: The current website is dated and does not convert/);
    assert.match(body.text, /Submission reference:/);
    assert.match(body.html, /WEBSITE DESIGN/);
    assert.match(body.html, /DOGS/);
    assert.match(body.html, /Loyal to the Game/);
    assert.match(body.html, /Visit Website Design Dogs/);
    assert.match(toCustomerConfirmationText(envelope), /complete the project brief/i);
    assert.match(toCustomerConfirmationHtml(envelope), /Your submission/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('email remains successful when Bizosto rejects the lead', async () => {
  const { deliverLead } = loadTypeScriptModule('../src/lib/leads/delivery.ts');
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    if (String(url).includes('app.bizosto.com')) {
      return Response.json(
        { ok: false, error: 'Invalid credentials.' },
        { status: 401 },
      );
    }
    return Response.json({ id: 'safe-email-copy' }, { status: 200 });
  };

  try {
    const result = await deliverLead(envelope, config);
    assert.equal(result.accepted, true);
    assert.equal(
      result.channels.find((channel) => channel.channel === 'email')?.ok,
      true,
    );
    assert.equal(
      result.channels.find((channel) => channel.channel === 'bizosto')?.ok,
      false,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('customer confirmation failure never loses an otherwise captured lead', async () => {
  const { deliverLead } = loadTypeScriptModule('../src/lib/leads/delivery.ts');
  const originalFetch = globalThis.fetch;
  const emailOnly = {
    ...config,
    bizostoEnabled: false,
    apiKey: undefined,
  };

  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    if (body.to?.[0] === envelope.contact.email) {
      return Response.json({ message: 'Temporary provider failure.' }, { status: 503 });
    }
    return Response.json({ id: 'safe-internal-copy' }, { status: 200 });
  };

  try {
    const result = await deliverLead(envelope, emailOnly);
    assert.equal(result.accepted, true);
    assert.equal(result.customerConfirmationSent, false);
    assert.equal(
      result.channels.find((channel) => channel.channel === 'email')?.ok,
      true,
    );
    assert.equal(
      result.channels.find((channel) => channel.channel === 'customer-email')?.ok,
      false,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('email-only mode accepts a lead without a Bizosto credential', async () => {
  const { deliverLead } = loadTypeScriptModule('../src/lib/leads/delivery.ts');
  const originalFetch = globalThis.fetch;
  const emailOnly = {
    ...config,
    bizostoEnabled: false,
    apiKey: undefined,
  };

  globalThis.fetch = async () =>
    Response.json({ id: 'email-only-message' }, { status: 200 });

  try {
    const result = await deliverLead(envelope, emailOnly);
    assert.equal(result.accepted, true);
    assert.deepEqual(
      result.channels.map((channel) => channel.channel),
      ['email', 'customer-email'],
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
