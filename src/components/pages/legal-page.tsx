import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { illustrationScenes } from "@/content/illustrations";
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

const legalScenes = {
  "/privacy-policy": {
    scene: illustrationScenes.privacy,
    alt: "Website Design Dogs privacy guide protecting customer information in a secure digital workspace",
  },
  "/terms-and-conditions": {
    scene: illustrationScenes.terms,
    alt: "Website Design Dogs project guide reviewing clear service terms and a balanced agreement",
  },
  "/refund-cancellation-policy": {
    scene: illustrationScenes.refund,
    alt: "Website Design Dogs project guide carefully reviewing a refund and cancellation request",
  },
  "/cookie-policy": {
    scene: illustrationScenes.cookie,
    alt: "Website Design Dogs privacy guide adjusting cookie consent and preference controls",
  },
} as const;

const legalSectionIcons: BrandIconName[] = [
  "shield-check",
  "clipboard-check",
  "heart-handshake",
  "gauge",
  "search-check",
  "headset",
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-cancellation-policy", label: "Refund & Cancellation" },
  { href: "/cookie-policy", label: "Cookie Policy" },
] as const;

export function LegalPage({
  title,
  eyebrow = title,
  updated,
  intro,
  sections,
  darkSrc,
  path,
}: LegalPageProps) {
  const legalScene = legalScenes[path as keyof typeof legalScenes];
  const scene = legalScene?.scene;

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
          darkSrc={scene?.desktop.webp ?? darkSrc}
          darkAvifSrc={scene?.desktop.avif}
          tabletDarkSrc={scene?.tablet.webp}
          tabletDarkAvifSrc={scene?.tablet.avif}
          mobileDarkSrc={scene?.mobile.webp}
          mobileDarkAvifSrc={scene?.mobile.avif}
          alt={legalScene?.alt ?? ""}
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="visual-page-hero__scene"
        />
        <Container className="visual-page-hero__content">
          <div className="visual-page-hero__copy">
            <HeroBreadcrumb items={[{ label: "Home", href: "/" }, { label: eyebrow }]} />
            <p className="home-eyebrow">{eyebrow}</p>
            <h1 id="legal-page-title">{title}</h1>
            <p>{intro}</p>
          </div>
        </Container>
      </section>

      <section className="legal-shell-section" aria-labelledby="legal-overview-title">
        <Container className="legal-page-layout">
          <aside className="legal-sidebar" aria-label="Policy navigation">
            <div className="legal-updated-card">
              <span className="inner-card-icon" aria-hidden="true">
                <BrandIcon name="clipboard-check" />
              </span>
              <div>
                <small>Current version</small>
                <strong>Last updated {updated}</strong>
              </div>
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

            <nav className="legal-policy-nav" aria-label="Other policies">
              <h2>Other policies</h2>
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={link.href === path ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="legal-main">
            <div className="legal-intro-copy">
              <p className="home-eyebrow">Plain-language overview</p>
              <h2 id="legal-overview-title">Policy overview</h2>
              <p>
                {BRAND_DISCLOSURE} This page explains the general policy for this
                website. A signed agreement may add project-specific terms, but it does
                not waive rights or obligations that cannot lawfully be waived.
              </p>
            </div>

            <div className="legal-panel">
              {sections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="legal-primary-group scroll-mt-24"
                >
                  <header className="legal-primary-group__header">
                    <span className="legal-primary-group__number inner-card-icon" aria-hidden="true">
                      <BrandIcon
                        name={legalSectionIcons[index % legalSectionIcons.length] ?? "shield-check"}
                      />
                    </span>
                    <div>
                      <p>Section {String(index + 1).padStart(2, "0")}</p>
                      <h2>{section.title}</h2>
                    </div>
                  </header>
                  <div className="legal-primary-group__body">
                    {section.intro ? <p className="legal-primary-group__intro">{section.intro}</p> : null}
                    {section.items.map((item) => (
                      <p key={item}>
                        <LegalText>{item}</LegalText>
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
