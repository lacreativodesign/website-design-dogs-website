import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { NumberedSectionHeading } from "@/components/ui/numbered-section-heading";
import { homeHero, homeLeadAsset, homeLeadBenefits, homeProcess, homeTrustPoints, homeValueRail } from "@/content/home";
import { illustrationScenes } from "@/content/illustrations";
import { industries } from "@/content/industries";
import { platforms } from "@/content/platforms";
import { portfolioConcepts } from "@/content/portfolio";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Professional Website Design for Growing Businesses",
  description: "Website Design Dogs creates websites, stores, search foundations, social campaigns, apps, and ongoing digital support with transparent starting packages.",
  path: "/",
});

const trustIcons: BrandIconName[] = ["smartphone", "clipboard-check", "mouse-pointer-click", "heart-handshake"];
const processIcons: BrandIconName[] = ["search", "pen-tool", "code-2", "rocket", "trending-up"];
const valueIcons: BrandIconName[] = ["brush", "gauge", "search-check", "shield-check", "headset"];
const industryIcons: Record<string, BrandIconName> = {
  "home-services": "house",
  "professional-services": "briefcase-business",
  "health-wellness": "heart-pulse",
  "restaurants-hospitality": "utensils-crossed",
  "retail-ecommerce": "shopping-bag",
  "real-estate": "building-2",
  "creative-businesses": "palette",
  "local-organizations": "map-pin-house",
};

export default function Home() {
  return (
    <>
      <WebPageJsonLd name="Professional Website Design for Growing Businesses" description="Website Design Dogs creates websites, stores, search foundations, social campaigns, apps, and ongoing digital support with transparent starting packages." path="/" />

      <section className="home-hero" aria-labelledby="home-hero-title">
        <ThemeScene
          darkSrc={illustrationScenes.home.desktop.webp}
          darkAvifSrc={illustrationScenes.home.desktop.avif}
          tabletDarkSrc={illustrationScenes.home.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.home.tablet.avif}
          mobileDarkSrc={illustrationScenes.home.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.home.mobile.avif}
          alt="Border collie digital designer working at a laptop beside a mountain lake at night"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="home-hero__scene"
        />
        <Container className="home-hero__content">
          <div className="home-hero__copy">
            <p className="home-eyebrow">{homeHero.eyebrow}</p>
            <h1 id="home-hero-title" className="home-hero__title">WE BUILD DIGITAL EXPERIENCES <span>THAT MOVE BUSINESS.</span></h1>
            <p className="home-hero__body">Websites, commerce, search, social, apps, and ongoing support—organized around clear scope, practical ownership, and useful next steps.</p>
            <div className="home-hero__actions">
              <Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Get a Free Quote</Button>
              <Button href="/services" variant="outline" fullWidthMobile>Explore Services</Button>
            </div>
            <div className="home-price-cue"><strong>WEBSITES FROM <b>$499</b></strong><span>One-time starting price. Scope confirmed first.</span></div>
          </div>
        </Container>
      </section>

      <section className="home-trust-strip" aria-label="Website Design Dogs commitments">
        <Container><div>{homeTrustPoints.map(([title, body], index) => (
          <article key={title}><BrandIcon name={trustIcons[index] ?? "smartphone"} className="wdd-card-icon" /><div><h2>{title}</h2><p>{body}</p></div></article>
        ))}</div></Container>
      </section>

      <section className="home-section home-services-final" aria-labelledby="home-services-title">
        <Container>
          <NumberedSectionHeading number="01" eyebrow="Connected capabilities" id="home-services-title" title={<>Start With the Service<br />That Solves the <em>Next Problem.</em></>} />
          <div className="home-services-final__grid">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="home-service-final-card">
                <Image src={service.icon} alt="" width={40} height={40} />
                <h3>{service.title}</h3>
                <p>{service.shortBenefit}</p>
                <span>Explore <b aria-hidden="true">→</b></span>
              </Link>
            ))}
          </div>
          <div className="home-section__cta"><Button href="/services" variant="outline">View All Services <ArrowRightIcon /></Button></div>
        </Container>
      </section>

      <section className="home-section home-process" aria-labelledby="process-title">
        <Container>
          <NumberedSectionHeading number="02" eyebrow="How we work" id="process-title" title={<>A Clear Process.<br />Built With <em>Purpose.</em></>} />
          <div className="home-process__grid">
            {homeProcess.map(([, title, body], index) => (
              <article key={title}><BrandIcon name={processIcons[index] ?? "search"} className="wdd-card-icon" /><p className="home-process__number">0{index + 1}</p><h3>{title}</h3><p className="home-process__body">{body}</p></article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-packages" aria-labelledby="home-packages-title">
        <Container>
          <NumberedSectionHeading number="03" eyebrow="Transparent packages" id="home-packages-title" title={<>Choose the Right <em>Foundation.</em></>} />
          <PackageExplorer compact />
          <div className="home-value-rail" aria-label="Included website value">
            {homeValueRail.map(([title, body], index) => (
              <article key={title} className="value-benefit-tile">
                <BrandIcon name={valueIcons[index] ?? "brush"} />
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-work" aria-labelledby="home-portfolio-title">
        <Container>
          <NumberedSectionHeading number="04" eyebrow="Design concepts" id="home-portfolio-title" title={<>See the Standard<br />Before You <em>Commit.</em></>} />
          <p className="home-section-intro">Browse clearly labelled design concepts by industry or website type. They demonstrate layout direction—not completed client work.</p>
          <PortfolioGallery concepts={portfolioConcepts.slice(0, 6)} className="home-portfolio-grid" />
          <div className="home-section__cta"><Button href="/portfolio" variant="outline">Browse the Portfolio <ArrowRightIcon /></Button></div>
        </Container>
      </section>

      <section className="home-section home-platforms" aria-labelledby="home-platforms-title">
        <Container>
          <NumberedSectionHeading number="05" eyebrow="Platform fit" id="home-platforms-title" title={<>Choose Technology<br />Around the <em>Requirements.</em></>} />
          <div className="home-platforms__layout">
            <div>
              <p>We assess ownership, editing, content, integrations, commerce, growth, and total operating cost before recommending a platform.</p>
              <Button href="/platforms" variant="outline">Explore Platform Options <ArrowRightIcon /></Button>
            </div>
            <div className="platform-name-grid">{platforms.map((platform) => <span key={platform.slug}>{platform.name}</span>)}</div>
          </div>
        </Container>
      </section>

      <section className="home-section home-industries home-industries--compact" aria-labelledby="home-industries-title">
        <Container>
          <NumberedSectionHeading number="06" eyebrow="Business context" id="home-industries-title" title={<>Different Audiences.<br />One Clear <em>Next Step.</em></>} />
          <p className="home-industries__intro">Industry context helps us shape customer questions, proof, content, and calls to action without forcing every business into the same template.</p>
          <div className="home-industries-grid">
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/get-started?industry=${industry.slug}`} className="home-industry-card">
                <BrandIcon name={industryIcons[industry.slug] ?? "building-2"} className="wdd-card-icon" />
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-lead" aria-labelledby="home-lead-title">
        <Container>
          <div className="home-lead-grid">
            <div className="home-lead-copy">
              <NumberedSectionHeading number="07" eyebrow="Start your project" id="home-lead-title" title={<>Let’s Build Around<br /><em>Your Business.</em></>} />
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
