"use client";

import { useState } from "react";
import { homepageFaqs } from "@/content/home";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return <div className="mt-10 grid gap-3">{homepageFaqs.map(([question, answer], index) => { const isOpen = open === index; const panelId = `home-faq-${index}`; return <div key={question} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"><button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left font-black" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? -1 : index)}><span>{question}</span><span aria-hidden="true" className="text-2xl text-[var(--color-primary-orange)]">{isOpen ? "−" : "+"}</span></button><div id={panelId} role="region" className={isOpen ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"} style={{ transition: "grid-template-rows var(--transition-med)" }}><div className="overflow-hidden"><p className="px-5 pb-5 text-[var(--color-text-muted)]">{answer}</p></div></div></div>; })}</div>;
}
