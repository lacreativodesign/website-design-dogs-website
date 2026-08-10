"use client";

import { useMemo, useState } from "react";
import { PackageLeadButton } from "@/components/packages/package-tracking";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icon";
import {
  packageCategories,
  type PackageCategorySlug,
} from "@/content/packages";
import { cn } from "@/lib/utils";

export function PackageExplorer({
  compact = false,
  initialCategory = "website-design",
  showTabs = true,
  activeCategory,
  onCategoryChange,
}: {
  compact?: boolean;
  initialCategory?: PackageCategorySlug;
  showTabs?: boolean;
  activeCategory?: PackageCategorySlug;
  onCategoryChange?: (category: PackageCategorySlug) => void;
}) {
  const [internalSlug, setInternalSlug] = useState<PackageCategorySlug>(initialCategory);
  const activeSlug = activeCategory ?? internalSlug;
  const selectedCategory =
    packageCategories.find((category) => category.slug === activeSlug) ??
    packageCategories[0]!;

  const visiblePackages = useMemo(() => {
    if (!compact || selectedCategory.slug !== "website-design") return selectedCategory.packages;
    return selectedCategory.featuredSlugs
      .map((slug) => selectedCategory.packages.find((item) => item.slug === slug))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [selectedCategory, compact]);

  function chooseCategory(category: PackageCategorySlug) {
    setInternalSlug(category);
    onCategoryChange?.(category);
  }

  return (
    <div className={cn("package-explorer", compact && "package-explorer--compact")}>
      {showTabs ? <div className="package-tabs" aria-label="Choose a service package category">
        {packageCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            aria-pressed={selectedCategory.slug === category.slug}
            className={selectedCategory.slug === category.slug ? "package-tab package-tab--active" : "package-tab"}
            onClick={() => chooseCategory(category.slug)}
          >
            {category.shortTitle}
          </button>
        ))}
      </div> : null}

      <div className="package-explorer__intro" aria-live="polite">
        <div>
          <p className="home-eyebrow">{selectedCategory.shortTitle}</p>
          <h3>{selectedCategory.title}</h3>
          <p>{selectedCategory.description}</p>
        </div>
      </div>

      <div className="packages-card-grid" data-category={selectedCategory.slug}>
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
                Order Now
              </PackageLeadButton>
              <Button href={item.href} variant="outline">
                View Details
              </Button>
            </div>
          </article>
        ))}
      </div>

      {compact ? (
        <div className="package-explorer__footer">
          <Button href="/packages#package-options" variant="outline">
            View All Packages <ArrowRightIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
