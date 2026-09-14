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
