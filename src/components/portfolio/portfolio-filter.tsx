"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { portfolioConcepts, portfolioFilters } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { PortfolioGallery } from "./portfolio-gallery";

export function PortfolioFilter() {
  const [active, setActive] = useState<(typeof portfolioFilters)[number]>("All");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const concepts = useMemo(
    () => active === "All" ? portfolioConcepts : portfolioConcepts.filter((concept) => concept.category === active),
    [active],
  );

  const select = (index: number, moveFocus = false) => {
    const normalizedIndex = (index + portfolioFilters.length) % portfolioFilters.length;
    setActive(portfolioFilters[normalizedIndex]);
    if (moveFocus) tabs.current[normalizedIndex]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select(index + 1, true); }
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select(index - 1, true); }
    else if (event.key === "Home") { event.preventDefault(); select(0, true); }
    else if (event.key === "End") { event.preventDefault(); select(portfolioFilters.length - 1, true); }
  };

  return <div className="portfolio-filter">
    <div className="portfolio-filter__tabs" role="tablist" aria-label="Portfolio concept filters">
      {portfolioFilters.map((filter, index) => <button key={filter} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`portfolio-tab-${index}`} aria-selected={active === filter} aria-controls="portfolio-panel" tabIndex={active === filter ? 0 : -1} className={cn("portfolio-filter__tab", active === filter && "portfolio-filter__tab--active")} onClick={() => select(index)} onKeyDown={(event) => handleTabKeyDown(event, index)}>{filter}</button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {concepts.length} design concepts{active === "All" ? "" : ` in ${active}`}.</p>
    <div id="portfolio-panel" role="tabpanel" aria-labelledby={`portfolio-tab-${portfolioFilters.indexOf(active)}`} data-active-filter={active}><PortfolioGallery concepts={concepts} /></div>
  </div>;
}
