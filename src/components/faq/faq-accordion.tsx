"use client";

import { useState } from "react";
import { faqCategories, type FaqItem } from "@/content/faqs";

type FullFaqAccordionProps = {
  items?: readonly FaqItem[];
};

export function FullFaqAccordion({ items }: FullFaqAccordionProps) {
  const flatItems = items ?? faqCategories.flatMap((category) => category.items);
  const [open, setOpen] = useState(flatItems[0]?.question ?? "");

  return (
    <div className="faq-accordion-list">
      {flatItems.map((item, index) => {
        const isOpen = open === item.question;
        const panel = `faq-panel-${index}`;
        const button = `faq-button-${index}`;

        return (
          <div key={item.question} className="faq-accordion-row">
            <button
              id={button}
              type="button"
              className="faq-accordion-row__button"
              aria-expanded={isOpen}
              aria-controls={panel}
              onClick={() => setOpen(isOpen ? "" : item.question)}
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className="faq-accordion-row__icon">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panel}
              role="region"
              aria-labelledby={button}
              className={isOpen ? "faq-accordion-row__panel faq-accordion-row__panel--open" : "faq-accordion-row__panel"}
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
