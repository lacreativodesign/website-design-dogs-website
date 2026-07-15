import type { Metadata } from "next";
import Link from "next/link";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { aboutChecklist, aboutProcessTiles } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Website Design Dogs",
  description:
    "Learn how Website Design Dogs combines website strategy, design, development, communication, and practical support for growing businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="visual-page-hero visual-page-hero--about" aria-labelledby="about-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/about-hero-dark.webp"
          lightSrc="/brand/scenes/about-hero-light.webp"
          tabletDarkSrc="/brand/crops/tablet/about-dark.webp"
          tabletLightSrc="/brand/crops/tablet/about-light.webp"
          mobileDarkSrc="/brand/crops/mobile/about-dark.webp"
          mobileLightSrc="/brand/crops/mobile/about-light.webp"
          alt="Website Design Dogs scenic campfire artwork"
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
            <span>About Us</span>
          </nav>
          <p className="home-eyebrow">About Us</p>
          <h1 id="about-page-title">We’re more than just website designers.</h1>
          <p>
            Website Design Dogs combines strategy, design, development, and practical ongoing support to help growing
            businesses present themselves clearly online.
          </p>
        </Container>
      </section>

      <section className="about-story-section" aria-labelledby="about-story-title">
        <Container>
          <div className="about-story-grid">
            <div className="about-story-copy">
              <p className="home-eyebrow">OUR MISSION</p>
              <h2 id="about-story-title">Built for clear communication and confident growth.</h2>
              <p>
                Our mission is simple: build websites that not only look professional, but also help businesses
                communicate clearly and grow with confidence.
              </p>
              <p>
                Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC. The brand brings together practical
                planning, polished design, reliable development, and support that respects the way growing businesses
                actually operate.
              </p>
            </div>
            <div className="about-checklist" aria-label="Website Design Dogs values">
              {aboutChecklist.map((item) => (
                <div key={item} className="about-checklist__item">
                  <span aria-hidden="true">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <ThemeScene
            darkSrc="/brand/scenes/about-hero-dark.webp"
            lightSrc="/brand/scenes/about-hero-light.webp"
            alt="Website Design Dogs two-dog campfire scene"
            width={1600}
            height={1000}
            sizes="100vw"
            className="about-campfire-scene"
          />

          <div className="about-process-grid" aria-label="Website Design Dogs process">
            {aboutProcessTiles.map((tile) => (
              <div key={tile.number} className="about-process-tile">
                <strong>{tile.number}</strong>
                <span>{tile.title}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
