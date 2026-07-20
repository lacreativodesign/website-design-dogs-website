"use client";

import { useState } from "react";
import { packageFaqs } from "@/content/packages";

export function PackageFaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="packages-faq-grid">{packageFaqs.map(([question, answer], index) => {
    const isOpen = open === index;
    const panelId = `package-faq-${index}`;
    return <div className="packages-faq-row" key={question}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : index)}>
        <span>{question}</span><span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <div id={panelId} role="region" className={isOpen ? "packages-faq-panel packages-faq-panel--open" : "packages-faq-panel"}><div><p>{answer}</p></div></div>
    </div>;
  })}</div>;
}
