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
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import {
  packageFaqs,
  packageProcess,
  websitePackageBySlug,
  websitePackages,
} from "@/content/packages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const packageFaqItems = packageFaqs.map(([question, answer]) => ({
  question,
  answer,
}));

export function generateStaticParams() {
  return websitePackages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const websitePackage = websitePackageBySlug.get((await params).slug);
  if (!websitePackage) return {};

  return pageMetadata({
    title: `${websitePackage.name} Website Package`,
    description: `${websitePackage.name} website package starting at ${websitePackage.price}. Review the scope, best fit, process, and next steps.`,
    path: websitePackage.href,
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const websitePackage = websitePackageBySlug.get((await params).slug);
  if (!websitePackage) notFound();

  const otherPackages = websitePackages.filter(({ slug }) => slug !== websitePackage.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
          { name: websitePackage.name, path: websitePackage.href },
        ]}
      />
      <WebPageJsonLd
        name={`${websitePackage.name} Website Package`}
        description={`${websitePackage.name} website package starting at ${websitePackage.price}. ${websitePackage.description}`}
        path={websitePackage.href}
      />
      <FaqJsonLd items={packageFaqItems} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(websitePackage.href)}#service`,
          name: `${websitePackage.name} Website Package`,
          description: websitePackage.description,
          url: absoluteUrl(websitePackage.href),
          provider: {
            "@id": `${getSiteUrl()}/#organization`,
          },
          areaServed: {
            "@type": "Country",
            name: "United States",
          },
          offers: {
            "@type": "Offer",
            price: websitePackage.priceValue,
            priceCurrency: "USD",
            url: absoluteUrl(websitePackage.href),
            seller: {
              "@id": `${getSiteUrl()}/#organization`,
            },
          },
        }}
      />

      <section className="package-detail-hero" aria-labelledby="package-detail-title">
        <ThemeScene
          darkSrc="/brand/scenes/packages-hero-dark.webp"
          lightSrc="/brand/scenes/packages-hero-light.webp"
          alt=""
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="package-detail-hero__scene"
        />
        <Container className="package-detail-hero__content">
          <nav className="visual-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/packages">Packages</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{websitePackage.name}</span>
          </nav>
          <p className="home-eyebrow">{websitePackage.name} package</p>
          <h1 id="package-detail-title">{websitePackage.tagline}</h1>
          <p>{websitePackage.description}</p>
          <div className="package-detail-price">
            <span>Starting at</span>
            <strong>{websitePackage.price}</strong>
            <small>one-time website build</small>
          </div>
          <div className="package-detail-actions">
            <Button href={websitePackage.quoteHref} size="large" icon={<ArrowRightIcon />}>
              Start with {websitePackage.name}
            </Button>
            <Button href="/packages#compare" variant="outline" size="large">
              Compare Packages
            </Button>
          </div>
        </Container>
      </section>

      <section className="package-detail-section" aria-labelledby="package-includes-title">
        <Container className="package-detail-overview">
          <div>
            <p className="home-eyebrow">Best fit</p>
            <h2>A clear starting point for the right kind of project.</h2>
            <ul className="package-detail-fit-list">
              {websitePackage.idealFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <article className="package-detail-includes">
            <p className="home-eyebrow">Core scope</p>
            <h2 id="package-includes-title">What’s included</h2>
            <ul>
              {websitePackage.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="package-detail-section package-detail-section--alt" aria-labelledby="package-process-title">
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">What happens next</p>
            <h2 id="package-process-title">A visible path from choice to launch.</h2>
          </header>
          <ol className="package-detail-process">
            {packageProcess.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="package-detail-section" aria-labelledby="package-scope-title">
        <Container className="package-detail-scope">
          <div>
            <p className="home-eyebrow">Scope clarity</p>
            <h2 id="package-scope-title">What to know before choosing.</h2>
            <p>
              The listed price is a starting one-time project fee. Your proposal confirms deliverables,
              responsibilities, third-party costs, timeline, and payment terms before work begins.
            </p>
          </div>
          <ul>
            {websitePackage.scopeNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="package-detail-section package-detail-section--alt" aria-labelledby="other-packages-title">
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">Keep comparing</p>
            <h2 id="other-packages-title">Explore the other foundations.</h2>
          </header>
          <div className="package-detail-related">
            {otherPackages.map((item) => (
              <Link href={item.href} key={item.slug}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
                <p>{item.tagline}</p>
                <b aria-hidden="true">View package →</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="package-detail-section"
        aria-labelledby="package-detail-faq-title"
      >
        <Container>
          <header className="package-detail-heading">
            <p className="home-eyebrow">Package questions</p>
            <h2 id="package-detail-faq-title">
              Helpful answers before you choose.
            </h2>
          </header>
          <PackageFaqAccordion />
        </Container>
      </section>

      <PageCta
        heading={`Does the ${websitePackage.name} package sound close?`}
        body="Complete the guided brief. We’ll review the details and confirm whether this package is the right starting point."
        cta="Build Your Project Brief"
        href={websitePackage.quoteHref}
      />
    </>
  );
}
