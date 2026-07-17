import type { Metadata } from "next";
import Image from "next/image";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { homeCapabilities, homeHero, homeIndustryStrip, homeServices } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Professional Website Design for Growing Businesses",
  description:
    "Website Design Dogs creates professional, mobile-ready websites for local and growing businesses with clear packages and dependable support.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <ThemeScene
          darkSrc="/brand/scenes/home-hero-dark.webp"
          lightSrc="/brand/scenes/home-hero-light.webp"
          tabletDarkSrc="/brand/crops/tablet/home-dark.webp"
          tabletLightSrc="/brand/crops/tablet/home-light.webp"
          mobileDarkSrc="/brand/crops/mobile/home-dark.webp"
          mobileLightSrc="/brand/crops/mobile/home-light.webp"
          alt="Website Design Dogs mascot working outdoors on a professional website design scene"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="home-hero__scene"
          objectPosition="center"
        />
        <Container className="home-hero__content">
          <div className="home-hero__copy">
            <p className="home-eyebrow">{homeHero.eyebrow}</p>
            <h1 id="home-hero-title" className="home-hero__title">
              WE DESIGN WEBSITES
              <span>THAT DELIVER RESULTS.</span>
            </h1>
            <p className="home-hero__body">{homeHero.body}</p>
            <div className="home-hero__actions">
              <Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>
                Get a Free Quote
              </Button>
              <Button href="/portfolio" variant="outline" fullWidthMobile>
                View Our Work
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-industry-strip" aria-labelledby="home-industry-strip-title">
        <Container>
          <p id="home-industry-strip-title" className="home-strip-heading">
            BUILT FOR LOCAL BUSINESSES
          </p>
          <div className="home-industry-strip__grid">
            {homeIndustryStrip.map((industry) => (
              <div key={industry.title} className="home-industry-strip__item">
                <Image src={industry.icon} alt="" width={34} height={34} className="home-industry-strip__icon" />
                <span>{industry.title}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-services" aria-labelledby="home-services-title">
        <Container>
          <div className="home-section__heading">
            <p className="home-eyebrow">WHAT WE DO</p>
            <h2 id="home-services-title">Services That Help Your Business Grow</h2>
          </div>
          <div className="home-services__grid">
            {homeServices.map((service) => (
              <article key={service.title} className="home-service-card">
                <Image src={service.icon} alt="" width={40} height={40} className="home-service-card__icon" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <a href="/services" className="home-card-link">
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-capabilities" aria-label="Starter website package capabilities">
        <Container>
          <div className="home-capabilities__grid">
            {homeCapabilities.map((capability) => (
              <div key={`${capability.value}-${capability.label}`} className="home-capability-tile">
                <strong>{capability.value}</strong>
                <span>{capability.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
