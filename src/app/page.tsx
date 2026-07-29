import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { homeHero, homeLeadAsset, homeLeadBenefits, homeProcess, homeTrustPoints, homeValueRail } from "@/content/home";
import { illustrationScenes } from "@/content/illustrations";
import { industries } from "@/content/industries";
import { websitePackages } from "@/content/packages";
import { portfolioConcepts } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Professional Website Design for Growing Businesses", description: "Website Design Dogs creates professional, mobile-ready websites for local and growing businesses with clear packages and dependable support.", path: "/" });

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

function SectionHeading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: React.ReactNode; id: string }) {
  return <div className="home-section__heading home-section__heading--numbered"><span aria-hidden="true">{number}</span><div><p className="home-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

export default function Home() { return <>
  <WebPageJsonLd name="Professional Website Design for Growing Businesses" description="Website Design Dogs creates professional, mobile-ready websites for local and growing businesses with clear packages and dependable support." path="/" />
  <section className="home-hero" aria-labelledby="home-hero-title"><ThemeScene
    darkSrc={illustrationScenes.home.desktop.webp}
    darkAvifSrc={illustrationScenes.home.desktop.avif}
    tabletDarkSrc={illustrationScenes.home.tablet.webp}
    tabletDarkAvifSrc={illustrationScenes.home.tablet.avif}
    mobileDarkSrc={illustrationScenes.home.mobile.webp}
    mobileDarkAvifSrc={illustrationScenes.home.mobile.avif}
    alt="Black-and-white border collie web designer working at a laptop beside a mountain lake at night"
    width={1600}
    height={1000}
    priority
    sizes="100vw"
    className="home-hero__scene"
  /><Container className="home-hero__content"><div className="home-hero__copy"><p className="home-eyebrow">{homeHero.eyebrow}</p><h1 id="home-hero-title" className="home-hero__title">WE DESIGN WEBSITES <span>THAT DELIVER RESULTS.</span></h1><p className="home-hero__body">{homeHero.body}</p><div className="home-hero__actions"><Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Get a Free Quote</Button><Button href="/portfolio" variant="outline" fullWidthMobile>View Our Work</Button></div><div className="home-price-cue"><strong>WEBSITES FROM <b>$499</b></strong><span>One-time pricing. Clear scope. No surprises.</span></div></div></Container></section>
  <section className="home-trust-strip" aria-label="Website Design Dogs commitments"><Container><div>{homeTrustPoints.map(([title, body], index) => <article key={title}><BrandIcon name={trustIcons[index] ?? "smartphone"} className="wdd-card-icon" /><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></Container></section>
  <section className="home-section home-process" aria-labelledby="process-title"><Container><SectionHeading number="02" eyebrow="HOW WE BUILD" id="process-title" title={<>A Clear Process.<br />Built With <em>Purpose.</em></>} /><div className="home-process__grid">{homeProcess.map(([, title, body], index) => <article key={title}><BrandIcon name={processIcons[index] ?? "search"} className="wdd-card-icon" /><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>
  <section className="home-section home-industries" aria-labelledby="home-industries-title"><Container><SectionHeading number="03" eyebrow="INDUSTRIES" id="home-industries-title" title={<>Different Businesses.<br />One Clear <em>Next Step.</em></>} /><p className="home-industries__intro">We shape each website around the way its audience compares, decides, and gets in touch.</p><div className="home-industries-grid">{industries.map((industry) => <Link key={industry.slug} href={`/get-started?industry=${industry.slug}`} className="home-industry-card"><BrandIcon name={industryIcons[industry.slug] ?? "building-2"} className="wdd-card-icon" /><h3>{industry.title}</h3><p>{industry.description}</p><strong>{industry.websiteFocus}</strong><b aria-hidden="true">→</b></Link>)}</div></Container></section>
  <section className="home-section home-work" aria-labelledby="home-portfolio-title"><Container><SectionHeading number="04" eyebrow="OUR WORK" id="home-portfolio-title" title={<>Website Concepts<br />Built for <em>Real Businesses.</em></>} /><PortfolioGallery concepts={portfolioConcepts.slice(0, 6)} className="home-portfolio-grid" /><div className="home-section__cta"><Button href="/portfolio" variant="outline">View Full Portfolio <ArrowRightIcon /></Button></div></Container></section>
  <section className="home-section home-packages" aria-labelledby="home-packages-title"><Container><SectionHeading number="05" eyebrow="PACKAGES" id="home-packages-title" title={<>Choose the Right <em>Foundation.</em></>} /><div className="home-packages-grid">{websitePackages.map((pkg) => <article key={pkg.slug} data-package={pkg.slug} className={`home-package-card${pkg.slug === "business" ? " home-package-card--featured" : ""}`}>{pkg.label ? <p className="home-package-label">{pkg.label}</p> : null}<h3>{pkg.name}</h3><p className="home-package-price">{pkg.price} <span>ONE TIME</span></p><p className="home-package-description">{pkg.description}</p><ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="home-package-actions"><Button href={pkg.quoteHref}>Order Now</Button><Button href={pkg.href} variant="outline">View Details</Button></div></article>)}</div><div className="home-value-rail" aria-label="Included website value">{homeValueRail.map(([title, body], index) => <article key={title} className="value-benefit-tile"><BrandIcon name={valueIcons[index] ?? "brush"} /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><div className="home-packages__footer"><Button href="/packages" variant="outline">View All Packages <ArrowRightIcon /></Button></div></Container></section>
  <section className="home-section home-lead" aria-labelledby="home-lead-title"><Container><div className="home-lead-grid"><div className="home-lead-copy"><SectionHeading number="06" eyebrow="START YOUR PROJECT" id="home-lead-title" title={<>Let’s Build a Website<br />Around <em>Your Business.</em></>} /><ul>{homeLeadBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><Image src={homeLeadAsset} alt="Website Design Dogs mascot ready to plan a website project" width={960} height={960} sizes="(max-width: 1023px) 100vw, 42vw" className="home-lead__image" /></div><div className="home-lead-form"><ContactForm /></div></div></Container></section>
</>; }
