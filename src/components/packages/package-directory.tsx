"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { Container } from "@/components/ui/container";
import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { NumberedSectionHeading } from "@/components/ui/numbered-section-heading";
import {
  comparisonRows,
  packageCategories,
  packageValueItems,
  type Package,
  type PackageCategorySlug,
} from "@/content/packages";

const valueIcons: BrandIconName[] = ["brush", "gauge", "search-check", "shield-check", "headset"];

function comparisonFor(categorySlug: PackageCategorySlug, packages: Package[]) {
  if (categorySlug === "website-design") return comparisonRows;

  return [
    ["Starting price", ...packages.map((pkg) => pkg.price)],
    ["Billing", ...packages.map((pkg) => pkg.priceSuffix)],
    ["Best suited to", ...packages.map((pkg) => pkg.idealFor[0] ?? "Scope dependent")],
    ["Core capacity", ...packages.map((pkg) => pkg.features[0] ?? "See details")],
    ["Supporting scope", ...packages.map((pkg) => pkg.features[1] ?? "See details")],
    ["Delivery or support", ...packages.map((pkg) => pkg.features.at(-1) ?? "See details")],
  ];
}

export function PackageDirectory() {
  const [activeSlug, setActiveSlug] = useState<PackageCategorySlug>("website-design");
  const activeCategory = packageCategories.find((category) => category.slug === activeSlug) ?? packageCategories[0]!;
  const rows = useMemo(
    () => comparisonFor(activeCategory.slug, activeCategory.packages),
    [activeCategory],
  );

  return (
    <>
      <section id="package-options" className="packages-directory final-section" aria-labelledby="package-options-title">
        <Container>
          <NumberedSectionHeading
            number="01"
            eyebrow="Six service categories"
            id="package-options-title"
            title={<>Start with the work <em>you need.</em></>}
            description={<p>Switch categories to compare every available package. Each detail page explains fit, inclusions, boundaries, and next steps.</p>}
          />
          <PackageExplorer activeCategory={activeSlug} onCategoryChange={setActiveSlug} />
          <div className="packages-value-rail" aria-label="Value built into every responsible scope">
            {packageValueItems.map(([title, body], index) => (
              <article key={title} className="value-benefit-tile">
                <BrandIcon name={valueIcons[index] ?? "brush"} />
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="compare" className="packages-comparison final-section final-section--alt" aria-labelledby="package-comparison-title">
        <Container>
          <NumberedSectionHeading
            number="02"
            eyebrow={`${activeCategory.shortTitle} comparison`}
            id="package-comparison-title"
            title={<>Compare the active <em>package category.</em></>}
            description={<p>The comparison updates with the category selected above, so the table always matches the offers currently being reviewed.</p>}
          />
          <div className="packages-comparison__scroll" role="region" aria-label={`${activeCategory.title} comparison`} tabIndex={0} aria-live="polite">
            <table>
              <thead>
                <tr>
                  <th scope="col">Scope</th>
                  {activeCategory.packages.map((pkg) => (
                    <th scope="col" key={pkg.slug}>
                      <Link href={pkg.href}>{pkg.name}<span>{pkg.price}</span></Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ...values]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((value, index) => (
                      <td key={`${label}-${activeCategory.packages[index]?.slug}`}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="packages-note">Final scope, responsibilities, third-party costs, and delivery terms are confirmed in the written proposal.</p>
        </Container>
      </section>
    </>
  );
}
