import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Portfolio Concepts",
  description:
    "Explore Website Design Dogs portfolio concepts for local services, professional firms, health and wellness businesses, retailers, and hospitality brands.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="visual-page-hero visual-page-hero--wide" aria-labelledby="portfolio-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/portfolio-hero-dark.webp"
          lightSrc="/brand/scenes/portfolio-hero-light.webp"
          alt="Website Design Dogs portfolio mascot with scenic city and mountain artwork"
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
            <span>Portfolio</span>
          </nav>
          <p className="home-eyebrow">Portfolio</p>
          <h1 id="portfolio-page-title">Portfolio</h1>
          <p>A collection of website concepts designed for growing businesses.</p>
        </Container>
      </section>

      <section className="portfolio-directory" aria-labelledby="portfolio-directory-title">
        <Container>
          <div className="sr-only" id="portfolio-directory-title">
            Portfolio concept filters and cards
          </div>
          <PortfolioFilter />
          <div className="portfolio-directory__cta">
            <Button href="/get-started" icon={<ArrowRightIcon />}>
              View All Projects
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
