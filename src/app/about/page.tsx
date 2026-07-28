import type { Metadata } from "next";
import Link from "next/link";
import { PageCta } from "@/components/pages/page-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import {
  aboutChecklist,
  aboutExperience,
  aboutPrinciples,
  aboutProcessTiles,
} from "@/content/about";
import { illustrationScenes } from "@/content/illustrations";
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
      <WebPageJsonLd
        type="AboutPage"
        name="About Website Design Dogs"
        description="Learn how Website Design Dogs combines website strategy, design, development, communication, and practical support for growing businesses."
        path="/about"
      />
      <section className="visual-page-hero visual-page-hero--about" aria-labelledby="about-page-title">
        <ThemeScene
          darkSrc={illustrationScenes.about.desktop.webp}
          darkAvifSrc={illustrationScenes.about.desktop.avif}
          tabletDarkSrc={illustrationScenes.about.tablet.webp}
          tabletDarkAvifSrc={illustrationScenes.about.tablet.avif}
          mobileDarkSrc={illustrationScenes.about.mobile.webp}
          mobileDarkAvifSrc={illustrationScenes.about.mobile.avif}
          alt="Website Design Dogs team planning a project around a campfire beneath the mountains"
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
          <h1 id="about-page-title">A dependable digital partner for your next website.</h1>
          <p>Thoughtful website strategy, design, and development—organized around a clear scope.</p>
        </Container>
      </section>

      <section className="about-story-section" aria-labelledby="about-story-title">
        <Container>
          <div className="about-story-grid">
            <div className="about-story-copy">
              <p className="home-eyebrow">Why Website Design Dogs</p>
              <h2 id="about-story-title">Good websites earn trust one clear decision at a time.</h2>
              <p>
                Website Design Dogs helps businesses turn scattered ideas, content, and requirements into an online
                experience people can understand and use.
              </p>
              <p>
                We bring website strategy, responsive design, development, and launch preparation into one organized
                process. Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.
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
            darkSrc={illustrationScenes.about.desktop.webp}
            darkAvifSrc={illustrationScenes.about.desktop.avif}
            tabletDarkSrc={illustrationScenes.about.tablet.webp}
            tabletDarkAvifSrc={illustrationScenes.about.tablet.avif}
            mobileDarkSrc={illustrationScenes.about.mobile.webp}
            mobileDarkAvifSrc={illustrationScenes.about.mobile.avif}
            alt=""
            width={1600}
            height={1000}
            sizes="100vw"
            className="about-campfire-scene"
          />

          <header className="about-section-heading">
            <p className="home-eyebrow">How we work</p>
            <h2>A process that keeps the next step visible.</h2>
          </header>
          <ol className="about-process-grid" aria-label="Website Design Dogs process">
            {aboutProcessTiles.map((tile) => (
              <li key={tile.number} className="about-process-tile">
                <strong>{tile.number}</strong>
                <h3>{tile.title}</h3>
                <p>{tile.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="about-principles-section" aria-labelledby="about-principles-title">
        <Container>
          <header className="about-section-heading">
            <p className="home-eyebrow">Our principles</p>
            <h2 id="about-principles-title">The thinking behind the work.</h2>
          </header>
          <div className="about-principles-grid">
            {aboutPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-experience-section" aria-labelledby="about-experience-title">
        <Container className="about-experience-grid">
          <div>
            <p className="home-eyebrow">The experience</p>
            <h2 id="about-experience-title">Professional does not have to feel complicated.</h2>
            <p>
              The best project experience is one where decisions are understandable, responsibilities are clear,
              and the finished website reflects what the business actually needs.
            </p>
          </div>
          <dl>
            {aboutExperience.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <PageCta
        heading="Ready to give your website a clear direction?"
        body="Tell us where the business is now and what the website needs to help you do next."
        cta="Start Your Project"
        href="/get-started"
      />
    </>
  );
}
