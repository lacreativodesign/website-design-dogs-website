import { readConsent } from "@/components/consent/consent-storage";

export const allowedEventFields = new Set([
  "pagePath", "pageType", "formType", "packageSlug", "serviceSlug", "campaignSlug",
  "offerCode", "placement", "projectType", "failureCategory", "consentAnalytics",
  "consentMarketing", "theme", "faqId", "faqPosition", "portfolioCategory", "utmSource",
  "utmMedium", "utmCampaign", "eventId",
]);

export type TrackingEventName =
  | "wdd_page_view" | "wdd_theme_changed" | "wdd_primary_cta_click" | "wdd_portfolio_filter_used"
  | "wdd_faq_opened" | "wdd_consent_banner_viewed" | "wdd_consent_updated"
  | "wdd_view_packages" | "wdd_select_package" | "wdd_quote_start" | "wdd_lead_submit"
  | "wdd_lead_success" | "wdd_lead_error";

type ConsentRequirement = "analytics" | "marketing" | "analytics-or-marketing" | "necessary";

const eventConsent: Record<TrackingEventName, ConsentRequirement> = {
  wdd_page_view: "analytics-or-marketing", wdd_theme_changed: "analytics", wdd_primary_cta_click: "analytics",
  wdd_portfolio_filter_used: "analytics", wdd_faq_opened: "analytics", wdd_consent_banner_viewed: "necessary",
  wdd_consent_updated: "necessary", wdd_view_packages: "analytics-or-marketing", wdd_select_package: "analytics-or-marketing",
  wdd_quote_start: "analytics-or-marketing", wdd_lead_submit: "analytics-or-marketing",
  wdd_lead_success: "analytics-or-marketing", wdd_lead_error: "analytics-or-marketing",
};

export function sanitizeEvent(input: Record<string, unknown> = {}) {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!allowedEventFields.has(key)) continue;
    if (typeof value === "string") out[key] = value.split("?")[0].slice(0, 120);
    else if (typeof value === "number" || typeof value === "boolean") out[key] = value;
  }
  return out;
}

declare global { interface Window { dataLayer?: Array<Record<string, unknown>>; __wddGtmLoaded?: boolean } }

function hasConsent(requirement: ConsentRequirement) {
  if (requirement === "necessary") return true;
  const prefs = readConsent();
  return requirement === "analytics" ? Boolean(prefs?.analytics)
    : requirement === "marketing" ? Boolean(prefs?.marketing)
    : Boolean(prefs?.analytics || prefs?.marketing);
}

/** Dispatches no-PII events only after the required optional consent is present. */
export function trackEvent(name: TrackingEventName, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasConsent(eventConsent[name])) return;
  const payload = sanitizeEvent(data);
  window.dispatchEvent(new CustomEvent(name, { detail: payload }));
  if (Array.isArray(window.dataLayer) && window.__wddGtmLoaded) window.dataLayer.push({ event: name, ...payload });
}
