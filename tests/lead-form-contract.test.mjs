import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const forms = [
  {
    route: 'src/app/contact/page.tsx',
    component: 'src/components/forms/contact-form.tsx',
    componentName: 'ContactForm',
    action: 'contact_lead',
  },
  {
    route: 'src/app/get-started/page.tsx',
    component: 'src/components/forms/quote-form.tsx',
    componentName: 'QuoteForm',
    action: 'quote_lead',
  },
  {
    route: 'src/app/campaigns/[slug]/page.tsx',
    component: 'src/components/campaigns/campaign-lead-form.tsx',
    componentName: 'CampaignLeadForm',
    action: 'campaign_lead',
  },
];

test('all approved WDD lead entry points remain wired to the shared hardened submission contract', () => {
  for (const form of forms) {
    const route = fs.readFileSync(form.route, 'utf8');
    const source = fs.readFileSync(form.component, 'utf8');

    assert.match(route, new RegExp(form.componentName));
    assert.match(source, /submitLead/);
    assert.match(source, /TurnstileWidget/);
    assert.match(source, new RegExp(form.action));
    assert.match(source, /wdd_lead_submit/);
    assert.match(source, /wdd_lead_success/);
    assert.match(source, /wdd_lead_error/);
    assert.match(source, /eventId:\s*submissionId/);
  }
});

test('only the shared browser submission module may call the lead API directly', () => {
  const allowed = 'src/components/forms/submission.ts';
  const roots = ['src/app', 'src/components', 'src/lib'];
  const violations = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (/\.(?:ts|tsx|js|jsx|mjs)$/.test(entry.name) && path !== allowed) {
        const source = fs.readFileSync(path, 'utf8');
        if (/fetch\s*\(\s*['"]\/api\/leads['"]/.test(source)) violations.push(path);
      }
    }
  };

  for (const root of roots) walk(root);
  assert.deepEqual(violations, []);
});

test('server Turnstile action map covers every approved lead form', () => {
  const route = fs.readFileSync('src/app/api/leads/route.ts', 'utf8');
  for (const { action } of forms) assert.match(route, new RegExp(action));
});

test('get-started recommendation handles mixed scopes and applies the safe starting point automatically', () => {
  const source = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');

  assert.match(source, /function projectCategories/);
  assert.match(source, /categories\.length === 1 \? categories\[0\] : null/);
  assert.match(source, /return flexiblePackageOptions/);
  assert.match(source, /Your brief spans multiple service areas/);
  assert.match(source, /preferred: nextRecommendation\.option\.value/);
  assert.match(source, /new Set\(\["Not Sure Yet", "Not sure yet"\]\)/);
  assert.doesNotMatch(source, /Use recommendation/);
});

test('get-started uses one primary submit action and renders a dedicated confirmation state', () => {
  const source = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const turnstile = fs.readFileSync(
    'src/components/forms/turnstile-widget.tsx',
    'utf8',
  );

  assert.match(source, /execution="execute"/);
  assert.match(source, /executeKey=\{verificationExecuteKey\}/);
  assert.match(source, /formRef\.current\?\.requestSubmit\(\)/);
  assert.match(turnstile, /window\.turnstile\.execute/);
  assert.match(source, /setSubmitted\(true\)/);
  assert.match(source, /Thanks — your project brief is in\./);
  assert.doesNotMatch(source, /setStep\(0\)/);
});

test('phone number remains mandatory and country-aware across every WDD website lead form', () => {
  const contact = fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8');
  const quote = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const campaign = fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8');
  const submission = fs.readFileSync('src/components/forms/submission.ts', 'utf8');
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');
  const phone = fs.readFileSync('src/lib/leads/phone.ts', 'utf8');

  for (const source of [contact, quote, campaign]) {
    assert.match(source, /normalizePhoneNumber/);
    assert.match(source, /Enter a valid phone number for the selected country/);
    assert.match(source, /label="Phone number"[\s\S]{0,160}required/);
    assert.match(source, /InternationalPhoneInput/);
  }

  assert.match(phone, /code: "US"/);
  assert.match(phone, /name: "United States"/);
  assert.match(phone, /code: "INTL"/);
  assert.match(phone, /Other international/);
  assert.match(phone, /return isE164Phone\(normalized\)/);
  assert.match(validation, /isE164Phone\(phone\)/);
  assert.match(validation, /isPhoneCountryCode\(rawPhoneCountry\)/);
  assert.match(validation, /phoneCountry/);
  assert.match(validation, /normalizePhoneNumber\(phoneCountry, phone\) !== phone/);
  assert.doesNotMatch(submission, /phone\?: string/);
});

test('get-started uses a structured industry selector with a required Other path', () => {
  const quote = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const industries = fs.readFileSync('src/content/lead-industries.ts', 'utf8');
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');

  assert.match(quote, /Select your industry/);
  assert.match(quote, /leadIndustryOptions\.map/);
  assert.match(quote, /industryChoice === "Other"/);
  assert.match(quote, /Please specify your industry/);
  assert.match(quote, /Tell us your industry/);
  assert.match(industries, /Home Services/);
  assert.match(industries, /Technology \/ SaaS/);
  assert.match(industries, /Other/);
  assert.match(validation, /if \(!industry \|\| industry === "Other"\) errs\.industry/);
});

test('successful lead UX tells customers to check their inbox when confirmation email is sent', () => {
  const route = fs.readFileSync('src/app/api/leads/route.ts', 'utf8');
  const quote = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const email = fs.readFileSync('src/lib/leads/email-adapter.ts', 'utf8');

  assert.match(route, /confirmationEmailSent: delivery\.customerConfirmationSent/);
  assert.match(route, /Please check your inbox, including spam or junk if needed/);
  assert.match(quote, /Check your inbox at \{data\.contact\.email\}/);
  assert.match(quote, /complete copy of your submitted brief and selected package/);
  assert.match(email, /sendCustomerConfirmationEmail/);
  assert.match(email, /wdd-confirmation\/\$\{envelope\.submissionId\}/);
  assert.match(email, /Your Website Design Dogs project brief/);
  assert.match(email, /This email is your record of the information you submitted/);
});

test('phone country control stays compact without redundant helper copy', () => {
  const phone = fs.readFileSync(
    'src/components/forms/international-phone-input.tsx',
    'utf8',
  );
  const forms = [
    fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8'),
    fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8'),
    fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8'),
  ];

  assert.match(phone, /country === "INTL" \? "INTL" : country/);
  assert.match(phone, /selected\?\.dialCode/);
  assert.match(phone, /option\.name/);
  assert.match(phone, /opacity-0/);
  assert.match(phone, /Phone country/);

  for (const source of forms) {
    assert.doesNotMatch(
      source,
      /United States \(\+1\) is selected by default\. Change the country for international numbers\./,
    );
  }
});

