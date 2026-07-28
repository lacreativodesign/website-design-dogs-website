import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PackageFaqAccordion } from "@/components/packages/package-faq-accordion";
import { PackageLeadButton, PackagesViewTracker } from "@/components/packages/package-tracking";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { comparisonRows, optionalServices, packageProcess, packageTrustItems, packageValueItems, websitePackages } from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({ title: "Website Design Packages", description: "Compare Website Design Dogs Starter, Business, and Growth website packages for local and growing businesses.", path: "/packages" });

function SectionHeading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: string; id: string }) {
  return <header className="packages-section-heading"><span aria-hidden="true">{number}</span><div><p className="home-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div></header>;
}

export default function PackagesPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "OfferCatalog", name: "Website Design Packages", itemListElement: websitePackages.map((pkg) => ({ "@type": "Offer", name: pkg.name, price: pkg.priceValue, priceCurrency: "USD", url: absoluteUrl(pkg.href) })) }} />
    <PackagesViewTracker />
    <section className="packages-hero" aria-labelledby="packages-page-title">
      <ThemeScene darkSrc="/brand/scenes/packages-hero-dark.webp" lightSrc="/brand/scenes/packages-hero-light.webp" alt="Illustrated Website Design Dogs package screens" width={1600} height={1000} priority sizes="100vw" className="packages-hero__scene" />
      <Container className="packages-hero__content"><div className="packages-hero__copy"><nav className="visual-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><span>Packages</span></nav><p className="home-eyebrow">Packages</p><h1 id="packages-page-title">Choose the <span>right foundation.</span></h1><p>Clear website packages for businesses ready to launch, grow, and sell with confidence.</p><div className="packages-hero__actions"><Button href="/get-started?package=starter" icon={<ArrowRightIcon />}>Build Your Project Brief</Button><Button href="#compare" variant="outline">Compare Packages</Button></div><div className="packages-price-cue"><span>Packages from</span><strong>$499</strong><i /> <small>One-time<br />website build.</small></div></div></Container>
    </section>
    <section className="packages-trust-strip" aria-label="Package assurances"><Container><div>{packageTrustItems.map((item, index) => <p key={item}><b aria-hidden="true">{["◇", "☷", "▯", "◉"][index]}</b>{item}</p>)}</div></Container></section>
    <section className="packages-section" aria-labelledby="package-pricing-title"><Container><SectionHeading number="02" eyebrow="Website Packages" title="A Clear Starting Point for Every Stage." id="package-pricing-title" /><div className="packages-card-grid">{websitePackages.map((pkg) => <article key={pkg.slug} data-package={pkg.slug} className={pkg.label ? "packages-card packages-card--recommended" : "packages-card"}>{pkg.label ? <p className="packages-card__label">{pkg.label}</p> : null}<h3>{pkg.name}</h3><p className="packages-card__price">{pkg.price} <span>One Time</span></p><p className="packages-card__description">{pkg.description}</p><ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="packages-card__actions"><PackageLeadButton href={pkg.href} slug={pkg.slug} featured={Boolean(pkg.label)}>{pkg.cta}</PackageLeadButton><Link href={pkg.quoteHref}>Start with {pkg.name}</Link></div></article>)}</div><div className="packages-value-rail">{packageValueItems.map((item) => <span key={item}>◉ {item}</span>)}</div></Container></section>
    <section className="packages-section packages-section--alt" id="compare" aria-labelledby="package-comparison-title"><Container><SectionHeading number="03" eyebrow="Compare" title="See What Each Package Includes." id="package-comparison-title" /><div className="packages-table-wrap" role="region" aria-label="Website package comparison" tabIndex={0}><table><thead><tr><th scope="col">Feature</th>{websitePackages.map((pkg) => <th key={pkg.slug} scope="col">{pkg.name}</th>)}</tr></thead><tbody>{comparisonRows.map((row) => <tr key={row[0]}>{row.map((value, index) => <td key={`${row[0]}-${index}`} data-label={index === 0 ? "Feature" : websitePackages[index - 1].name}>{value}</td>)}</tr>)}</tbody></table></div><p className="packages-note">Final scope and deliverables are confirmed in your project proposal.</p></Container></section>
    <section className="packages-section" aria-labelledby="optional-services-title"><Container><SectionHeading number="04" eyebrow="Optional Services" title="Add What Your Business Needs." id="optional-services-title" /><div className="optional-services-grid">{optionalServices.map(([title, body, availability], index) => <article key={title}><span aria-hidden="true">{["◉", "✎", "◯", "⌑", "▥", "♢"][index]}</span><h3>{title}</h3><p>{body}</p><strong>{availability}</strong></article>)}</div></Container></section>
    <section className="packages-section packages-section--alt" aria-labelledby="process-title"><Container><SectionHeading number="05" eyebrow="Getting Started" title="From Package to Launch." id="process-title" /><ol className="packages-process">{packageProcess.map(([title, body], index) => <li key={title}><b>{index + 1}</b><h3>{title}</h3><p>{body}</p></li>)}</ol><p className="packages-note">Your proposal confirms deliverables, timeline, and payment schedule before work begins.</p></Container></section>
    <section className="packages-section" aria-labelledby="package-faq-title"><Container><SectionHeading number="06" eyebrow="Package FAQ" title="Questions Before You Choose." id="package-faq-title" /><PackageFaqAccordion /></Container></section>
    <section className="packages-section packages-connect" aria-labelledby="packages-contact-title"><Container><SectionHeading number="07" eyebrow="Let’s Connect" title="Not Sure Which Package Fits?" id="packages-contact-title" /><div className="packages-contact-grid"><div className="packages-contact-copy"><Image src="/brand/mascot/wdd-mascot-transparent.png" width={720} height={1024} alt="Website Design Dogs mascot" /><div><p>Tell us about your project and we’ll recommend the best starting point.</p><ul>{["Clear recommendation", "Transparent project scope", "No pressure", "A practical next step"].map((item) => <li key={item}>◉ {item}</li>)}</ul></div></div><div className="packages-contact-form"><ContactForm /></div></div></Container></section>
  </>;
}
