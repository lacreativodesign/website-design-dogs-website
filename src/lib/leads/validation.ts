import { BRANDING_STATUSES, BUDGETS, CONTENT_STATUSES, FEATURES, MAX_FORM_AGE_MS, MIN_FORM_AGE_MS, PAGES, PROJECT_TYPES, SERVICES, TIMINGS } from "./constants";
import { LeadError } from "./errors";
import {
  isE164Phone,
  isPhoneCountryCode,
  normalizePhoneNumber,
} from "./phone";
import type { Attribution, ClientLeadPayload, LeadSubmissionEnvelope } from "./types";
import { normalizeWebsiteInput } from "./website";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) => typeof v === "string" ? v.replace(/\0/g, "").replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().replace(/[ \t]{2,}/g, " ").slice(0, max + 1) : "";
const opt = (v: unknown, max: number) => { const s = clean(v, max); return s ? s : undefined; };
const has = (v: string, list: readonly string[]) => list.includes(v);
function req(v: unknown, key: string, min: number, max: number, errs: Record<string, string>) { const s = clean(v, max); if (s.length < min || s.length > max) errs[key] = `Invalid ${key}.`; return s; }
function enumValue(v: unknown, key: string, list: readonly string[], errs: Record<string, string>) { const s = clean(v, 120); if (!has(s, list)) errs[key] = `Invalid ${key}.`; return s; }
function listValue(v: unknown, key: string, allowed: readonly string[], errs: Record<string, string>) { if (!Array.isArray(v) || v.length < 1 || v.length > 20) { errs[key] = `Invalid ${key}.`; return []; } const values = v.map((x) => clean(x, 120)); if (values.some((x) => !has(x, allowed))) errs[key] = `Invalid ${key}.`; return values; }
function website(v: unknown, errs: Record<string, string>) { const s = opt(v, 2048); if (!s) return undefined; const normalized = normalizeWebsiteInput(s); if (!normalized) errs.website = "Enter a valid public website address."; return normalized || s; }
export function normalizeAttribution(a: unknown): Attribution { const x = (a && typeof a === "object" ? a : {}) as Record<string, unknown>; return { landingPage: opt(x.landingPage, 500), currentPage: opt(x.currentPage, 500), referrer: opt(x.referrer, 500), utmSource: opt(x.utmSource, 500), utmMedium: opt(x.utmMedium, 500), utmCampaign: opt(x.utmCampaign, 500), utmTerm: opt(x.utmTerm, 500), utmContent: opt(x.utmContent, 500), fbclid: opt(x.fbclid, 500), gclid: opt(x.gclid, 500) }; }
export function validateLeadPayload(input: unknown): LeadSubmissionEnvelope { const p = input as ClientLeadPayload; const errs: Record<string, string> = {}; if (!p || typeof p !== "object") throw new LeadError("INVALID_REQUEST", "Invalid request.", 400); if (p.verificationCode) throw new LeadError("SPAM_REJECTED", "Thanks — your request was received successfully.", 200); if (!uuid.test(String(p.submissionId || ""))) errs.submissionId = "Invalid submission."; const age = Date.now() - Date.parse(String(p.formStartedAt || "")); if (!Number.isFinite(age) || age < MIN_FORM_AGE_MS || age > MAX_FORM_AGE_MS) throw new LeadError("SPAM_REJECTED", "Please try submitting the form again.", 403); if (p.formType !== "contact" && p.formType !== "quote" && p.formType !== "campaign") errs.formType = "Invalid form type."; if (p.consent !== true) errs.consent = "Confirm consent and Privacy Policy acknowledgement.";
 const fullName = req(p.contact?.fullName, "fullName", 2, 100, errs); const mail = clean(p.contact?.email, 254).toLowerCase(); if (!email.test(mail) || mail.length > 254) errs.email = "Enter a valid email address."; const phone = clean(p.contact?.phone, 40); if (!isE164Phone(phone)) errs.phone = "Enter a valid phone number for the selected country."; const rawPhoneCountry = clean(p.contact?.phoneCountry, 8).toUpperCase(); if (!isPhoneCountryCode(rawPhoneCountry)) errs.phone = "Select the correct phone country and enter a valid number."; const phoneCountry = isPhoneCountryCode(rawPhoneCountry) ? rawPhoneCountry : "US"; if (isE164Phone(phone) && normalizePhoneNumber(phoneCountry, phone) !== phone) errs.phone = "Phone number does not match the selected country."; const name = req(p.business?.name, "businessName", 1, 150, errs); const site = website(p.business?.website, errs); const industry = opt(p.business?.industry, 120);
 const submittedAt = new Date().toISOString();
 const envelope: LeadSubmissionEnvelope = { schemaVersion: "1.0", submissionId: String(p.submissionId), formType: p.formType === "quote" ? "quote" : p.formType === "campaign" ? "campaign" : "contact", brand: "Website Design Dogs", brandSlug: "website-design-dogs", submittedAt, source: "website", contact: { fullName, email: mail, phone, phoneCountry }, business: { name, ...(site ? { website: site } : {}), ...(industry ? { industry } : {}) }, enquiry: {}, attribution: normalizeAttribution(p.attribution), consent: { contact: p.consent === true, privacyPolicy: p.consent === true, agreedAt: submittedAt } };
 if (p.formType === "contact") { const service = enumValue(p.enquiry?.service, "service", SERVICES, errs); const summary = req(p.enquiry?.summary, "summary", 20, 5000, errs); envelope.enquiry = { service, summary }; }
 if (p.formType === "quote") { if (!industry || industry === "Other") errs.industry = "Select your industry or specify Other."; envelope.project = { types: listValue(p.project?.types, "types", PROJECT_TYPES, errs), pages: enumValue(p.project?.pages, "pages", PAGES, errs), goal: req(p.project?.goal, "goal", 1, 1000, errs), features: listValue(p.project?.features, "features", FEATURES, errs), contentStatus: enumValue(p.project?.contentStatus, "contentStatus", CONTENT_STATUSES, errs), brandingStatus: enumValue(p.project?.brandingStatus, "brandingStatus", BRANDING_STATUSES, errs), ...(opt(p.project?.existingPlatform, 5000) ? { existingPlatform: opt(p.project?.existingPlatform, 5000) } : {}), notWorking: req(p.project?.notWorking, "notWorking", 10, 5000, errs), accomplish: req(p.project?.accomplish, "accomplish", 10, 5000, errs), ...(opt(p.project?.details, 8000) ? { details: opt(p.project?.details, 8000) } : {}) }; envelope.package = { budget: enumValue(p.package?.budget, "budget", BUDGETS, errs), timing: enumValue(p.package?.timing, "timing", TIMINGS, errs) }; }

 if (p.formType === "campaign") {
  const campaignMap: Record<string, string> = {
    cleaning: "Cleaning Companies",
    roofing: "Roofing Contractors",
    landscaping: "Landscaping Businesses",
    "home-services": "Home-Service Businesses",
    "october-offer": "October Website Offer",
  };
  const slug = clean(p.campaignSlug, 80);
  const projectTypes = [
    "New Website",
    "Website Redesign",
    "E-Commerce Solutions",
    "Campaign Landing Page",
    "Not Sure Yet",
  ] as const;
  const projectType = enumValue(p.project?.type, "projectType", projectTypes, errs);
  const note = opt(p.project?.note, 2500);
  if (!Object.prototype.hasOwnProperty.call(campaignMap, slug)) errs.campaignSlug = "Invalid campaign slug.";
  const isOctoberOffer = slug === "october-offer";
  const service =
    projectType === "E-Commerce Solutions"
      ? "E-Commerce Solutions"
      : projectType === "Campaign Landing Page"
        ? "Campaign Landing Page"
        : "Custom Website Design";
  envelope.business = { ...envelope.business, industry: campaignMap[slug] };
  envelope.enquiry = {
    service,
    summary:
      note ||
      (isOctoberOffer
        ? `${projectType} October 40% offer enquiry.`
        : `${projectType} Starter website enquiry.`),
  };
  envelope.project = {
    types: [projectType],
    pages: "1–5 pages",
    goal: isOctoberOffer ? "October promotion project review" : "Starter website scope review",
    features: ["Contact or quote form"],
    contentStatus: "Not sure yet",
    brandingStatus: "Not sure yet",
    notWorking: isOctoberOffer
      ? "October offer enquiry submitted for review."
      : "Starter website enquiry submitted for review.",
    accomplish: isOctoberOffer
      ? "Confirm project requirements, eligibility, regular service-fee value, and the October 40% discount."
      : "Confirm the project requirements and whether the Starter package fits the requested scope.",
    ...(note ? { details: note } : {}),
  };
  envelope.campaign = isOctoberOffer
    ? {
        slug,
        industry: campaignMap[slug] || "",
        offerCode: "OCTOBER-2026-40-OFF",
        regularPrice: 0,
        promotionalPrice: 0,
        savings: 0,
        currency: "USD",
        qualifyingScope: "October Website Offer",
      }
    : {
        slug,
        industry: campaignMap[slug] || "",
        offerCode: "WDD-STARTER-499",
        regularPrice: 499,
        promotionalPrice: 499,
        savings: 0,
        currency: "USD",
        qualifyingScope: "Campaign Starter",
      };
 }
 if (Object.keys(errs).length) throw new LeadError("VALIDATION_FAILED", "Please review the highlighted fields and try again.", 400, errs); return envelope; }
