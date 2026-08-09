import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TopLevelHero, ProofStrip, type ProofItem } from "@/components/pages/top-level-hero";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { illustrationScenes } from "@/content/illustrations";
import { platforms } from "@/content/platforms";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Digital Growth Services",
  description: "Explore ten clearly scoped services spanning websites, e-commerce, SEO, social media, apps, content, conversion, care, and analytics.",
  path: "/services",
});

const proofItems: ProofItem[] = [
  { title: "Scope before work", body: "Deliverables, responsibilities, exclusions, and outside costs are documented first.", icon: "clipboard-check" },
  { title: "Responsive by default", body: "Every digital experience is considered across representative phones, tablets, and desktops.", icon: "smartphone" },
  { title: "Built around goals", body: "Strategy and production stay connected to the next useful customer action.", icon: "mouse-pointer-click" },
  { title: "Accounts stay yours", body: "Client-owned domains, platforms, analytics, ad accounts, and stores remain under your control.", icon: "shield-check" },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <WebPageJsonLd type="CollectionPage" name="Website Design & Digital Growth Services" description="Ten clearly scoped services spanning websites, e-commerce, SEO, social media, apps, content, conversion, care, and analytics." path="/services" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Website Design Dogs services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/services/${service.slug}`),
          item: {
            "@type": "Service",
            name: service.title,
            description: service.valueProposition,
            provider: { "@id": `${getSiteUrl()}/#organization` },
          },
        })),
      }} />

      <TopLevelHero
        id="services-page-title"
        eyebrow="Ten connected services"
        title={<>Digital expertise that <em>works together.</em></>}
        body="Start with one focused need or combine the right disciplines into a clearly scoped website, commerce, growth, or product engagement."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        scene={illustrationScenes.services}
        alt="Border collie designer presenting a connected set of digital services in a moonlit studio"
        primaryCta={{ label: "Build Your Project Brief", href: "/get-started" }}
        secondaryCta={{ label: "Compare Packages", href: "/packages" }}
      />
      <ProofStrip label="How Website Design Dogs approaches every service" items={proofItems} />

      <section className="services-directory final-section" aria-labelledby="services-directory-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Explore services</p>
            <h2 id="services-directory-title">Choose the capability your business needs next.</h2>
            <p>Every service page explains the problem it addresses, typical inclusions, outcomes, package starting points, and scope boundaries.</p>
          </header>
          <div className="services-showcase-grid">
            {services.map((service) => (
              <article key={service.slug} className="service-showcase-card">
                <Link href={`/services/${service.slug}`} className="service-showcase-card__media" aria-label={`Explore ${service.title}`}>
                  <picture>
                    <source type="image/avif" srcSet={service.illustration.avif} />
                    <Image src={service.illustration.webp} alt={service.illustration.alt} width={960} height={640} sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </picture>
                </Link>
                <div className="service-showcase-card__body">
                  <p className="home-eyebrow">{service.eyebrow}</p>
                  <h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3>
                  <p>{service.shortBenefit}</p>
                  <ul>{service.includes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                  <Link href={`/services/${service.slug}`} className="service-showcase-card__link">Explore service <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="platform-teaser final-section final-section--alt" aria-labelledby="services-platform-title">
        <Container>
          <div className="platform-teaser__copy">
            <p className="home-eyebrow">Platform-fit, not platform-first</p>
            <h2 id="services-platform-title">The technology follows the business.</h2>
            <p>We assess editing needs, ownership, integrations, commerce, content, and growth requirements before recommending a platform.</p>
            <Button href="/platforms" variant="outline">Explore Platforms <ArrowRightIcon /></Button>
          </div>
          <div className="platform-name-grid" aria-label="Selected supported platforms">
            {platforms.slice(0, 6).map((platform) => <span key={platform.slug}>{platform.name}</span>)}
          </div>
        </Container>
      </section>

      <section className="compact-cta-strip" aria-labelledby="services-cta-title">
        <Container className="compact-cta-strip__inner">
          <div>
            <h2 id="services-cta-title">Not sure where the project fits?</h2>
            <p>Share the business context and we’ll recommend a practical starting point.</p>
          </div>
          <Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Get a Free Quote</Button>
        </Container>
      </section>
    </>
  );
}

