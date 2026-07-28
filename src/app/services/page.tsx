import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Services",
  description:
    "Explore professional website design, development, e-commerce, SEO foundations, content support, hosting, security, analytics, and conversion services for growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <WebPageJsonLd
        type="CollectionPage"
        name="Website Design Services"
        description="Professional website design, development, e-commerce, SEO foundations, content support, hosting, security, analytics, and conversion services."
        path="/services"
      />
      <JsonLd
        data={{
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
              provider: {
                "@id": `${getSiteUrl()}/#organization`,
              },
            },
          })),
        }}
      />
      <section className="services-hero" aria-labelledby="services-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/services-hero-dark.webp"
          lightSrc="/brand/scenes/services-hero-light.webp"
          alt="Website Design Dogs services mascot holding a device in a scenic environment"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="services-hero__scene"
        />
        <Container className="services-hero__content">
          <div className="services-hero__copy">
            <nav className="visual-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="home-eyebrow">Services</p>
            <h1 id="services-page-title">Website expertise under one roof.</h1>
            <p>Choose a focused service or combine the right disciplines into one clearly scoped project.</p>
          </div>
        </Container>
      </section>

      <section className="services-directory" aria-labelledby="services-directory-title">
        <Container>
          <h2 id="services-directory-title" className="sr-only">Our services</h2>
          <div className="services-directory-grid">
            {services.map((service, index) => (
              <article key={service.title} className="services-directory-card">
                <Image src={service.icon} alt="" width={32} height={32} className="services-directory-card__icon" />
                <span className="services-directory-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={`/services/${service.slug}`} className="services-directory-card__link" aria-label={`Explore ${service.title}`}>Explore service <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="compact-cta-strip" aria-labelledby="services-cta-title">
        <Container className="compact-cta-strip__inner">
          <div>
            <h2 id="services-cta-title">Ready to start your project?</h2>
            <p>Tell us what you need, and we’ll recommend the right next step.</p>
          </div>
          <Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
