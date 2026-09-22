import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("offers page uses three embedded October lead-capture placements", () => {
  const page = fs.readFileSync("src/app/offers/page.tsx", "utf8");
  const form = fs.readFileSync(
    "src/components/offers/offer-lead-form.tsx",
    "utf8",
  );

  assert.match(page, /<OfferLeadForm placement="hero" compact \/>/);
  assert.match(page, /<OfferLeadForm placement="mid" \/>/);
  assert.match(page, /<OfferLeadForm placement="final" \/>/);
  assert.match(page, /Get My 40% Off Quote/);
  assert.match(page, /mobileStickyCta/);

  assert.match(form, /campaignSlug = "october-offer"/);
  assert.match(form, /offerCode = "OCTOBER-2026-40-OFF"/);
  assert.match(form, /InternationalPhoneInput/);
  assert.match(form, /normalizeWebsiteInput/);
  assert.match(form, /getAttribution/);
  assert.match(form, /wdd_lead_submit/);
  assert.match(form, /wdd_lead_success/);
  assert.match(form, /eventId/);
  assert.match(form, /wdd_lead_error/);
  assert.match(form, /TurnstileWidget/);
});

test("October campaign validation carries truthful promotion metadata", () => {
  const validation = fs.readFileSync("src/lib/leads/validation.ts", "utf8");
  const types = fs.readFileSync("src/lib/leads/types.ts", "utf8");
  const submission = fs.readFileSync(
    "src/components/forms/submission.ts",
    "utf8",
  );

  assert.match(validation, /"october-offer": "October Website Offer"/);
  assert.match(validation, /"E-Commerce Solutions"/);
  assert.match(validation, /"Campaign Landing Page"/);
  assert.match(validation, /OCTOBER-2026-40-OFF/);
  assert.match(validation, /qualifyingScope: "October Website Offer"/);
  assert.match(
    validation,
    /Confirm project requirements, eligibility, regular service-fee value, and the October 40% discount/,
  );

  assert.match(types, /"Campaign Starter" \| "October Website Offer"/);
  assert.match(submission, /\| "october-offer"/);
});

test("October offer confirmation email is not mislabeled as Starter Website", () => {
  const email = fs.readFileSync("src/lib/leads/email-adapter.ts", "utf8");

  assert.match(email, /isOctoberOfferLead/);
  assert.match(email, /Your Website Design Dogs October offer request/);
  assert.match(email, /Your October offer request is safely in\./);
  assert.match(email, /October website-offer review/);
});
