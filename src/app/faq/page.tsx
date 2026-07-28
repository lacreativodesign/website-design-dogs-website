import type { Metadata } from "next";
import Link from "next/link";
import { FullFaqAccordion } from "@/components/faq/faq-accordion";
import { PageCta } from "@/components/pages/page-cta";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { faqCategories, featuredFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design FAQs",
  description: "Read answers about Website Design Dogs services, process, scope, support, mobile readiness, hosting, and project launch expectations.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={featuredFaqs} />
      <section className="visual-page-hero visual-page-hero--faq" aria-labelledby="faq-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/faq-hero-dark.webp"
          lightSrc="/brand/scenes/faq-hero-light.webp"
          alt="Website Design Dogs FAQ mascot scene"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="visual-page-hero__scene"
        />
        <Container className="visual-page-hero__content">
          <nav className="visual-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>FAQ</span>
          </nav>
          <p className="home-eyebrow">FAQ</p>
          <h1 id="faq-page-title">Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services, process, scope, and support.</p>
        </Container>
      </section>

      <section className="faq-page-section" aria-label="Frequently asked questions">
        <Container>
          <div className="faq-category-grid" aria-label="Question categories">
            {faqCategories.map((category, index) => (
              <article key={category.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{category.title}</h2>
                <p>{category.items.length} practical answers</p>
              </article>
            ))}
          </div>
          <header className="faq-page-heading">
            <p className="home-eyebrow">Most asked</p>
            <h2>Start with the essentials.</h2>
            <p>These answers explain the project basics without assuming details that still need to be scoped.</p>
          </header>
          <FullFaqAccordion items={featuredFaqs} />
        </Container>
      </section>

      <PageCta
        heading="Still deciding what your website needs?"
        body="Use the guided project brief and we’ll turn your answers into a sensible starting point."
        cta="Build Your Project Brief"
        href="/get-started"
      />
    </>
  );
}
