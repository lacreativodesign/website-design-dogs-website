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
      <section className="visual-page-hero" aria-labelledby="services-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/services-hero-dark.webp"
          lightSrc="/brand/scenes/services-hero-light.webp"
          alt="Website Design Dogs services mascot holding a device in a scenic environment"
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
            <span>Services</span>
          </nav>
          <p className="home-eyebrow">Services</p>
          <h1 id="services-page-title">Complete website solutions under one roof.</h1>
          <p>We offer end-to-end website services designed to grow your business online.</p>
        </Container>
      </section>

      <section className="directory-section" aria-labelledby="services-directory-title">
        <Container>
          <div className="directory-section__intro">
            <p className="home-eyebrow">WHAT WE DO</p>
            <h2 id="services-directory-title">Practical services for a stronger digital presence.</h2>
            <p>
              From first impressions to launch support, each service is structured to keep your website clear,
              responsive, maintainable, and ready for real customer actions.
            </p>
          </div>
          <div className="services-directory-grid">
            {services.map((service) => (
              <article key={service.title} className="directory-card">
                <Image src={service.icon} alt="" width={38} height={38} className="directory-card__icon" />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="compact-cta-strip" aria-labelledby="services-cta-title">
        <Container className="compact-cta-strip__inner">
          <div>
            <h2 id="services-cta-title">Ready to start your project?</h2>
            <p>Let’s build a website that drives real results.</p>
          </div>
          <Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
