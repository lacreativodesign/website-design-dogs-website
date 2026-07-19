import type { Metadata } from "next";
import Link from "next/link";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { PackageSelector } from "@/components/packages/package-selector";
import { PackageLeadButton, PackagesViewTracker } from "@/components/packages/package-tracking";
import { packageAssurances, websitePackages } from "@/content/packages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Packages",
  description: "Compare Website Design Dogs Starter, Business, and Growth website packages for local and growing businesses.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Website Design Packages",
          itemListElement: websitePackages.map((pkg) => ({
            "@type": "Offer",
            name: pkg.name,
            price: pkg.price.replace("$", "").replace(",", ""),
            priceCurrency: "USD",
            url: "/packages",
          })),
        }}
      />

      <PackagesViewTracker />
      <section className="visual-page-hero visual-page-hero--packages" aria-labelledby="packages-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/packages-hero-dark.webp"
          lightSrc="/brand/scenes/packages-hero-light.webp"
          alt="Website Design Dogs packages scenic artwork"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="visual-page-hero__scene"
        />
        <Container className="visual-page-hero__content">
          <nav className="visual-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Packages</span>
          </nav>
          <p className="home-eyebrow">Packages</p>
          <h1 id="packages-page-title">Packages</h1>
          <p>Clear one-time website package pricing for different project needs.</p>
        </Container>
      </section>

      <section className="packages-pricing-section" aria-labelledby="packages-pricing-title">
        <Container>
          <PackageSelector />

          <div className="sr-only" id="packages-pricing-title">
            Website package pricing options
          </div>
          <div className="pricing-card-grid">
            {websitePackages.map((pkg) => (
              <article key={pkg.slug} className={pkg.label ? "pricing-card pricing-card--featured" : "pricing-card"}>
                {pkg.label ? <p className="pricing-card__label">{pkg.label}</p> : null}
                <h2>{pkg.name}</h2>
                <p className="pricing-card__price">{pkg.price}</p>
                <p className="pricing-card__one-time">One Time</p>
                <p className="pricing-card__description">{pkg.description}</p>
                <ul className="pricing-card__features">
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <PackageLeadButton href={pkg.href} slug={pkg.slug} featured={Boolean(pkg.label)}>
                  {pkg.cta}
                </PackageLeadButton>
              </article>
            ))}
          </div>

          <div className="package-assurance-grid" aria-label="Project scope assurances">
            {packageAssurances.map((item) => (
              <div key={item.title} className="package-assurance-item">
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="packages-final-cta">
            <Button href="/contact?package=custom" icon={<ArrowRightIcon />}>
              Request a Custom Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
