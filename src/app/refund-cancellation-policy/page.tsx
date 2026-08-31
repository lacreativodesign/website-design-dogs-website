import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Refund and Cancellation Policy",
  description:
    "General cancellation, refund-review, and payment-return principles for Website Design Dogs projects.",
  path: "/refund-cancellation-policy",
});

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of This Policy",
    intro:
      "This policy explains general cancellation and refund-review principles for Website Design Dogs enquiries and projects.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
      "The accepted proposal, order form, statement of work, subscription terms, or written agreement controls project-specific cancellation, payment, and refund rights when it is more specific than this general policy.",
      "Nothing in this policy limits a refund, cancellation, chargeback, or other remedy that cannot legally be limited.",
    ],
  },
  {
    id: "before-work",
    title: "Cancellation Before Work Begins",
    intro:
      "A request received before production begins is reviewed against actual commitments already made.",
    items: [
      "The review may consider discovery or administrative work already completed, reserved production capacity, onboarding activity, non-cancellable third-party purchases, payment-processing costs where law permits, and other commitments made for the project.",
      "A pre-start cancellation does not automatically guarantee a full refund unless the accepted written terms provide one or applicable law requires it.",
    ],
  },
  {
    id: "after-work",
    title: "Cancellation After Work Begins",
    intro:
      "Once work begins, the project record and completed value determine the available outcome.",
    items: [
      "Refund eligibility may consider completed work, approved milestones, time used, deliverables supplied, reserved capacity, dependencies, and third-party costs.",
      "Completed, delivered, approved, downloaded, transferred, or otherwise used work is not automatically refundable.",
      "If a project is cancelled, amounts due for work completed or committed through the effective cancellation date remain payable unless the written agreement or applicable law provides otherwise.",
    ],
  },
  {
    id: "deposits-milestones",
    title: "Deposits, Milestones, and Third-Party Costs",
    intro:
      "Payment types and outside costs are handled according to the accepted project terms.",
    items: [
      "Deposits, retainers, reservation fees, milestone payments, and final payments are refundable or non-refundable only as stated in the accepted written agreement and applicable law.",
      "Domains, hosting, platforms, themes, plugins, applications, licenses, advertising spend, payment processing, app-store fees, stock assets, and other third-party purchases may be non-cancellable or non-refundable under the provider’s own terms.",
      "Approved third-party purchases made for a project are not automatically refundable by Website Design Dogs.",
    ],
  },
  {
    id: "campaign-recurring",
    title: "Campaign and Recurring Services",
    intro:
      "Campaign landing pages and recurring services remain subject to their stated written scope.",
    items: [
      "Campaign landing pages use the same $499 one-time Starter package and do not create a separate automatic-refund entitlement.",
      "Recurring care, hosting, marketing, content, analytics, or other ongoing services may be cancelled prospectively according to the notice period and billing terms in the accepted agreement.",
      "A partial billing period is not automatically prorated or refundable unless the accepted terms or applicable law require it.",
    ],
  },
  {
    id: "delays-abandonment",
    title: "Client Delays, Pauses, and Abandonment",
    intro:
      "Missing inputs can affect scheduling, delivery, and the financial review of a cancellation.",
    items: [
      "Missing content, access, approvals, payment, or feedback may pause the project and move estimated dates.",
      "A prolonged client-caused pause or failure to respond may be handled as suspension, rescheduling, or abandonment under the accepted written agreement.",
      "Rescheduling may depend on current production capacity and may require payment of outstanding amounts or a restart fee when stated in the written terms.",
    ],
  },
  {
    id: "business-cancellation",
    title: "Cancellation by Website Design Dogs",
    intro:
      "Website Design Dogs may pause or cancel work when responsible delivery cannot continue.",
    items: [
      "Reasons may include nonpayment, missing access or information, unlawful or unsafe requests, abusive conduct, security risk, technical infeasibility, third-party restrictions, or material breach.",
      "If Website Design Dogs cancels without client breach, the project record, completed work, uncommitted balance, and accepted terms will be reviewed to determine any refund or transition obligations.",
    ],
  },
  {
    id: "request-process",
    title: "How to Request Cancellation or Review",
    intro:
      "Prompt written notice helps preserve the project record and identify avoidable third-party commitments.",
    items: [
      "Submit a written request through /contact and include the client or business name, project name, invoice or proposal reference if available, the requested effective date, and the reason for the request.",
      "Do not submit full card numbers, bank credentials, passwords, or other unnecessary sensitive information.",
      "A request is not final until receipt and the effective cancellation status are confirmed in writing.",
    ],
  },
  {
    id: "decision-payment",
    title: "Review, Decision, and Payment Method",
    intro:
      "Refund decisions are based on the accepted terms, project record, provider restrictions, and applicable law.",
    items: [
      "Website Design Dogs may request information needed to verify authority and review work completed, approvals, costs, milestones, and outstanding obligations.",
      "Approved refunds generally return through the original payment method where practical. Provider processing times, banking delays, currency conversion, and non-refundable external fees may affect the final timing or amount where permitted.",
      "A written decision will explain the approved outcome. Questions or a request for reconsideration can be submitted through /contact.",
    ],
  },
];

export default function RefundCancellationPage() {
  return (
    <LegalPage
      title="Refund and Cancellation Policy"
      updated="August 31, 2026"
      intro="General cancellation, refund-review, and payment-return principles for Website Design Dogs projects."
      sections={sections}
      darkSrc="/brand/scenes/terms-hero-dark.webp"
      path="/refund-cancellation-policy"
    />
  );
}
