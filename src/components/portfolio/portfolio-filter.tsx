"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { portfolioConcepts, portfolioIndustryFilters, portfolioWebsiteTypeFilters, type PortfolioIndustry, type PortfolioWebsiteType } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { PortfolioGallery } from "./portfolio-gallery";

type BrowseMode = "industry" | "type";
function filtersFor(mode: BrowseMode) { return mode === "industry" ? portfolioIndustryFilters : portfolioWebsiteTypeFilters; }
function isValidFilter(mode: BrowseMode, value: string) { return (filtersFor(mode) as readonly string[]).includes(value); }

export function PortfolioFilter({ heading }: { heading: ReactNode }) {
  const search = useSyncExternalStore((onChange) => { window.addEventListener("popstate", onChange); return () => window.removeEventListener("popstate", onChange); }, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  const mode: BrowseMode = params.get("browse") === "type" ? "type" : "industry";
  const requestedFilter = params.get("filter") || "All";
  const active = isValidFilter(mode, requestedFilter) ? requestedFilter : "All";
  const concepts = useMemo(() => active === "All" ? portfolioConcepts : portfolioConcepts.filter((item) => mode === "industry" ? item.industries.includes(active as PortfolioIndustry) : item.websiteTypes.includes(active as PortfolioWebsiteType)), [active, mode]);

  function sync(nextMode: BrowseMode, nextFilter: string) {
    const next = new URLSearchParams(window.location.search);
    if (nextMode === "industry" && nextFilter === "All") { next.delete("browse"); next.delete("filter"); }
    else { next.set("browse", nextMode); if (nextFilter === "All") next.delete("filter"); else next.set("filter", nextFilter); }
    const query = next.toString();
    window.history.replaceState(null, "", query ? `/portfolio?${query}` : "/portfolio");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  const filters = filtersFor(mode);
  return <div className="portfolio-filter">
    <div className="portfolio-filter-studio">
      <div className="portfolio-filter-studio__header">{heading}<div className="portfolio-browse-control"><div className="portfolio-browse-switch" role="group" aria-label="Choose how to browse portfolio concepts"><span>Browse by</span><button type="button" aria-pressed={mode === "industry"} onClick={() => sync("industry", "All")}>Industry</button><button type="button" aria-pressed={mode === "type"} onClick={() => sync("type", "All")}>Website Type</button></div></div></div>
      <div className="portfolio-filter__tabs" aria-label={mode === "industry" ? "Filter concepts by industry" : "Filter concepts by website type"}>{filters.map((filter) => <button key={filter} type="button" aria-pressed={active === filter} className={cn("portfolio-filter__tab", active === filter && "portfolio-filter__tab--active")} onClick={() => sync(mode, filter)}>{filter}</button>)}</div>
    </div>
    <p className="sr-only" aria-live="polite">Showing {concepts.length} design concepts{active === "All" ? "" : ` for ${active}`}.</p>
    <div data-active-filter={active} data-browse-mode={mode}><PortfolioGallery concepts={concepts} /></div>
  </div>;
}
