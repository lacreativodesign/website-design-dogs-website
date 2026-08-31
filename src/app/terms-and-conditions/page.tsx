import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "General terms for using the Website Design Dogs website and requesting professional services.",
  path: "/terms-and-conditions",
});

const termsGroups: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance and Eligibility",
    intro:
      "These terms govern use of the Website Design Dogs website, campaign pages, forms, and general website content.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
      "By using this website, you agree to these terms. If you do not agree, do not use the website or submit an enquiry.",
      "A person requesting paid services must be at least 18 years old and authorized to act for the business or organization identified in the enquiry.",
      "These website terms do not replace mandatory rights or obligations that cannot legally be waived.",
    ],
  },
  {
    id: "enquiries-services",
    title: "Enquiries and Services",
    intro:
      "Website content describes general capabilities and starting points, not a binding project offer.",
    items: [
      "Submitting a form, receiving an automated acknowledgement, or discussing a project does not create a client relationship, reserve production capacity, or guarantee acceptance.",
      "A project begins only when the applicable proposal, order form, statement of work, or written agreement is accepted and any required initial payment or onboarding condition is completed.",
      "Main website and campaign pages use the same $499 one-time Starter package price. Final scope, timing, responsibilities, exclusions, and work outside the listed starting scope are confirmed in writing.",
      "We may decline an enquiry or proposed project when requirements, timing, legal risk, technical feasibility, capacity, payment, or fit cannot be responsibly confirmed.",
    ],
  },
  {
    id: "scope-payments",
    title: "Scope, Changes, Payments, and Third-Party Costs",
    intro:
      "Project-specific commercial terms are controlled by the accepted written agreement.",
    items: [
      "The written agreement defines deliverables, milestones, review points, revisions, timing, fees, payment schedule, taxes, cancellation terms, and handoff obligations.",
      "Requests outside the accepted scope may require a written change, revised timeline, and additional fee before work continues.",
      "Domains, hosting, platforms, themes, plugins, applications, licenses, advertising spend, payment processing, app-store fees, and other third-party charges are separate unless the written agreement expressly includes them.",
      "Late payment, missing access, delayed feedback, incomplete content, or unapproved dependencies may pause work and move estimated delivery dates.",
      "Prices and package descriptions may change prospectively. An accepted written agreement controls the price for that specific project.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Client and Visitor Responsibilities",
    intro:
      "Visitors and clients must use the website lawfully and provide accurate, authorized project information.",
    items: [
      "Clients are responsible for accurate information, timely feedback, approvals, required access, and rights to all logos, images, copy, data, software, and other materials supplied.",
      "Do not submit confidential credentials, payment-card information, government identifiers, malware, unlawful material, or content that infringes another party’s rights through public website forms.",
      "Do not interfere with website operation, evade security controls, scrape or overload the service, reverse engineer protected functionality, impersonate another person, or attempt unauthorized access.",
      "Clients remain responsible for final review and legal approval of their own website content, claims, policies, accessibility obligations, regulated-industry requirements, and business practices unless a written agreement expressly states otherwise.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property and Third-Party Services",
    intro:
      "Ownership and licensing depend on the source of the material and the accepted project terms.",
    items: [
      "Website Design Dogs and LA CREATIVO GROUP, LLC retain their names, marks, website content, reusable methods, systems, pre-existing materials, and other intellectual property.",
      "Project deliverables, source files, transfer conditions, portfolio permissions, licenses, and client ownership rights are governed by the accepted written agreement and completion of applicable payment obligations.",
      "Third-party software, fonts, themes, stock assets, plugins, platforms, and services remain subject to their owners’ licenses, terms, fees, changes, and availability.",
      "Links to third-party websites are provided for convenience and do not constitute control, endorsement, or responsibility for those websites.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers and Results",
    intro:
      "Professional work can improve a digital foundation, but business and platform outcomes depend on many factors outside one provider’s control.",
    items: [
      "Website content is provided for general information and is not legal, tax, accounting, financial, or investment advice.",
      "We do not guarantee rankings, traffic, leads, followers, sales, revenue, approval by a platform or app store, uninterrupted availability, or a particular business result.",
      "Estimated schedules depend on timely approvals, content, access, third-party services, and the assumptions stated in the written agreement.",
      "To the fullest extent permitted by law, the public website is provided as available without warranties not expressly stated in a signed agreement.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    intro:
      "Risk allocation for paid work is governed primarily by the applicable written agreement and mandatory law.",
    items: [
      "To the fullest extent permitted by law, Website Design Dogs and LA CREATIVO GROUP, LLC are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from public website use or third-party services.",
      "Any project-specific liability cap, exclusions, indemnity, warranty, or remedy is controlled by the accepted written agreement.",
      "Nothing in these terms excludes liability or remedies that cannot legally be excluded or limited.",
    ],
  },
  {
    id: "suspension-termination",
    title: "Suspension and Termination",
    intro:
      "Website or project access may be limited when necessary to protect people, systems, rights, or the accepted agreement.",
    items: [
      "We may suspend access, reject submissions, pause work, or terminate participation for misuse, security threats, unlawful activity, nonpayment, missing dependencies, abusive conduct, or material breach, subject to applicable written terms and law.",
      "Sections that by their nature should continue—including intellectual property, payment obligations, disclaimers, liability limits, and governing law—survive termination.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and General Terms",
    intro:
      "These general website terms use Texas law while preserving rights that apply regardless of contractual choice.",
    items: [
      "These terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles, except where mandatory consumer law requires otherwise.",
      "Disputes concerning only these public website terms will be brought in a court with lawful jurisdiction in Texas unless an accepted written agreement or mandatory law provides another forum.",
      "If a provision is found unenforceable, the remaining provisions continue in effect. A failure to enforce a provision is not a waiver.",
      "These terms, together with the Privacy Policy, Cookie Policy, Refund and Cancellation Policy, and any accepted written agreement, form the applicable set of terms for the relevant interaction.",
    ],
  },
  {
    id: "changes-contact",
    title: "Changes and Contact",
    intro:
      "These terms may be updated prospectively as the website and business practices change.",
    items: [
      "The Last updated date identifies the current version. Material changes will be presented through an appropriate notice when required.",
      "Questions about these terms can be submitted through /contact.",
      "When an accepted proposal, order form, statement of work, or written agreement conflicts with these general website terms, the accepted project terms control for that project, except where law does not permit the difference.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="August 31, 2026"
      intro="General terms for using the Website Design Dogs website and requesting professional services."
      sections={termsGroups}
      darkSrc="/brand/scenes/terms-hero-dark.webp"
      path="/terms-and-conditions"
    />
  );
}
