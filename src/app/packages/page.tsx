import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { PackageFaqAccordion } from "@/components/packages/package-faq-accordion";
import { PackagesViewTracker } from "@/components/packages/package-tracking";
import { TopLevelHero, ProofStrip, type ProofItem } from "@/components/pages/top-level-hero";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { illustrationScenes, mascotDesigner } from "@/content/illustrations";
import {
  allPackages,
  comparisonRows,
  optionalServices,
  packageFaqs,
  packageProcess,
  packageValueItems,
  websitePackages,
} from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Website, Marketing & App Packages",
  description: "Compare 21 transparent starting packages across websites, e-commerce, SEO, social media, website care, and mobile apps.",
  path: "/packages",
});

const packageFaqItems = packageFaqs.map(([question, answer]) => ({ question, answer }));
const proofItems: ProofItem[] = [
  { title: "21 starting packages", body: "Clear entry points across six website, commerce, growth, care, and app categories.", icon: "clipboard-check" },
  { title: "Websites from $499", body: "One-time website tiers scale from a focused five-page build to a premium thirty-page foundation.", icon: "mouse-pointer-click" },
  { title: "No hidden platform fees", body: "External subscriptions, advertising, licenses, processors, and app-store costs stay visible and separate.", icon: "shield-check" },
  { title: "Scope before payment", body: "The written proposal confirms responsibilities, exclusions, timing, and final commercial terms.", icon: "heart-handshake" },
];
const valueIcons: BrandIconName[] = ["brush", "gauge", "search-check", "shield-check", "headset"];
const processIcons: BrandIconName[] = ["mouse-pointer-click", "clipboard-check", "pen-tool", "code-2", "rocket"];
const optionalIcons: BrandIconName[] = ["pen-tool", "mouse-pointer-click", "gauge", "code-2", "search-check", "heart-handshake"];

export default function PackagesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }]} />
      <WebPageJsonLd type="CollectionPage" name="Website, Marketing & App Packages" description="Compare 21 transparent starting packages across websites, e-commerce, SEO, social media, website care, and mobile apps." path="/packages" />
      <FaqJsonLd items={packageFaqItems} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Website Design Dogs packages",
        url: absoluteUrl("/packages"),
        itemListElement: allPackages.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          price: pkg.priceValue,
          priceCurrency: "USD",
          url: absoluteUrl(pkg.href),
          seller: { "@id": `${getSiteUrl()}/#organization` },
          itemOffered: { "@type": "Service", name: pkg.name, description: pkg.description },
        })),
      }} />
      <PackagesViewTracker />

      <TopLevelHero
        id="packages-page-title"
        eyebrow="Transparent starting points"
        title={<>Choose the <em>right foundation.</em></>}
        body="Compare clearly defined starting packages for websites, stores, discovery, social media, ongoing care, and mobile products."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Packages" }]}
        scene={illustrationScenes.packages}
        alt="Border collie designer comparing transparent digital service package options"
        primaryCta={{ label: "Build Your Project Brief", href: "/get-started" }}
        secondaryCta={{ label: "Compare Website Tiers", href: "#compare" }}
      />
      <ProofStrip label="Package foundations" items={proofItems} />

      <section id="package-options" className="packages-directory final-section" aria-labelledby="package-options-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Six service categories</p>
            <h2 id="package-options-title">Start with the work you need.</h2>
            <p>Switch categories to compare every available package. Each detail page explains fit, inclusions, boundaries, and next steps.</p>
          </header>
          <PackageExplorer />
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
          <header className="final-section-heading">
            <p className="home-eyebrow">Website package comparison</p>
            <h2 id="package-comparison-title">Six ways to build the right website foundation.</h2>
            <p>This table compares the fixed website tiers. Use the category tabs above for commerce, SEO, social, care, and app options.</p>
          </header>
          <div className="packages-comparison__scroll" role="region" aria-label="Website package comparison" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Scope</th>
                  {websitePackages.map((pkg) => <th scope="col" key={pkg.slug}><Link href={pkg.href}>{pkg.name}<span>{pkg.price}</span></Link></th>)}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, ...values]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((value, index) => <td key={`${label}-${websitePackages[index]?.slug}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="packages-note">Final scope, responsibilities, third-party costs, and delivery terms are confirmed in the written proposal.</p>
        </Container>
      </section>

      <section className="optional-services final-section" aria-labelledby="optional-services-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Optional capabilities</p>
            <h2 id="optional-services-title">Add what the project actually needs.</h2>
          </header>
          <div className="optional-services-grid">
            {optionalServices.map((service, index) => (
              <article key={service.title}>
                <span className="inner-card-icon"><BrandIcon name={optionalIcons[index] ?? "clipboard-check"} /></span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <strong>{service.availability}</strong>
                <Link href={service.href}>Explore service <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="package-process final-section final-section--alt" aria-labelledby="package-process-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">From package to delivery</p>
            <h2 id="package-process-title">A visible path with scope checks built in.</h2>
          </header>
          <ol className="packages-process">
            {packageProcess.map(([title, body], index) => (
              <li key={title}>
                <span className="inner-card-icon"><BrandIcon name={processIcons[index] ?? "clipboard-check"} /></span>
                <p>0{index + 1}</p>
                <h3>{title}</h3>
                <span>{body}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="package-faq final-section" aria-labelledby="package-faq-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Package questions</p>
            <h2 id="package-faq-title">Useful answers before you choose.</h2>
          </header>
          <PackageFaqAccordion />
        </Container>
      </section>

      <section className="packages-connect final-section final-section--alt" aria-labelledby="packages-contact-title">
        <Container className="packages-contact-grid">
          <aside className="packages-contact-copy">
            <picture className="packages-contact-copy__art">
              <source type="image/avif" srcSet={mascotDesigner.avif} />
              <Image src={mascotDesigner.webp} alt="Website Design Dogs mascot ready to help choose a package" width={960} height={960} />
            </picture>
            <p className="home-eyebrow">Need a recommendation?</p>
            <h2 id="packages-contact-title">Tell us what the business needs to do next.</h2>
            <p>We’ll use the requirements—not upselling—to identify the most responsible starting point.</p>
            <Button href="/get-started" variant="outline">Use the Guided Brief <ArrowRightIcon /></Button>
          </aside>
          <div className="packages-contact-form">
            <h3>Send a quick enquiry</h3>
            <p>Add only what you know. We can clarify the rest.</p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

