import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

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
  assert.match(validation, /WDD-CAMPAIGN-STARTER-249/);
  assert.match(validation, /regularPrice: 499/);
  assert.match(validation, /promotionalPrice: 249/);
  assert.match(validation, /savings: 250/);
  assert.match(validation, /cleaning: "Cleaning Companies"/);
  assert.match(validation, /"home-services": "Home-Service Businesses"/);
});

test('campaign client does not send browser-controlled pricing or PII analytics fields', () => {
  const form = fs.readFileSync('src/components/campaigns/campaign-lead-form.tsx', 'utf8');
  assert.equal(/regularPrice|promotionalPrice|savings/.test(form.replace(/campaignOffer\.(regularPrice|promotionalPrice|savings)/g, '')), false);
  const events = fs.readFileSync('src/components/forms/analytics-events.ts', 'utf8');
  assert.equal(/fullName|email|phone|businessName|note|referenceId|turnstile/i.test(events), false);
});
