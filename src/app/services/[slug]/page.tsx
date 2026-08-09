import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullFaqAccordion } from "@/components/faq/faq-accordion";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { PageCta } from "@/components/pages/page-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ServiceJsonLd } from "@/components/seo/service-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { illustrationScenes } from "@/content/illustrations";
import { serviceBySlug, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
const stepIcons: BrandIconName[] = ["search", "pen-tool", "code-2", "rocket"];

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceBySlug.get((await params).slug);
  return service
    ? pageMetadata({ title: service.title, description: service.valueProposition, path: `/services/${service.slug}` })
    : {};
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = serviceBySlug.get((await params).slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((slug) => serviceBySlug.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const quoteHref = `/get-started?service=${encodeURIComponent(service.slug)}`;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]} />
      <WebPageJsonLd name={service.title} description={service.valueProposition} path={`/services/${service.slug}`} />
      <ServiceJsonLd service={service} />
      <FaqJsonLd items={service.faqs} />

      <section className="service-detail-hero" aria-labelledby="service-title">
        <ThemeScene
          darkSrc={illustrationScenes.serviceDetail.desktop.webp}
          darkAvifSrc={illustrationScenes.serviceDetail.desktop.avif}
          tabletDarkSrc={illustrationScenes.serviceDetail.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.serviceDetail.tablet.avif}
          mobileDarkSrc={illustrationScenes.serviceDetail.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.serviceDetail.mobile.avif}
          alt={`Border collie digital specialist preparing a ${service.title} project`}
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="service-detail-hero__scene"
        />
        <Container className="service-detail-hero__layout">
          <div className="service-detail-hero__copy">
            <HeroBreadcrumb items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]} />
            <p className="home-eyebrow">{service.eyebrow}</p>
            <h1 id="service-title">{service.title}</h1>
            <p>{service.valueProposition}</p>
            <div className="service-detail-hero__actions">
              <Button href={quoteHref} icon={<ArrowRightIcon />} testId="service-primary-quote">Get a Free Quote</Button>
              <Button href="/packages" variant="outline">View Packages</Button>
            </div>
            <ul className="service-detail-hero__proof" aria-label="Project foundations">
              {["Clear scope", "Responsive execution", "Practical handoff"].map((item) => (
                <li key={item}><BrandIcon name="clipboard-check" />{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="service-story final-section" aria-labelledby="service-story-title">
        <Container className="service-story__grid">
          <div className="service-story__art">
            <picture>
              <source type="image/avif" srcSet={service.illustration.avif} />
              <Image src={service.illustration.webp} alt={service.illustration.alt} width={960} height={640} priority sizes="(max-width: 900px) 100vw, 48vw" />
            </picture>
          </div>
          <div>
            <p className="home-eyebrow">What this service changes</p>
            <h2 id="service-story-title">{service.shortBenefit}</h2>
            <p>{service.description} The final plan reflects the agreed goals, source materials, platform constraints, responsibilities, and acceptance criteria.</p>
            <h3>Common problems this work addresses</h3>
            <ul className="check-list">{service.painPoints.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </Container>
      </section>

      <section className="service-results final-section final-section--alt" aria-labelledby="service-outcomes-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">The practical outcome</p>
            <h2 id="service-outcomes-title">Clarity visitors can feel and your team can use.</h2>
          </header>
          <div className="service-results__grid">
            {service.outcomes.map((item, index) => (
              <article key={item}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-scope final-section" aria-labelledby="service-includes-title">
        <Container className="service-scope__grid">
          <div>
            <p className="home-eyebrow">Typical inclusions</p>
            <h2 id="service-includes-title">A useful foundation, defined before work begins.</h2>
            <ul className="service-scope__list">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <aside className="service-scope__panel">
            <p className="home-eyebrow">Additional value</p>
            <h2>Decisions that support the wider system.</h2>
            <ul>{service.valueAdds.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>Exact deliverables, limits, third-party costs, timelines, and ownership responsibilities are confirmed in writing.</p>
          </aside>
        </Container>
      </section>

      <section className="service-process final-section final-section--alt" aria-labelledby="service-process-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">How we work</p>
            <h2 id="service-process-title">A visible path from context to completion.</h2>
          </header>
          <ol className="service-process__grid">
            {service.approach.map(([title, body], index) => (
              <li key={title}>
                <span className="inner-card-icon"><BrandIcon name={stepIcons[index] ?? "clipboard-check"} /></span>
                <p>0{index + 1}</p>
                <h3>{title}</h3>
                <span>{body}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="service-packages final-section" aria-labelledby="service-packages-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Package starting points</p>
            <h2 id="service-packages-title">Choose a tier or ask us to recommend one.</h2>
            <p>Listed prices cover the stated starting scope. The written proposal controls final deliverables and terms.</p>
          </header>
          <PackageExplorer initialCategory={service.packageCategory} showTabs={false} />
        </Container>
      </section>

      <section className="service-related final-section final-section--alt" aria-labelledby="related-services-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Related services</p>
            <h2 id="related-services-title">Build the right next layer.</h2>
          </header>
          <div className="service-related__grid">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`}>
                <Image src={item.icon} alt="" width={34} height={34} />
                <div><h3>{item.title}</h3><p>{item.shortBenefit}</p></div>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-faq final-section" aria-labelledby="service-faq-title">
        <Container>
          <header className="final-section-heading">
            <p className="home-eyebrow">Service questions</p>
            <h2 id="service-faq-title">Helpful answers before we scope the work.</h2>
          </header>
          <FullFaqAccordion items={service.faqs} />
        </Container>
      </section>

      <PageCta heading={`Ready to discuss ${service.title}?`} body="Share the business context and priorities, and we’ll recommend a practical next step." cta="Build Your Project Brief" href={quoteHref} />
    </>
  );
}

