import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie and Similar Technologies Policy",
  description:
    "How Website Design Dogs uses necessary storage, consent preferences, attribution session storage, analytics, and optional marketing tags.",
  path: "/cookie-policy",
});

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "What These Technologies Are",
    intro:
      "Cookies and similar technologies help websites remember choices, operate security controls, measure use, and preserve campaign context.",
    items: [
      "Cookies are small text records stored by a browser. Similar technologies include sessionStorage, pixels, tags, local identifiers, and server-side conversion events.",
      "Some technologies are necessary for operation or security. Optional analytics and marketing technologies depend on visitor choices and configuration.",
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
    ],
  },
  {
    id: "necessary",
    title: "Strictly Necessary and Security Technologies",
    intro:
      "Necessary technologies support consent, security, form operation, and core website behavior.",
    items: [
      "The wdd-consent-v2 first-party cookie stores the consent schema version, decision timestamp, and necessary, analytics, and marketing category choices for up to 180 days.",
      "The consent cookie does not store direct contact information, form responses, or advertising identifiers.",
      "Cloudflare Turnstile may process browser, device, network, and challenge information when configured to help distinguish legitimate submissions from abuse.",
      "Necessary technologies cannot be disabled through Cookie Settings because the website needs them for the requested operation, but browser controls may still block or remove them and may affect functionality.",
    ],
  },
  {
    id: "tag-manager-consent",
    title: "Tag Manager and Consent Signals",
    intro:
      "Google Tag Manager may load to apply and communicate consent choices without granting optional storage.",
    items: [
      "Before a visitor chooses, analytics storage, advertising storage, ad user data, ad personalization, and personalization storage default to denied.",
      "GTM tags must be configured to respect those consent signals. Optional categories become available only after the visitor grants the relevant choice.",
      "Changing a preference updates consent signals for future processing. It may not automatically delete cookies that a third party placed earlier, so browser controls may also be needed.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics Technologies",
    intro:
      "Analytics helps understand page use, form journeys, performance, and campaign effectiveness when configured and consented.",
    items: [
      "Configured analytics may include Google Analytics or Microsoft Clarity delivered through Google Tag Manager.",
      "Analytics may process page URLs, events, approximate location derived from IP, device and browser information, referral source, and pseudonymous identifiers according to provider settings.",
      "Analytics storage remains denied unless the visitor grants analytics consent.",
    ],
  },
  {
    id: "marketing",
    title: "Marketing and Attribution Technologies",
    intro:
      "Marketing technologies support advertising measurement and attribution only when configured and consented.",
    items: [
      "Configured marketing tools may include Google advertising tags, Meta Pixel, and Meta Conversions API.",
      "When marketing consent is granted and Meta is configured, _fbp and _fbc browser identifiers may be used for attribution. A successful enquiry may also produce a server-side Meta Lead event using hashed email and optional phone plus the same non-PII event ID as the browser event for deduplication.",
      "Marketing and advertising storage remains denied unless the visitor grants marketing consent.",
      "We do not sell personal information for money. Some laws may treat consented advertising activity as targeted advertising or sharing, which visitors can decline through Cookie Settings and supported browser privacy signals.",
    ],
  },
  {
    id: "session-attribution",
    title: "Session Attribution Storage",
    intro:
      "Short-lived first-touch context helps connect an enquiry with the page or campaign that led to it.",
    items: [
      "The wdd-attribution-v1 sessionStorage item may include selected UTM fields, fbclid, gclid, landing page, current page, and referrer.",
      "It remains within the browser session, is submitted only when the visitor sends a form, and is not a long-term advertising cookie.",
    ],
  },
  {
    id: "providers-duration",
    title: "Providers and Duration",
    intro:
      "Duration depends on the technology, visitor choice, browser behavior, and provider configuration.",
    items: [
      "First-party consent storage lasts up to 180 days unless removed sooner. Session attribution normally ends with the browser session.",
      "Third-party services may set or read their own cookies after the required consent is granted. Their names and lifetimes can change under provider-controlled configurations.",
      "Current browser developer tools and provider documentation can show the exact cookies present for a particular visit.",
    ],
  },
  {
    id: "manage",
    title: "Managing Preferences",
    intro:
      "Visitors can control optional categories through the website and their browser.",
    items: [
      "Visitors can accept all optional categories, reject them, choose categories, or reopen Cookie Settings from the footer.",
      "When the browser provides a supported Global Privacy Control signal, optional analytics and marketing categories default to denied.",
      "Browser settings can block, inspect, or remove cookies and storage. Blocking necessary technologies may prevent preferences or forms from working as expected.",
      "Privacy questions can be submitted through /contact.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    intro:
      "This policy may change when technologies, configurations, or legal requirements change.",
    items: [
      "The Last updated date identifies the current version. Material changes will be presented through an appropriate notice when required.",
      "The Privacy Policy provides additional information about personal data categories, disclosures, retention, security, and visitor rights.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie and Similar Technologies Policy"
      updated="August 31, 2026"
      intro="How necessary storage, consent preferences, attribution, analytics, and optional marketing tags are handled."
      sections={sections}
      darkSrc="/brand/scenes/privacy-hero-dark.webp"
      path="/cookie-policy"
    />
  );
}
