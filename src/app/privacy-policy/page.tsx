import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Website Design Dogs collects, uses, protects, and routes website enquiry information.",
  path: "/privacy-policy",
});

const updated = "July 28, 2026";

const policyGroups: LegalSection[] = [
  {
    id: "information",
    title: "Information We Collect",
    intro: "We collect information visitors submit directly and limited technical information needed to operate forms and understand enquiries.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC. This policy applies to the Website Design Dogs website and forms.",
      "Forms may request name, business name, email, optional phone, optional website URL, service selection, project information, package preference, campaign form information, and consent acknowledgement.",
      "We may process landing page, current page, referrer, selected UTM parameters, fbclid, gclid, basic request-security information, and Turnstile verification data. When marketing consent is granted and Meta services are configured, Meta browser identifiers such as _fbp and _fbc may also be used for conversion attribution.",
    ],
  },
  {
    id: "use",
    title: "How We Use Your Information",
    intro: "Submitted information is used to review and respond to enquiries, prepare recommendations, and operate the website responsibly.",
    items: [
      "Information is used to review enquiries, respond to requests, prepare project recommendations, route leads, maintain operational records, prevent abuse, improve website operations, and understand campaign source.",
      "Submitted enquiries may be routed server-side to Bizosto for lead and enquiry management. API credentials are not exposed to visitors.",
      "When marketing consent is granted and the integration is enabled, a successful enquiry may generate a server-side Meta Lead event. Email and optional phone are normalized and cryptographically hashed before transmission; the event uses the same non-PII event ID as the consent-controlled browser event for deduplication.",
      "Information may be shared with LA CREATIVO GROUP, LLC operational systems, Bizosto, service providers needed for website operation, hosting, security, analytics, and communication, or as required by legal obligations. Submitted enquiry information is not sold.",
    ],
  },
  {
    id: "security",
    title: "Data Protection and Security",
    intro: "Security controls help protect submitted information and reduce spam, abuse, and unauthorized use of forms.",
    items: [
      "Forms may use validation, honeypot fields, submission timing, managed and instance-level rate limiting, Cloudflare Turnstile verification, and request-security processing.",
      "Information is retained for legitimate operational, contractual, security, accounting, dispute-resolution, and legal purposes for as long as reasonably necessary.",
      "No legal certification, security certification, or guaranteed protection outcome is claimed by this policy.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    intro: "Cookies, session storage, consent preferences, and optional tags may be used depending on visitor choices and configuration.",
    items: [
      "Google Tag Manager may be enabled. Optional analytics and marketing technologies are consent-controlled, and analytics storage and advertising storage remain denied until the required consent is granted.",
      "First-touch campaign attribution may use sessionStorage. Consent preference may use a first-party necessary cookie. Optional analytics or marketing cookies depend on consent and configured tags.",
      "Cloudflare Turnstile may process verification information when configured to help distinguish legitimate submissions from abuse.",
      "Meta Pixel tags may load through Google Tag Manager only after marketing consent. A matching server-side Meta conversion event may be sent only after marketing consent and successful enquiry delivery.",
    ],
  },
  {
    id: "choices",
    title: "Your Choices",
    intro: "Visitors can control optional tracking choices and contact Website Design Dogs about submitted information.",
    items: [
      "Visitors can reject optional tracking, change cookie preferences, and contact Website Design Dogs through /contact regarding submitted information.",
      "Consent choices can be updated through Cookie Settings where available on the website.",
      "Project, contractual, accounting, security, dispute-resolution, and legal retention requirements may affect whether information can be deleted immediately.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Your privacy matters."
      eyebrow="Privacy Policy"
      updated={updated}
      intro="How Website Design Dogs collects, uses, protects, and routes website enquiry information."
      sections={policyGroups}
      darkSrc="/brand/scenes/privacy-hero-dark.webp"
      path="/privacy-policy"
    />
  );
}
