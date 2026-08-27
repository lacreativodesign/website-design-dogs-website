import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { ProofStrip, TopLevelHero, type ProofItem } from "@/components/pages/top-level-hero";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Container } from "@/components/ui/container";
import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { NumberedSectionHeading } from "@/components/ui/numbered-section-heading";
import { portfolioLeadBenefits, portfolioProcess, portfolioStrategy } from "@/content/portfolio";
import { homeLeadAsset } from "@/content/home";
import { illustrationScenes } from "@/content/illustrations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interactive Website Design Portfolio Concepts",
  description: "Explore twelve original, interactive Website Design Dogs concepts with distinct industries, art direction, content, and responsive layouts.",
  path: "/portfolio",
});

const portfolioStrategyIcons: BrandIconName[] = [
  "search-check",
  "palette",
  "smartphone",
  "mouse-pointer-click",
  "shield-check",
];
const portfolioProcessIcons: BrandIconName[] = ["search", "pen-tool", "rocket"];
const portfolioProof: ProofItem[] = [
  {
    title: "12 live design concepts",
    body: "Twelve complete directions with distinct brands, layouts, art direction, and content.",
    icon: "palette",
  },
  {
    title: "Two ways to browse",
    body: "Filter by industry or by the kind of website you need.",
    icon: "search-check",
  },
  {
    title: "Interactive and responsive",
    body: "Open any concept, scroll the full website, and explore its responsive structure.",
    icon: "smartphone",
  },
  {
    title: "Concepts, not case studies",
    body: "Nothing here is presented as completed client work or verified results.",
    icon: "shield-check",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]}
      />
      <WebPageJsonLd
        type="CollectionPage"
        name="Interactive Website Design Portfolio Concepts"
        description="Explore twelve original Website Design Dogs concepts with distinct industries, art direction, content, and responsive layouts."
        path="/portfolio"
      />
      <TopLevelHero
        id="portfolio-page-title"
        eyebrow="Interactive design concepts"
        title={
          <>
            Twelve directions.
            <br />
            <em>No repeated formula.</em>
          </>
        }
        body="Explore complete website concepts built to feel like real, polished digital products. Open any thumbnail to scroll the full experience."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        scene={illustrationScenes.portfolio}
        alt="Border collie designer reviewing a wall of website concepts in a creative studio"
        primaryCta={{ label: "Explore the Concepts", href: "#portfolio-directory-title" }}
        secondaryCta={{ label: "Start Your Project", href: "/get-started" }}
      />
      <ProofStrip label="Portfolio concept context" items={portfolioProof} />

      <section
        className="home-section portfolio-directory"
        aria-labelledby="portfolio-directory-title"
      >
        <Container>
          <PortfolioFilter
            heading={
              <NumberedSectionHeading
                number="02"
                eyebrow="LIVE DESIGN CONCEPTS"
                id="portfolio-directory-title"
                title={
                  <>
                    Pick a Direction.
                    <br />
                    Explore the Whole Site.
                  </>
                }
                description="Explore layout direction through twelve concepts, each with its own brand system, page architecture, original copy, responsive behavior, and coordinated AI-generated imagery."
              />
            }
          />
        </Container>
      </section>

      <section
        className="home-section portfolio-strategy"
        aria-labelledby="portfolio-strategy-title"
      >
        <Container>
          <NumberedSectionHeading
            number="03"
            eyebrow="THE STANDARD"
            id="portfolio-strategy-title"
            title={<>Strategy You Can See.</>}
          />
          <div>
            {portfolioStrategy.map(([title, body], index) => (
              <article key={title}>
                <span className="inner-card-icon">
                  <BrandIcon name={portfolioStrategyIcons[index] ?? "search-check"} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="home-section portfolio-process"
        aria-labelledby="portfolio-process-title"
      >
        <Container>
          <NumberedSectionHeading
            number="04"
            eyebrow="YOUR PROJECT"
            id="portfolio-process-title"
            title={
              <>
                A Design Built
                <br />
                Around Your Business.
              </>
            }
          />
          <div>
            {portfolioProcess.map(([step, title, body], index) => (
              <article key={title}>
                <div className="portfolio-process__top">
                  <span className="inner-card-icon">
                    <BrandIcon name={portfolioProcessIcons[index] ?? "clipboard-check"} />
                  </span>
                  <b>{step}</b>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="home-section home-lead portfolio-lead"
        aria-labelledby="portfolio-lead-title"
      >
        <Container>
          <div className="home-lead-grid">
            <div className="home-lead-copy">
              <NumberedSectionHeading
                number="05"
                eyebrow="START YOUR PROJECT"
                id="portfolio-lead-title"
                title={
                  <>
                    Let’s Build a Website
                    <br />
                    Worth <em>Showing.</em>
                  </>
                }
              />
              <ul>
                {portfolioLeadBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <Image
                src={homeLeadAsset}
                alt="Website Design Dogs mascot working at a laptop"
                width={960}
                height={960}
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="home-lead__image"
              />
            </div>
            <div className="home-lead-form">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
