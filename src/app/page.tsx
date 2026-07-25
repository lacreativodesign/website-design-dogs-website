import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { homeHero, homeHeroAsset, homeLeadAsset, homeLeadBenefits, homeProcess, homeTrustPoints, homeValueRail } from "@/content/home";
import { websitePackages } from "@/content/packages";
import { portfolioConcepts } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Professional Website Design for Growing Businesses", description: "Website Design Dogs creates professional, mobile-ready websites for local and growing businesses with clear packages and dependable support.", path: "/" });

function SectionHeading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: React.ReactNode; id: string }) {
  return <div className="home-section__heading home-section__heading--numbered"><span aria-hidden="true">{number}</span><div><p className="home-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

export default function Home() { return <>
  <section className="home-hero" aria-labelledby="home-hero-title"><Image src={homeHeroAsset} alt="Website Design Dogs mascot at a laptop" fill priority sizes="100vw" className="home-hero__background" /><Container className="home-hero__content"><div className="home-hero__copy"><p className="home-eyebrow">{homeHero.eyebrow}</p><h1 id="home-hero-title" className="home-hero__title">WE DESIGN WEBSITES <span>THAT DELIVER RESULTS.</span></h1><p className="home-hero__body">{homeHero.body}</p><div className="home-hero__actions"><Button href="/get-started" icon={<ArrowRightIcon />} fullWidthMobile>Get a Free Quote</Button><Button href="/portfolio" variant="outline" fullWidthMobile>View Our Work</Button></div><div className="home-price-cue"><strong>WEBSITES FROM <b>$499</b></strong><span>One-time pricing. Clear scope. No surprises.</span></div></div></Container></section>
  <section className="home-trust-strip" aria-label="Website Design Dogs commitments"><Container><div>{homeTrustPoints.map(([title, body], index) => <article key={title}><span aria-hidden="true">{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></Container></section>
  <section className="home-section home-process" aria-labelledby="process-title"><Container><SectionHeading number="02" eyebrow="HOW WE BUILD" id="process-title" title={<>A Proven Process.<br />Outstanding <em>Results.</em></>} /><div className="home-process__grid">{homeProcess.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></Container></section>
  <section className="home-section home-work" aria-labelledby="home-portfolio-title"><Container><SectionHeading number="03" eyebrow="OUR WORK" id="home-portfolio-title" title={<>Website Concepts<br />Built for <em>Real Businesses.</em></>} /><PortfolioGallery concepts={portfolioConcepts.slice(0, 6)} className="home-portfolio-grid" /><div className="home-section__cta"><Button href="/portfolio" variant="outline">View Full Portfolio <ArrowRightIcon /></Button></div></Container></section>
  <section className="home-section home-packages" aria-labelledby="home-packages-title"><Container><SectionHeading number="04" eyebrow="PACKAGES" id="home-packages-title" title={<>Choose the Right <em>Foundation.</em></>} /><div className="home-packages-grid">{websitePackages.map((pkg) => <article key={pkg.slug} data-package={pkg.slug} className={`home-package-card${pkg.slug === "business" ? " home-package-card--featured" : ""}`}>{pkg.label ? <p className="home-package-label">{pkg.label}</p> : null}<h3>{pkg.name}</h3><p className="home-package-price">{pkg.price} <span>ONE TIME</span></p><p className="home-package-description">{pkg.description}</p><ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Button href={pkg.href}>{pkg.cta}</Button></article>)}</div><div className="home-value-rail">{homeValueRail.map((item) => <span key={item}>{item}</span>)}</div></Container></section>
  <TestimonialsSection />
  <section className="home-section home-lead" aria-labelledby="home-lead-title"><Container><div className="home-lead-grid"><div className="home-lead-copy"><SectionHeading number="06" eyebrow="START YOUR PROJECT" id="home-lead-title" title={<>Let’s Build a Website<br />That Drives <em>Results.</em></>} /><ul>{homeLeadBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><Image src={homeLeadAsset} alt="Website Design Dogs mascot working at a laptop" width={560} height={315} sizes="(max-width: 1023px) 100vw, 42vw" className="home-lead__image" /></div><div className="home-lead-form"><Suspense fallback={<p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-4 text-sm font-bold text-[var(--color-text-muted)]">Loading secure enquiry form…</p>}><ContactForm /></Suspense></div></div></Container></section>
</>; }
