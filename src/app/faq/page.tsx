import type { Metadata } from "next";
import Link from "next/link";
import { FullFaqAccordion } from "@/components/faq/faq-accordion";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { featuredFaqs } from "@/content/faqs";
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
          <FullFaqAccordion items={featuredFaqs} />
        </Container>
      </section>
    </>
  );
}
