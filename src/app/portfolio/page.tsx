import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { portfolioLeadBenefits, portfolioProcess, portfolioStrategy, portfolioTrustPoints } from "@/content/portfolio";
import { homeLeadAsset } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website Design Portfolio Concepts", description: "Explore Website Design Dogs design concepts for common business categories, created to show layout, hierarchy, and responsive thinking.", path: "/portfolio" });

function PortfolioHeading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: React.ReactNode; id: string }) {
  return <div className="home-section__heading home-section__heading--numbered"><span aria-hidden="true">{number}</span><div><p className="home-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

export default function PortfolioPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]} />
    <WebPageJsonLd type="CollectionPage" name="Website Design Portfolio Concepts" description="Explore Website Design Dogs design concepts for common business categories, created to show layout, hierarchy, and responsive thinking." path="/portfolio" />
    <section className="portfolio-hero" aria-labelledby="portfolio-page-title">
      <ThemeScene darkSrc="/brand/scenes/portfolio-hero-dark.webp" lightSrc="/brand/scenes/portfolio-hero-light.webp" alt="Website Design Dogs mascot beside website design screens" width={1600} height={1000} priority sizes="100vw" className="portfolio-hero__scene" />
      <Container className="portfolio-hero__content"><div className="portfolio-hero__copy"><nav className="visual-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><span>Portfolio</span></nav><p className="home-eyebrow">OUR WORK</p><h1 id="portfolio-page-title">WEBSITE CONCEPTS<br />BUILT FOR<br /><em>REAL BUSINESSES.</em></h1><p>Explore industry-focused website concepts created to show the strategy, clarity, and responsive experience we can build around your business.</p><div className="portfolio-hero__actions"><Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Start Your Project</Button><Button href="/packages" variant="outline" fullWidthMobile>View Packages</Button></div></div></Container>
    </section>

    <section className="portfolio-trust-strip" aria-label="Portfolio concept value points"><Container><div>{portfolioTrustPoints.map(([number, title, body]) => <article key={title}><span aria-hidden="true">{number}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></Container></section>

    <section className="home-section portfolio-directory" aria-labelledby="portfolio-directory-title"><Container><PortfolioHeading number="02" eyebrow="DESIGN CONCEPTS" id="portfolio-directory-title" title={<>See the Standard<br />Before You Commit.</>} /><div className="portfolio-directory__intro"><p>Explore layout direction, structure, and user flow across different industries before we build your custom website.</p></div><PortfolioFilter /></Container></section>

    <section className="home-section portfolio-breakdowns" aria-labelledby="portfolio-breakdowns-title"><Container><PortfolioHeading number="03" eyebrow="BEHIND THE DESIGN" id="portfolio-breakdowns-title" title={<>More Than a<br />Pretty Homepage.</>} /><div className="portfolio-breakdowns__rows"><article><div className="portfolio-breakdowns__copy"><p className="home-eyebrow">DESIGN CONCEPT</p><h3>Designed Around the Business</h3><ul><li>Clear service hierarchy</li><li>Quote-focused calls to action</li><li>Easy-to-scan structure</li><li>Responsive experience</li></ul></div><Image src="/portfolio/concepts/home-services-concept.webp" alt="Home services website design concept shown across devices" width={960} height={565} sizes="(max-width: 1023px) 100vw, 65vw" /></article><article><div className="portfolio-breakdowns__copy"><p className="home-eyebrow">DESIGN CONCEPT</p><h3>Built Across Every Screen</h3><ul><li>Authority-led layout</li><li>Clear practice areas</li><li>Enquiry pathway</li><li>Accessible content</li></ul></div><Image src="/portfolio/concepts/professional-services-concept.webp" alt="Professional services website design concept shown across devices" width={960} height={565} sizes="(max-width: 1023px) 100vw, 65vw" /></article></div></Container></section>

    <section className="home-section portfolio-strategy" aria-labelledby="portfolio-strategy-title"><Container><PortfolioHeading number="04" eyebrow="THE STANDARD" id="portfolio-strategy-title" title={<>Strategy You Can See.</>} /><div>{portfolioStrategy.map(([title, body], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>

    <section className="home-section portfolio-process" aria-labelledby="portfolio-process-title"><Container><PortfolioHeading number="05" eyebrow="YOUR PROJECT" id="portfolio-process-title" title={<>A Design Built<br />Around Your Business.</>} /><div>{portfolioProcess.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>

    <section className="home-section home-lead portfolio-lead" aria-labelledby="portfolio-lead-title"><Container><div className="home-lead-grid"><div className="home-lead-copy"><PortfolioHeading number="06" eyebrow="START YOUR PROJECT" id="portfolio-lead-title" title={<>Let’s Build a Website<br />Worth <em>Showing.</em></>} /><ul>{portfolioLeadBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><Image src={homeLeadAsset} alt="Website Design Dogs mascot working at a laptop" width={560} height={315} sizes="(max-width: 1023px) 100vw, 42vw" className="home-lead__image" /></div><div className="home-lead-form"><ContactForm /></div></div></Container></section>
  </>;
}
