"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { portfolioConcepts } from "@/content/home";
import { cn } from "@/lib/utils";

const filters = ["All", "Home Services", "Professional Services", "Health & Wellness", "Retail & Hospitality"] as const;

export function PortfolioTabs() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const concepts = useMemo(() => active === "All" ? portfolioConcepts : portfolioConcepts.filter((concept) => concept[1] === active), [active]);
  return <div className="mt-10"><div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Portfolio concept filters">{filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={active === filter} className={cn("rounded-full border px-4 py-2 text-sm font-black transition", active === filter ? "border-[var(--color-primary-orange)] bg-[var(--color-primary-orange)] text-white shadow-[0_12px_28px_rgb(255_106_0/.22)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]")} onClick={() => setActive(filter)}>{filter}</button>)}</div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{concepts.map(([title, category, src]) => <article key={src} className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-md)]"><div className="relative aspect-[4/3] overflow-hidden"><Image src={src} alt={`${title} preview`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-[1.035]" /><span className="absolute left-3 top-3 rounded-full bg-[var(--color-primary-orange)] px-3 py-1 text-[0.68rem] font-black tracking-[0.14em] text-white">DESIGN CONCEPT</span></div><div className="p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--color-primary-orange)]">{category}</p><h3 className="mt-2 text-lg font-black">{title}</h3></div></article>)}</div></div>;
}
