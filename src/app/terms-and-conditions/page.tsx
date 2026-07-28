import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "General Website Design Dogs website terms, campaign page terms, and project agreement controls.",
  path: "/terms-and-conditions",
});

const updated = "July 28, 2026";

const termsGroups: LegalSection[] = [
  {
    id: "services",
    title: "Services",
    intro: "Website Design Dogs provides website-related information and accepts service enquiries subject to written project terms.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
      "By using this website, you agree to these general website terms.",
      "Submitting a form does not create a project agreement or guarantee acceptance.",
      "Scope, pricing, timing, responsibilities, revisions, intellectual property, third-party costs, payments, cancellations, and refunds are confirmed in the signed proposal or written project agreement.",
    ],
  },
  {
    id: "responsibilities",
    title: "User Responsibilities",
    intro: "Visitors and clients are responsible for lawful website use and accurate project information.",
    items: [
      "Clients are responsible for timely feedback, accurate information, approved materials, access credentials when required, and rights to content supplied.",
      "Do not misuse the website, interfere with security, submit unlawful content, or attempt unauthorized access.",
      "Third-party platforms, hosting, licenses, plugins, payment processors, and external services remain subject to their own terms and availability.",
      "Scope changes, new requirements, missing content, unavailable access, or delayed feedback may affect timing, pricing, and delivery expectations.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    intro: "Ownership, licensing, and usage rights are controlled by the applicable written project agreement.",
    items: [
      "Project deliverables, source materials, content rights, license rights, third-party assets, and transfer terms are governed by the signed proposal or written project agreement.",
      "Website content is for general information and does not transfer ownership of Website Design Dogs or LA CREATIVO GROUP, LLC intellectual property.",
      "Clients must have rights to logos, images, copy, credentials, and other materials supplied for use in a project.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    intro: "The website is informational and does not guarantee business, marketing, technical, or third-party outcomes.",
    items: [
      "Website content is for general information and does not guarantee outcomes, leads, rankings, revenue, delivery dates, or platform availability.",
      "The website is provided without warranties to the fullest extent permitted. Liability and indemnity obligations are controlled by any signed agreement and applicable law.",
      "Refunds, cancellations, and payment responsibilities are controlled by the applicable proposal, project agreement, and Refund and Cancellation Policy references where applicable.",
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    intro: "These terms may be updated, and campaign or project terms may be controlled by more specific written terms.",
    items: [
      "These terms may change and the Last updated date will be revised. Contact Website Design Dogs through /contact.",
      "Main website and campaign pages use the same $499 one-time Starter package price. Final requirements, exclusions, responsibilities, timing, and any work outside the listed Starter scope are confirmed in the written proposal before work begins.",
      "When a signed proposal, order form, statement of work, or written agreement conflicts with these general website terms, the signed or written project terms control for that project.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={updated}
      intro="Please read these terms before using the website or requesting services."
      sections={termsGroups}
      darkSrc="/brand/scenes/terms-hero-dark.webp"
      path="/terms-and-conditions"
    />
  );
}
