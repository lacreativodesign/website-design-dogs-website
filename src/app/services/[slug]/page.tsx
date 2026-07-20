import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullFaqAccordion } from "@/components/faq/faq-accordion";
import { PageCta } from "@/components/pages/page-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { services, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const service = serviceBySlug.get((await params).slug); return service ? pageMetadata({ title: service.title, description: service.valueProposition, path: `/services/${service.slug}` }) : {}; }
export default async function ServiceDetailPage({ params }: Props) {
  const service = serviceBySlug.get((await params).slug); if (!service) notFound();
  const related = service.relatedSlugs.map((slug) => serviceBySlug.get(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const quoteHref = `/get-started?service=${encodeURIComponent(service.slug)}`;
  return <><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} /><FaqJsonLd items={service.faqs} />
    <section className="service-detail-hero" aria-labelledby="service-title"><Container><nav className="visual-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/services">Services</Link><span aria-hidden="true">›</span><span aria-current="page">{service.title}</span></nav><p className="home-eyebrow">{service.eyebrow}</p><h1 id="service-title">{service.title}</h1><p>{service.valueProposition}</p><div className="service-detail-hero__actions"><Button href={quoteHref} icon={<ArrowRightIcon />}>Get a Free Quote</Button><Button href="/services" variant="outline">Back to All Services</Button></div></Container></section>
    <section className="service-detail-section"><Container className="service-detail-intro"><div><p className="home-eyebrow">What this service is</p><h2>Practical work for a clearer website experience.</h2><p>{service.description} Each engagement is shaped around the agreed goals, available materials, and technical context.</p></div><div className="service-detail-panel"><h2>What’s included</h2><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul></div></Container></section>
    <section className="service-detail-section service-detail-section--alt"><Container className="service-detail-two-column"><div><p className="home-eyebrow">Who it’s for</p><h2>A focused fit for real business needs.</h2><ul className="service-detail-list">{service.forWho.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="home-eyebrow">Our approach</p><h2>Clear steps, shaped to scope.</h2><ol className="service-detail-steps">{service.approach.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></Container></section>
    <section className="service-detail-section"><Container><p className="home-eyebrow">Related services</p><h2 className="service-detail-heading">Build the right next layer.</h2><div className="service-detail-related">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`}><Image src={item.icon} alt="" width={32} height={32} /><span>{item.title}</span><b aria-hidden="true">→</b></Link>)}</div></Container></section>
    <section className="service-detail-section service-detail-section--alt" aria-labelledby="service-faq-title"><Container><p className="home-eyebrow">Service questions</p><h2 id="service-faq-title" className="service-detail-heading">Helpful answers before we scope the work.</h2><FullFaqAccordion items={service.faqs} /></Container></section>
    <PageCta heading={`Ready to discuss ${service.title}?`} body="Share the business context and priorities, and we’ll recommend a practical next step." cta="Get a Free Quote" href={quoteHref} />
  </>;
}
