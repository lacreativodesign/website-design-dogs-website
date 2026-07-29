import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { BrandIcon } from "@/components/ui/icon";
import { BRAND_DISCLOSURE } from "@/lib/site-config";

export type LegalSection = {
  id: string;
  title: string;
  intro?: string;
  items: string[];
};

export function LegalText({ children }: { children: string }) {
  const marker = "/contact";
  if (!children.includes(marker)) return children;

  const [before, ...after] = children.split(marker);
  return (
    <>
      {before}
      <Link href="/contact">contact page</Link>
      {after.join(marker)}
    </>
  );
}

type LegalPageProps = {
  title: string;
  eyebrow?: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  darkSrc: string;
  path: string;
};

export function LegalPage({
  title,
  eyebrow = title,
  updated,
  intro,
  sections,
  darkSrc,
  path,
}: LegalPageProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: eyebrow, path },
        ]}
      />
      <WebPageJsonLd
        name={eyebrow}
        description={intro}
        path={path}
      />
      <section
        className="visual-page-hero visual-page-hero--legal"
        aria-labelledby="legal-page-title"
      >
        <ThemeScene
          darkSrc={darkSrc}
          lightSrc={darkSrc}
          alt=""
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
            <span>{eyebrow}</span>
          </nav>
          <p className="home-eyebrow">{eyebrow}</p>
          <h1 id="legal-page-title">{title}</h1>
          <p>{intro}</p>
        </Container>
      </section>

      <section className="legal-shell-section" aria-labelledby="legal-overview-title">
        <Container>
          <div className="legal-intro-copy">
            <p className="home-eyebrow">Last updated {updated}</p>
            <h2 id="legal-overview-title">Policy overview</h2>
            <p>
              {BRAND_DISCLOSURE} These general website terms may be controlled by a
              signed proposal, order form, statement of work, or written agreement
              where those terms differ.
            </p>
          </div>

          <nav className="legal-contents" aria-label="Page sections">
            <h2>On this page</h2>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-panel">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="legal-primary-group scroll-mt-24"
              >
                <span className="legal-primary-group__number inner-card-icon" aria-hidden="true">
                  <BrandIcon name="shield-check" />
                </span>
                <h2>{section.title}</h2>
                {section.intro ? <p>{section.intro}</p> : null}
                <details>
                  <summary>Read details</summary>
                  <div>
                    {section.items.map((item) => (
                      <p key={item}>
                        <LegalText>{item}</LegalText>
                      </p>
                    ))}
                  </div>
                </details>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
