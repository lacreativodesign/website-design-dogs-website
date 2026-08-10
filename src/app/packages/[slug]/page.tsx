import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageFaqAccordion } from "@/components/packages/package-faq-accordion";
import { PageCta } from "@/components/pages/page-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { illustrationScenes } from "@/content/illustrations";
import {
  allPackages,
  packageBySlug,
  packageCategoryBySlug,
  packageFaqs,
  packageProcess,
} from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

const faqItems = packageFaqs.map(([question, answer]) => ({ question, answer }));
const stepIcons: BrandIconName[] = ["mouse-pointer-click", "clipboard-check", "pen-tool", "code-2", "rocket"];

export function generateStaticParams() {
  return allPackages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = packageBySlug.get((await params).slug);
  return item ? pageMetadata({
    title: `${item.name} Package`,
    description: `${item.name} package at ${item.price} ${item.priceSuffix}. Review fit, inclusions, limits, exclusions, process, and next steps.`,
    path: item.href,
  }) : {};
}

export default async function PackageDetailPage({ params }: Props) {
  const item = packageBySlug.get((await params).slug);
  if (!item) notFound();

  const category = packageCategoryBySlug.get(item.categorySlug);
  if (!category) notFound();
  const related = category.packages.filter(({ slug }) => slug !== item.slug).slice(0, 5);
  const cadence = item.priceSuffix === "per month" ? "MONTH" : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", path: "/" },
        { name: "Packages", path: "/packages" },
        { name: item.name, path: item.href },
      ]} />
      <WebPageJsonLd name={`${item.name} Package`} description={`${item.description} Listed at ${item.price} ${item.priceSuffix}.`} path={item.href} />
      <FaqJsonLd items={faqItems} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absoluteUrl(item.href)}#service`,
        name: `${item.name} Package`,
        description: item.description,
        url: absoluteUrl(item.href),
        provider: { "@id": `${getSiteUrl()}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        offers: {
          "@type": "Offer",
          price: item.priceValue,
          priceCurrency: "USD",
          url: absoluteUrl(item.href),
          seller: { "@id": `${getSiteUrl()}/#organization` },
          ...(cadence ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: item.priceValue,
              priceCurrency: "USD",
              billingDuration: 1,
              billingIncrement: 1,
              unitText: cadence,
            },
          } : {}),
        },
      }} />

      <section className="package-detail-hero" aria-labelledby="package-detail-title">
        <ThemeScene
          darkSrc={illustrationScenes.packageDetail.desktop.webp}
          darkAvifSrc={illustrationScenes.packageDetail.desktop.avif}
          tabletDarkSrc={illustrationScenes.packageDetail.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.packageDetail.tablet.avif}
          mobileDarkSrc={illustrationScenes.packageDetail.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.packageDetail.mobile.avif}
          alt={`Border collie digital specialist reviewing the ${item.name} package plan`}
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="package-detail-hero__scene"
        />
        <Container className="package-detail-hero__content">
          <div className="package-detail-hero__copy">
            <HeroBreadcrumb items={[
              { label: "Home", href: "/" },
              { label: "Packages", href: "/packages" },
              { label: item.name },
            ]} />
            <p className="home-eyebrow">{category.title}</p>
            <h1 id="package-detail-title">{item.tagline}</h1>
            <p>{item.description}</p>
            <div className="package-detail-price">
              <span>{item.startingAt ? "Starting from" : "Package price"}</span>
              <strong>{item.price}</strong>
              <small>{item.priceSuffix}</small>
            </div>
            <div className="package-detail-actions">
              <Button href={item.quoteHref} size="large" icon={<ArrowRightIcon />}>Start with {item.name}</Button>
              <Button href={`/packages#package-options`} variant="outline" size="large">Compare Packages</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="package-detail-section" aria-labelledby="package-includes-title">
        <Container className="package-detail-overview">
          <div>
            <p className="home-eyebrow">Best fit</p>
            <h2>A clear starting point for the right requirements.</h2>
            <ul className="package-detail-fit-list">{item.idealFor.map((value) => <li key={value}>{value}</li>)}</ul>
          </div>
          <article className="package-detail-includes">
            <p className="home-eyebrow">Core scope</p>
            <h2 id="package-includes-title">What’s included</h2>
            <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </article>
        </Container>
      </section>

      <section className="package-detail-section package-detail-section--alt" aria-labelledby="package-boundaries-title">
        <Container className="package-boundaries-grid">
          <div>
            <p className="home-eyebrow">Scope notes</p>
            <h2 id="package-boundaries-title">What the starting scope assumes.</h2>
            <ul>{item.scopeNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </div>
          <aside>
            <p className="home-eyebrow">Not included</p>
            <h2>Costs and work kept outside this tier.</h2>
            <ul>{item.exclusions.map((note) => <li key={note}>{note}</li>)}</ul>
          </aside>
        </Container>
      </section>

      <section className="package-detail-section" aria-labelledby="package-process-title">
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">What happens next</p>
            <h2 id="package-process-title">A visible path from choice to delivery.</h2>
          </header>
          <ol className="package-detail-process">
            {packageProcess.map(([title, body], index) => (
              <li key={title}>
                <span className="inner-card-icon"><BrandIcon name={stepIcons[index] ?? "clipboard-check"} /></span>
                <p>0{index + 1}</p>
                <h3>{title}</h3>
                <span>{body}</span>
              </li>
            ))}
          </ol>
          <p className="packages-note">The listed amount is a starting price for the stated scope. Your proposal controls final deliverables, limits, responsibilities, third-party costs, timing, and payment terms.</p>
        </Container>
      </section>

      <section className="package-detail-section package-detail-section--alt" aria-labelledby="other-packages-title">
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">Keep comparing</p>
            <h2 id="other-packages-title">Other {category.shortTitle.toLowerCase()} starting points.</h2>
          </header>
          <div className="package-detail-related">
            {related.map((other) => (
              <Link href={other.href} key={other.slug}>
                <span>{other.name}</span>
                <strong>{other.price}</strong>
                <p>{other.tagline}</p>
                <b aria-hidden="true">View package →</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="package-detail-section" aria-labelledby="package-detail-faq-title">
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">Package questions</p>
            <h2 id="package-detail-faq-title">Helpful answers before you choose.</h2>
          </header>
          <PackageFaqAccordion />
        </Container>
      </section>

      <PageCta
        heading={`Does the ${item.name} package sound close?`}
        body="Complete the guided brief. We’ll review the details and confirm whether this package is the right starting point."
        cta="Build Your Project Brief"
        href={item.quoteHref}
      />
    </>
  );
}

