import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Services",
  description:
    "Explore professional website design, development, e-commerce, SEO foundations, content support, hosting, security, analytics, and conversion services for growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
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
            <p className="home-eyebrow">Services</p>
            <h1 id="services-page-title">Services</h1>
            <nav className="visual-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
              <span aria-current="page">Services</span>
            </nav>
            <h2>Complete website solutions under one roof.</h2>
            <p>We offer end-to-end website services designed to support your business online.</p>
          </div>
        </Container>
      </section>

      <section className="services-directory" aria-labelledby="services-directory-title">
        <Container>
          <h2 id="services-directory-title" className="sr-only">Our services</h2>
          <div className="services-directory-grid">
            {services.map((service) => (
              <article key={service.title} className="services-directory-card">
                <Image src={service.icon} alt="" width={32} height={32} className="services-directory-card__icon" />
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
