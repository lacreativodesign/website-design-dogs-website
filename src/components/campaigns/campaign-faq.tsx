"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const faqs = [
  [
    "What does the $499 Starter website include?",
    "The Starter package includes up to five core pages, a professional responsive layout, a contact or quote form, basic on-page SEO setup, one revision round, and launch support. Final requirements and responsibilities are confirmed before work begins.",
  ],
  [
    "Is $499 the one-time Starter package price?",
    "Yes. The listed Starter package is $499 one time for its defined base scope. Requirements outside that scope are reviewed and documented separately before any additional work is approved.",
  ],
  [
    "What is not automatically included?",
    "Domain registration, hosting, premium software, full copywriting, e-commerce, complex integrations, custom applications, ongoing marketing, and work outside the confirmed scope are not automatically included.",
  ],
  [
    "How long will the website take?",
    "Project timing depends on the confirmed scope, content readiness, feedback, integrations, and other requirements. Timing is documented before work begins.",
  ],
  [
    "Can you redesign my current website?",
    "Yes. The existing website can be reviewed to determine whether the Starter package fits the requested redesign or whether a different scope is required.",
  ],
  [
    "Will the website work on mobile devices?",
    "Yes. Responsive behavior is included so the core experience remains usable across phones, tablets, laptops, and desktops.",
  ],
  [
    "Is SEO included?",
    "Basic on-page SEO foundations are included. Search rankings, traffic, enquiries, and revenue cannot be guaranteed.",
  ],
  [
    "Will I own the completed website?",
    "Ownership, source files, platform responsibilities, third-party licences, hosting, and access are defined clearly in the project proposal before work begins.",
  ],
  [
    "Can I add more pages or features?",
    "Yes. Additional pages or features may be quoted separately when they fall outside the Starter package.",
  ],
];

export function CampaignFaq() {
  const [open, setOpen] = useState(0);

  return (
    <Section alternate>
      <Container>
        <h2 className="section-title">Starter Package FAQ</h2>
        <div className="mt-8 divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
          {faqs.map(([question, answer], index) => {
            const id = `campaign-faq-${index}`;
            return (
              <div key={question}>
                <button
                  className="flex w-full items-center justify-between p-5 text-left font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary-orange)]"
                  aria-expanded={open === index}
                  aria-controls={id}
                  onClick={() => setOpen(open === index ? -1 : index)}
                >
                  <span>{question}</span>
                  <span aria-hidden="true">{open === index ? "−" : "+"}</span>
                </button>
                <div
                  id={id}
                  hidden={open !== index}
                  className="px-5 pb-5 text-[var(--color-text-muted)]"
                >
                  {answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
