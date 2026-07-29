import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { portfolioLeadBenefits, portfolioProcess, portfolioStrategy, portfolioTrustPoints } from "@/content/portfolio";
import { homeLeadAsset } from "@/content/home";
import { illustrationScenes } from "@/content/illustrations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website Design Portfolio Concepts", description: "Explore Website Design Dogs design concepts for common business categories, created to show layout, hierarchy, and responsive thinking.", path: "/portfolio" });

const portfolioTrustIcons: BrandIconName[] = ["palette", "clipboard-check", "smartphone", "mouse-pointer-click"];
const portfolioStrategyIcons: BrandIconName[] = ["search-check", "palette", "smartphone", "mouse-pointer-click", "shield-check"];
const portfolioProcessIcons: BrandIconName[] = ["search", "pen-tool", "rocket"];

function PortfolioHeading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: React.ReactNode; id: string }) {
  return <div className="home-section__heading home-section__heading--numbered"><span aria-hidden="true">{number}</span><div><p className="home-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

export default function PortfolioPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]} />
    <WebPageJsonLd type="CollectionPage" name="Website Design Portfolio Concepts" description="Explore Website Design Dogs design concepts for common business categories, created to show layout, hierarchy, and responsive thinking." path="/portfolio" />
    <section className="portfolio-hero" aria-labelledby="portfolio-page-title">
      <ThemeScene
        darkSrc={illustrationScenes.portfolio.desktop.webp}
        darkAvifSrc={illustrationScenes.portfolio.desktop.avif}
        tabletDarkSrc={illustrationScenes.portfolio.tablet.webp}
        tabletDarkAvifSrc={illustrationScenes.portfolio.tablet.avif}
        mobileDarkSrc={illustrationScenes.portfolio.mobile.webp}
        mobileDarkAvifSrc={illustrationScenes.portfolio.mobile.avif}
        alt="Border collie designer reviewing a wall of website concepts in a creative studio"
        width={1600}
        height={1000}
        priority
        sizes="100vw"
        className="portfolio-hero__scene"
      />
      <Container className="portfolio-hero__content"><div className="portfolio-hero__copy"><HeroBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} /><p className="home-eyebrow">OUR WORK</p><h1 id="portfolio-page-title">WEBSITE CONCEPTS<br />BUILT FOR<br /><em>REAL BUSINESSES.</em></h1><p>Explore industry-focused website concepts created to show the strategy, clarity, and responsive experience we can build around your business.</p><div className="portfolio-hero__actions"><Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Start Your Project</Button><Button href="/packages" variant="outline" fullWidthMobile>View Packages</Button></div></div></Container>
    </section>

    <section className="portfolio-trust-strip" aria-label="Portfolio concept value points"><Container><div>{portfolioTrustPoints.map(([, title, body], index) => <article key={title}><span className="inner-card-icon"><BrandIcon name={portfolioTrustIcons[index] ?? "palette"} /></span><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></Container></section>

    <section className="home-section portfolio-directory" aria-labelledby="portfolio-directory-title"><Container><PortfolioHeading number="02" eyebrow="DESIGN CONCEPTS" id="portfolio-directory-title" title={<>See the Standard<br />Before You Commit.</>} /><div className="portfolio-directory__intro"><p>Explore layout direction, structure, and user flow across different industries before we build your custom website.</p></div><PortfolioFilter /></Container></section>

    <section className="home-section portfolio-strategy" aria-labelledby="portfolio-strategy-title"><Container><PortfolioHeading number="03" eyebrow="THE STANDARD" id="portfolio-strategy-title" title={<>Strategy You Can See.</>} /><div>{portfolioStrategy.map(([title, body], index) => <article key={title}><span className="inner-card-icon"><BrandIcon name={portfolioStrategyIcons[index] ?? "search-check"} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>

    <section className="home-section portfolio-process" aria-labelledby="portfolio-process-title"><Container><PortfolioHeading number="04" eyebrow="YOUR PROJECT" id="portfolio-process-title" title={<>A Design Built<br />Around Your Business.</>} /><div>{portfolioProcess.map(([, title, body], index) => <article key={title}><span className="inner-card-icon"><BrandIcon name={portfolioProcessIcons[index] ?? "clipboard-check"} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>

    <section className="home-section home-lead portfolio-lead" aria-labelledby="portfolio-lead-title"><Container><div className="home-lead-grid"><div className="home-lead-copy"><PortfolioHeading number="05" eyebrow="START YOUR PROJECT" id="portfolio-lead-title" title={<>Let’s Build a Website<br />Worth <em>Showing.</em></>} /><ul>{portfolioLeadBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><Image src={homeLeadAsset} alt="Website Design Dogs mascot working at a laptop" width={960} height={960} sizes="(max-width: 1023px) 100vw, 42vw" className="home-lead__image" /></div><div className="home-lead-form"><ContactForm /></div></div></Container></section>
  </>;
}
