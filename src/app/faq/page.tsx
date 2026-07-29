import type { Metadata } from "next";
import { FullFaqAccordion } from "@/components/faq/faq-accordion";
import { PageCta } from "@/components/pages/page-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { faqCategories, featuredFaqs } from "@/content/faqs";
import { illustrationScenes } from "@/content/illustrations";
import { pageMetadata } from "@/lib/seo";

const faqCategoryIcons: BrandIconName[] = ["clipboard-check", "pen-tool", "code-2", "headset"];

export const metadata: Metadata = pageMetadata({
  title: "Website Design FAQs",
  description: "Read answers about Website Design Dogs services, process, scope, support, mobile readiness, hosting, and project launch expectations.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <WebPageJsonLd
        name="Website Design FAQs"
        description="Answers about Website Design Dogs services, process, scope, support, mobile readiness, hosting, and project launch expectations."
        path="/faq"
      />
      <FaqJsonLd items={featuredFaqs} />
      <section className="visual-page-hero visual-page-hero--faq" aria-labelledby="faq-page-title">
        <ThemeScene
          darkSrc={illustrationScenes.faq.desktop.webp}
          darkAvifSrc={illustrationScenes.faq.desktop.avif}
          tabletDarkSrc={illustrationScenes.faq.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.faq.tablet.avif}
          mobileDarkSrc={illustrationScenes.faq.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.faq.mobile.avif}
          alt="Border collie website consultant organizing clear answers to common project questions"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="visual-page-hero__scene"
        />
        <Container className="visual-page-hero__content">
          <HeroBreadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
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
                <span className="inner-card-icon"><BrandIcon name={faqCategoryIcons[index] ?? "clipboard-check"} /></span>
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
