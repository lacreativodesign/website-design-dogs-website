"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { portfolioConcepts, portfolioFilters } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { PortfolioGallery } from "./portfolio-gallery";

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
    <div id="portfolio-panel" role="tabpanel" aria-labelledby={`portfolio-tab-${portfolioFilters.indexOf(active)}`} data-active-filter={active}><PortfolioGallery concepts={concepts} /></div>
  </div>;
}
