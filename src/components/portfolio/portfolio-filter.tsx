"use client";

import Image from "next/image";
import { KeyboardEvent, useMemo, useState } from "react";
import { portfolioConcepts, portfolioFilters } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioFilter() {
  const [active, setActive] = useState<(typeof portfolioFilters)[number]>("All");
  const concepts = useMemo(
    () => (active === "All" ? portfolioConcepts : portfolioConcepts.filter((concept) => concept.category === active)),
    [active],
  );

  const moveTab = (filter: (typeof portfolioFilters)[number], direction: 1 | -1) => {
    const currentIndex = portfolioFilters.indexOf(filter);
    const nextIndex = (currentIndex + direction + portfolioFilters.length) % portfolioFilters.length;
    setActive(portfolioFilters[nextIndex]);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, filter: (typeof portfolioFilters)[number]) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTab(filter, 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTab(filter, -1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(portfolioFilters[0]);
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(portfolioFilters[portfolioFilters.length - 1]);
    }
  };

  return (
    <div className="portfolio-filter">
      <div className="portfolio-filter__tabs" role="tablist" aria-label="Portfolio concept filters">
        {portfolioFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            aria-controls="portfolio-panel"
            tabIndex={active === filter ? 0 : -1}
            className={cn("portfolio-filter__tab", active === filter && "portfolio-filter__tab--active")}
            onClick={() => setActive(filter)}
            onKeyDown={(event) => handleTabKeyDown(event, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div id="portfolio-panel" role="tabpanel" className="portfolio-grid">
        {concepts.map((concept) => (
          <article key={concept.image} className="portfolio-concept-card">
            <div className="portfolio-concept-card__media">
              <Image
                src={concept.image}
                alt={`${concept.title} design concept`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="portfolio-concept-card__image"
              />
              <span className="portfolio-concept-card__label">DESIGN CONCEPT</span>
            </div>
            <div className="portfolio-concept-card__body">
              <p>{concept.category}</p>
              <h2>{concept.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
