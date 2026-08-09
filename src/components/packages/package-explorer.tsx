"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PackageLeadButton } from "@/components/packages/package-tracking";
import { Button } from "@/components/ui/button";
import {
  packageCategories,
  type PackageCategorySlug,
} from "@/content/packages";
import { cn } from "@/lib/utils";

export function PackageExplorer({
  compact = false,
  initialCategory = "website-design",
  showTabs = true,
}: {
  compact?: boolean;
  initialCategory?: PackageCategorySlug;
  showTabs?: boolean;
}) {
  const [activeSlug, setActiveSlug] = useState<PackageCategorySlug>(initialCategory);
  const activeCategory =
    packageCategories.find((category) => category.slug === activeSlug) ??
    packageCategories[0]!;

  const visiblePackages = useMemo(() => {
    if (!compact || activeCategory.slug !== "website-design") return activeCategory.packages;
    return activeCategory.featuredSlugs
      .map((slug) => activeCategory.packages.find((item) => item.slug === slug))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [activeCategory, compact]);

  return (
    <div className={cn("package-explorer", compact && "package-explorer--compact")}>
      {showTabs ? <div className="package-tabs" aria-label="Choose a service package category">
        {packageCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            aria-pressed={activeCategory.slug === category.slug}
            className={activeCategory.slug === category.slug ? "package-tab package-tab--active" : "package-tab"}
            onClick={() => setActiveSlug(category.slug)}
          >
            {category.shortTitle}
          </button>
        ))}
      </div> : null}

      <div className="package-explorer__intro" aria-live="polite">
        <div>
          <p className="home-eyebrow">{activeCategory.shortTitle}</p>
          <h3>{activeCategory.title}</h3>
          <p>{activeCategory.description}</p>
        </div>
        <Link href={`/services/${activeCategory.serviceSlug}`}>
          Explore service <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="packages-card-grid" data-category={activeCategory.slug}>
        {visiblePackages.map((item) => (
          <article
            key={item.slug}
            data-package={item.slug}
            className={item.label ? "packages-card packages-card--recommended" : "packages-card"}
          >
            {item.label ? <p className="packages-card__label">{item.label}</p> : null}
            <h4>{item.name}</h4>
            <p className="packages-card__price">
              {item.startingAt ? <small>From</small> : null}
              {item.price} <span>{item.priceSuffix}</span>
            </p>
            <p className="packages-card__description">{item.description}</p>
            <ul>
              {item.features.slice(0, compact ? 5 : 6).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="packages-card__actions">
              <PackageLeadButton href={item.quoteHref} slug={item.slug} featured={Boolean(item.label)}>
                Start with {item.name}
              </PackageLeadButton>
              <Button href={item.href} variant="outline">
                View Details
              </Button>
            </div>
          </article>
        ))}
      </div>

      {compact && activeCategory.slug === "website-design" ? (
        <div className="package-explorer__footer">
          <Button href="/packages#package-options" variant="outline">
            View all six website packages
          </Button>
        </div>
      ) : null}
    </div>
  );
}
