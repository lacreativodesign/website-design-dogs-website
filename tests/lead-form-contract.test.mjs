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

test('get-started stays a simple four-step quote request with no package recommendation', () => {
  const source = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');
  const types = fs.readFileSync('src/lib/leads/types.ts', 'utf8');
  const constants = fs.readFileSync('src/lib/leads/constants.ts', 'utf8');
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');
  const privacy = fs.readFileSync('src/app/privacy-policy/page.tsx', 'utf8');

  assert.match(source, /Step \{step \+ 1\} of 4/);
  assert.match(source, /Project Type/);
  assert.match(source, /Project Details/);
  assert.match(source, /Final Details/);
  assert.match(source, /Budget range/);
  assert.match(source, /Preferred start timing/);
  assert.doesNotMatch(source, /Recommended starting point/);
  assert.doesNotMatch(source, /Preferred package/);
  assert.doesNotMatch(source, /recommendPackage/);
  assert.doesNotMatch(source, /packageOptionsFor/);
  assert.doesNotMatch(validation, /package-fit/);
  assert.doesNotMatch(validation, /primaryType/);
  assert.doesNotMatch(validation, /scopeInput/);
  assert.doesNotMatch(types, /preferred\?: string/);
  assert.doesNotMatch(constants, /export const PACKAGES/);
  assert.doesNotMatch(styles, /\.quote-recommendation/);
  assert.doesNotMatch(styles, /\.quote-package-option/);
  assert.doesNotMatch(styles, /\.quote-package-fieldset/);
  assert.match(
    styles,
    /\.quote-progress__steps\s*\{[\s\S]{0,180}grid-template-columns:\s*repeat\(4,/,
  );
  assert.match(
    styles,
    /\.quote-choice-card\s*\{[\s\S]{0,180}min-width:\s*0/,
  );
  assert.doesNotMatch(privacy, /optional phone number/);
  assert.doesNotMatch(privacy, /package preference/);
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
  assert.match(source, /Thanks — your project brief is safely in\./);
  assert.match(source, /Confirmation sent/);
  assert.match(source, /Project received/);
  assert.match(source, /mascotDesigner/);
  assert.doesNotMatch(source, /setStep\(0\)/);
});

test('website fields accept scheme-less domains and normalize them before delivery', () => {
  const contact = fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8');
  const quote = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const campaign = fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8');
  const validation = fs.readFileSync('src/lib/leads/validation.ts', 'utf8');
  const website = fs.readFileSync('src/lib/leads/website.ts', 'utf8');

  for (const source of [contact, quote, campaign]) {
    assert.match(source, /normalizeWebsiteInput/);
    assert.match(source, /inputMode="url"/);
  }

  assert.doesNotMatch(contact, /Optional\. You can enter your domain without https:\/\//);
  assert.match(contact, /placeholder="www\.yourwebsite\.com"/);
  assert.match(contact, /website: normalizeWebsiteInput\(formData\.website\)/);
  assert.match(quote, /website: normalizeWebsiteInput\(data\.business\.website\)/);
  assert.match(campaign, /website: normalizeWebsiteInput\(values\.website\)/);
  assert.match(validation, /normalizeWebsiteInput\(s\)/);
  assert.match(website, /https:\/\/\$\{raw\}/);
  assert.match(website, /localHosts/);
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
  assert.match(quote, /complete copy of\s+your submitted brief for your records/);
  assert.match(email, /sendCustomerConfirmationEmail/);
  assert.match(email, /wdd-confirmation\/\$\{envelope\.submissionId\}/);
  assert.match(email, /Your Website Design Dogs project brief/);
  assert.match(email, /This email is your record of the information you submitted/);
});

test('phone country control stays compact, readable, and responsive for long dial codes', () => {
  const phone = fs.readFileSync(
    'src/components/forms/international-phone-input.tsx',
    'utf8',
  );
  const countries = fs.readFileSync('src/lib/leads/phone.ts', 'utf8');
  const forms = [
    fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8'),
    fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8'),
    fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8'),
  ];

  assert.match(phone, /WddSelect/);
  assert.match(phone, /displayLabel:/);
  assert.match(phone, /Phone country/);
  assert.match(phone, /menuClassName="w-\[min\(18rem,calc\(100vw-2rem\)\)\]"/);
  assert.match(phone, /min-\[360px\]:grid-cols-\[8\.25rem_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(phone, /<select/);
  assert.doesNotMatch(phone, /opacity-0/);
  assert.match(countries, /dialCode: "965"/);
  assert.match(countries, /dialCode: "966"/);
  assert.match(countries, /dialCode: "971"/);

  for (const source of forms) {
    assert.doesNotMatch(
      source,
      /United States \(\+1\) is selected by default\. Change the country for international numbers\./,
    );
  }
});



test('contact form uses the same custom WDD dropdown for service and phone country', () => {
  const contact = fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8');
  const phone = fs.readFileSync(
    'src/components/forms/international-phone-input.tsx',
    'utf8',
  );
  const select = fs.readFileSync('src/components/forms/wdd-select.tsx', 'utf8');

  assert.match(contact, /<WddSelect[\s\S]*id="service"/);
  assert.match(contact, /placeholder="Select a service"/);
  assert.doesNotMatch(contact, /<select[\s\S]*id="service"/);
  assert.match(phone, /<WddSelect/);
  assert.match(select, /role="combobox"/);
  assert.match(select, /role="listbox"/);
  assert.match(select, /role="option"/);
  assert.match(select, /rotate-180/);
  assert.match(select, /d="m5\.5 7\.5 4\.5 4\.5 4\.5-4\.5"/);
});

test('get-started keeps one simple Tawk-ready help route without recommendation copy', () => {
  const quote = fs.readFileSync('src/components/forms/quote-form.tsx', 'utf8');
  const chat = fs.readFileSync('src/components/forms/live-chat-button.tsx', 'utf8');

  assert.match(quote, /Have a question\?/);
  assert.match(quote, /Start a live chat/);
  assert.doesNotMatch(quote, /Questions about this recommendation/);
  assert.match(chat, /Tawk_API/);
  assert.match(chat, /maximize/);
  assert.match(chat, /toggle/);
  assert.match(chat, /\/contact\?intent=live-chat/);
});
