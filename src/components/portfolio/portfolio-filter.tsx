"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  portfolioConcepts,
  portfolioIndustryFilters,
  portfolioWebsiteTypeFilters,
  type PortfolioIndustry,
  type PortfolioWebsiteType,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { PortfolioGallery } from "./portfolio-gallery";

type BrowseMode = "industry" | "type";

function filtersFor(mode: BrowseMode) {
  return mode === "industry" ? portfolioIndustryFilters : portfolioWebsiteTypeFilters;
}

function isValidFilter(mode: BrowseMode, value: string) {
  return (filtersFor(mode) as readonly string[]).includes(value);
}

export function PortfolioFilter() {
  const search = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("popstate", onChange);
      return () => window.removeEventListener("popstate", onChange);
    },
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const mode: BrowseMode = params.get("browse") === "type" ? "type" : "industry";
  const requestedFilter = params.get("filter") || "All";
  const active = isValidFilter(mode, requestedFilter) ? requestedFilter : "All";

  const concepts = useMemo(() => {
    if (active === "All") return portfolioConcepts;
    return portfolioConcepts.filter((concept) =>
      mode === "industry"
        ? concept.industries.includes(active as PortfolioIndustry)
        : concept.websiteTypes.includes(active as PortfolioWebsiteType),
    );
  }, [active, mode]);

  function sync(nextMode: BrowseMode, nextFilter: string) {
    const params = new URLSearchParams(window.location.search);
    if (nextMode === "industry" && nextFilter === "All") {
      params.delete("browse");
      params.delete("filter");
    } else {
      params.set("browse", nextMode);
      if (nextFilter === "All") params.delete("filter");
      else params.set("filter", nextFilter);
    }
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/portfolio?${query}` : "/portfolio");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function chooseMode(nextMode: BrowseMode) {
    sync(nextMode, "All");
  }

  function chooseFilter(filter: string) {
    sync(mode, filter);
  }

  const filters = filtersFor(mode);

  return (
    <div className="portfolio-filter">
      <div className="portfolio-filter-studio">
        <div className="portfolio-filter-studio__header">
          <div>
            <span className="portfolio-filter-studio__kicker">Browse the concept studio</span>
            <strong>Find a direction that fits.</strong>
          </div>
          <div className="portfolio-browse-control">
            <span>Browse by</span>
            <div className="portfolio-browse-switch" role="group" aria-label="Choose how to browse portfolio concepts">
              <button type="button" aria-pressed={mode === "industry"} onClick={() => chooseMode("industry")}>
                Industry
              </button>
              <button type="button" aria-pressed={mode === "type"} onClick={() => chooseMode("type")}>
                Website Type
              </button>
            </div>
          </div>
        </div>

        <div className="portfolio-filter__tabs" aria-label={mode === "industry" ? "Filter concepts by industry" : "Filter concepts by website type"}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              className={cn("portfolio-filter__tab", active === filter && "portfolio-filter__tab--active")}
              onClick={() => chooseFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {concepts.length} design concepts{active === "All" ? "" : ` for ${active}`}.
      </p>
      <div data-active-filter={active} data-browse-mode={mode}>
        <PortfolioGallery concepts={concepts} />
      </div>
    </div>
  );
}
