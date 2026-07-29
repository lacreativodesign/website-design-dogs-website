import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { PackageFaqAccordion } from "@/components/packages/package-faq-accordion";
import { PackageLeadButton, PackagesViewTracker } from "@/components/packages/package-tracking";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { illustrationScenes, mascotDesigner } from "@/content/illustrations";
import {
  comparisonRows,
  optionalServices,
  packageFaqs,
  packageProcess,
  packageTrustItems,
  packageValueItems,
  websitePackages,
} from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Packages",
  description:
    "Compare Website Design Dogs Starter, Business, and Growth website packages for local and growing businesses.",
  path: "/packages",
});

const packageFaqItems = packageFaqs.map(([question, answer]) => ({ question, answer }));
const packageTrustIcons: BrandIconName[] = [
  "clipboard-check",
  "search-check",
  "smartphone",
  "heart-handshake",
];
const packageValueIcons: BrandIconName[] = [
  "brush",
  "gauge",
  "search-check",
  "shield-check",
  "headset",
];
const optionalServiceIcons: BrandIconName[] = [
  "palette",
  "pen-tool",
  "search-check",
  "clipboard-check",
  "gauge",
  "heart-handshake",
];
const packageProcessIcons: BrandIconName[] = [
  "mouse-pointer-click",
  "clipboard-check",
  "pen-tool",
  "code-2",
  "rocket",
];
const recommendationBenefits: [BrandIconName, string][] = [
  ["search-check", "Clear package recommendation"],
  ["clipboard-check", "Transparent project scope"],
  ["heart-handshake", "No-pressure guidance"],
  ["rocket", "A practical next step"],
];

function SectionHeading({
  number,
  eyebrow,
  title,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <header className="packages-section-heading">
      <span aria-hidden="true">{number}</span>
      <div>
        <p className="home-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </header>
  );
}

export default function PackagesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />
      <WebPageJsonLd
        type="CollectionPage"
        name="Website Design Packages"
        description="Compare Website Design Dogs Starter, Business, and Growth website packages for local and growing businesses."
        path="/packages"
      />
      <FaqJsonLd items={packageFaqItems} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Website Design Packages",
          url: absoluteUrl("/packages"),
          itemListElement: websitePackages.map((pkg) => ({
            "@type": "Offer",
            name: `${pkg.name} Website Package`,
            price: pkg.priceValue,
            priceCurrency: "USD",
            url: absoluteUrl(pkg.href),
            seller: { "@id": `${getSiteUrl()}/#organization` },
            itemOffered: {
              "@type": "Service",
              name: `${pkg.name} Website Package`,
              description: pkg.description,
            },
          })),
        }}
      />
      <PackagesViewTracker />

      <section className="packages-hero" aria-labelledby="packages-page-title">
        <ThemeScene
          darkSrc={illustrationScenes.packages.desktop.webp}
          darkAvifSrc={illustrationScenes.packages.desktop.avif}
          tabletDarkSrc={illustrationScenes.packages.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.packages.tablet.avif}
          mobileDarkSrc={illustrationScenes.packages.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.packages.mobile.avif}
          alt="Border collie website designer comparing three clear website package foundations"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="packages-hero__scene"
        />
        <Container className="packages-hero__content">
          <div className="packages-hero__copy">
            <HeroBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Packages" }]} />
            <p className="home-eyebrow">Packages</p>
            <h1 id="packages-page-title">
              Choose the <span>right foundation.</span>
            </h1>
            <p>Clear website packages for businesses ready to launch, grow, and sell with confidence.</p>
            <div className="packages-hero__actions">
              <Button href="/get-started?package=starter" icon={<ArrowRightIcon />}>
                Build Your Project Brief
              </Button>
              <Button href="#compare" variant="outline">
                Compare Packages
              </Button>
            </div>
            <div className="packages-price-cue">
              <span>Packages from</span>
              <strong>$499</strong>
              <i />
              <small>One-time website build.</small>
            </div>
          </div>
        </Container>
      </section>

      <section className="packages-trust-strip" aria-label="Package assurances">
        <Container>
          <div>
            {packageTrustItems.map((item, index) => (
              <p key={item}>
                <BrandIcon name={packageTrustIcons[index] ?? "clipboard-check"} />
                {item}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="packages-section" aria-labelledby="package-pricing-title">
        <Container>
          <SectionHeading
            number="02"
            eyebrow="Website Packages"
            title="A Clear Starting Point for Every Stage."
            id="package-pricing-title"
          />
          <div className="packages-card-grid">
            {websitePackages.map((pkg) => (
              <article
                key={pkg.slug}
                data-package={pkg.slug}
                className={pkg.label ? "packages-card packages-card--recommended" : "packages-card"}
              >
                {pkg.label ? <p className="packages-card__label">{pkg.label}</p> : null}
                <h3>{pkg.name}</h3>
                <p className="packages-card__price">
                  {pkg.price} <span>One Time</span>
                </p>
                <p className="packages-card__description">{pkg.description}</p>
                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="packages-card__actions">
                  <PackageLeadButton href={pkg.quoteHref} slug={pkg.slug} featured={Boolean(pkg.label)}>
                    Order Now
                  </PackageLeadButton>
                  <Button href={pkg.href} variant="outline">
                    View Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="packages-value-rail" aria-label="Included website value">
            {packageValueItems.map(([title, body], index) => (
              <article key={title} className="value-benefit-tile">
                <BrandIcon name={packageValueIcons[index] ?? "brush"} />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="packages-section packages-section--alt"
        id="compare"
        aria-labelledby="package-comparison-title"
      >
        <Container>
          <SectionHeading
            number="03"
            eyebrow="Compare"
            title="See What Each Package Includes."
            id="package-comparison-title"
          />
          <div
            className="packages-table-wrap"
            role="region"
            aria-label="Website package comparison"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {websitePackages.map((pkg) => (
                    <th key={pkg.slug} scope="col">
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((value, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        data-label={index === 0 ? "Feature" : websitePackages[index - 1].name}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="packages-note">
            Final scope and deliverables are confirmed in your project proposal.
          </p>
        </Container>
      </section>

      <section className="packages-section" aria-labelledby="optional-services-title">
        <Container>
          <SectionHeading
            number="04"
            eyebrow="Optional Services"
            title="Add What Your Business Needs."
            id="optional-services-title"
          />
          <div className="optional-services-grid">
            {optionalServices.map(([title, body, availability], index) => (
              <article key={title}>
                <span className="inner-card-icon">
                  <BrandIcon name={optionalServiceIcons[index] ?? "clipboard-check"} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <strong>{availability}</strong>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="packages-section packages-section--alt" aria-labelledby="process-title">
        <Container>
          <SectionHeading
            number="05"
            eyebrow="Getting Started"
            title="From Package to Launch."
            id="process-title"
          />
          <ol className="packages-process">
            {packageProcess.map(([title, body], index) => (
              <li key={title}>
                <span className="inner-card-icon">
                  <BrandIcon name={packageProcessIcons[index] ?? "clipboard-check"} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="packages-note">
            Your proposal confirms deliverables, timeline, and payment schedule before work begins.
          </p>
        </Container>
      </section>

      <section className="packages-section" aria-labelledby="package-faq-title">
        <Container>
          <SectionHeading
            number="06"
            eyebrow="Package FAQ"
            title="Questions Before You Choose."
            id="package-faq-title"
          />
          <PackageFaqAccordion />
        </Container>
      </section>

      <section className="packages-section packages-connect" aria-labelledby="packages-contact-title">
        <Container>
          <SectionHeading
            number="07"
            eyebrow="Let’s Connect"
            title="Not Sure Which Package Fits?"
            id="packages-contact-title"
          />
          <div className="packages-contact-grid">
            <aside className="packages-contact-copy">
              <div className="packages-contact-copy__art">
                <picture>
                  <source type="image/avif" srcSet={mascotDesigner.avif} />
                  <Image
                    src={mascotDesigner.webp}
                    width={900}
                    height={900}
                    alt="Website Design Dogs package guide"
                  />
                </picture>
              </div>
              <div className="packages-contact-copy__content">
                <p className="home-eyebrow">Package guidance</p>
                <h3>Tell us what the website needs to accomplish.</h3>
                <p>We’ll review the context and point you toward the clearest starting foundation.</p>
                <ul>
                  {recommendationBenefits.map(([icon, item]) => (
                    <li key={item}>
                      <BrandIcon name={icon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="packages-contact-form">
              <div className="packages-contact-form__heading">
                <p className="home-eyebrow">Free project review</p>
                <h3>Get a practical recommendation.</h3>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
