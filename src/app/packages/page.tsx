import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PackageDirectory } from "@/components/packages/package-directory";
import { PackageFaqAccordion } from "@/components/packages/package-faq-accordion";
import { PackagesViewTracker } from "@/components/packages/package-tracking";
import { TopLevelHero, ProofStrip, type ProofItem } from "@/components/pages/top-level-hero";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Container } from "@/components/ui/container";
import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { NumberedSectionHeading } from "@/components/ui/numbered-section-heading";
import { homeLeadAsset, homeLeadBenefits } from "@/content/home";
import { illustrationScenes } from "@/content/illustrations";
import {
  allPackages,
  optionalServices,
  packageFaqs,
  packageProcess,
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

      <PackageDirectory />

      <section className="optional-services final-section" aria-labelledby="optional-services-title">
        <Container>
          <NumberedSectionHeading number="03" eyebrow="Optional capabilities" id="optional-services-title" title="Add what the project actually needs." />
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
          <NumberedSectionHeading number="04" eyebrow="From package to delivery" id="package-process-title" title="A visible path with scope checks built in." />
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
          <NumberedSectionHeading number="05" eyebrow="Package questions" id="package-faq-title" title="Useful answers before you choose." />
          <PackageFaqAccordion />
        </Container>
      </section>

      <section className="home-section home-lead packages-connect" aria-labelledby="packages-contact-title">
        <Container>
          <div className="home-lead-grid">
            <div className="home-lead-copy">
              <NumberedSectionHeading number="06" eyebrow="Start your project" id="packages-contact-title" title={<>Let’s Build Around<br />Your <em>Business.</em></>} />
              <ul>{homeLeadBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              <Image src={homeLeadAsset} alt="Website Design Dogs mascot ready to plan a digital project" width={960} height={960} sizes="(max-width: 1023px) 100vw, 42vw" className="home-lead__image" />
            </div>
            <div className="home-lead-form"><ContactForm /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
