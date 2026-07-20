"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { portfolioConcepts, portfolioFilters } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioFilter() {
  const [active, setActive] = useState<(typeof portfolioFilters)[number]>("All");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const concepts = useMemo(() => active === "All" ? portfolioConcepts : portfolioConcepts.filter((concept) => concept.category === active), [active]);
  useEffect(() => { tabs.current[portfolioFilters.indexOf(active)]?.focus(); }, [active]);
  const select = (index: number) => setActive(portfolioFilters[(index + portfolioFilters.length) % portfolioFilters.length]);
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select(index + 1); }
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select(index - 1); }
    else if (event.key === "Home") { event.preventDefault(); select(0); }
    else if (event.key === "End") { event.preventDefault(); select(portfolioFilters.length - 1); }
  };
  return <div className="portfolio-filter">
    <div className="portfolio-filter__tabs" role="tablist" aria-label="Portfolio concept filters">
      {portfolioFilters.map((filter, index) => <button key={filter} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`portfolio-tab-${index}`} aria-selected={active === filter} aria-controls="portfolio-panel" tabIndex={active === filter ? 0 : -1} className={cn("portfolio-filter__tab", active === filter && "portfolio-filter__tab--active")} onClick={() => setActive(filter)} onKeyDown={(event) => handleTabKeyDown(event, index)}>{filter}</button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {concepts.length} design concepts{active === "All" ? "" : ` in ${active}`}.</p>
    <div id="portfolio-panel" role="tabpanel" aria-labelledby={`portfolio-tab-${portfolioFilters.indexOf(active)}`} className="portfolio-grid" data-active-filter={active}>
      {concepts.map((concept) => <article key={concept.id} data-concept-id={concept.id} className="portfolio-concept-card"><div className="portfolio-concept-card__media"><Image src={concept.image} alt={`${concept.title} design concept`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="portfolio-concept-card__image" /><span className="portfolio-concept-card__label">DESIGN CONCEPT</span></div><div className="portfolio-concept-card__body"><p>{concept.category}</p><h2>{concept.title}</h2></div></article>)}
    </div>
  </div>;
}
