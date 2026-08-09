import type { ReactNode } from "react";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";

type HeroCta = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary";
};

type TopLevelHeroProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  breadcrumb: { label: string; href?: string }[];
  scene: {
    desktop: { webp: string; avif: string };
    tablet: { webp: string; avif: string };
    mobile: { webp: string; avif: string };
  };
  alt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

export function TopLevelHero({
  id,
  eyebrow,
  title,
  body,
  breadcrumb,
  scene,
  alt,
  primaryCta,
  secondaryCta,
}: TopLevelHeroProps) {
  return (
    <section className="top-level-hero" aria-labelledby={id}>
      <ThemeScene
        darkSrc={scene.desktop.webp}
        darkAvifSrc={scene.desktop.avif}
        tabletDarkSrc={scene.tablet.webp}
        tabletDarkAvifSrc={scene.tablet.avif}
        mobileDarkSrc={scene.mobile.webp}
        mobileDarkAvifSrc={scene.mobile.avif}
        alt={alt}
        width={1600}
        height={1000}
        priority
        sizes="100vw"
        className="top-level-hero__scene"
      />
      <Container className="top-level-hero__content">
        <div className="top-level-hero__copy">
          <HeroBreadcrumb items={breadcrumb} />
          <p className="home-eyebrow">{eyebrow}</p>
          <h1 id={id}>{title}</h1>
          <p>{body}</p>
          <div className="top-level-hero__actions">
            <Button
              href={primaryCta.href}
              variant={primaryCta.variant ?? "primary"}
              icon={<ArrowRightIcon />}
              fullWidthMobile
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant={secondaryCta.variant ?? "outline"}
              fullWidthMobile
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export type ProofItem = {
  title: string;
  body: string;
  icon: BrandIconName;
};

export function ProofStrip({
  label,
  items,
}: {
  label: string;
  items: readonly ProofItem[];
}) {
  return (
    <section className="shared-proof-strip" aria-label={label}>
      <Container>
        <div>
          {items.map((item) => (
            <article key={item.title}>
              <span className="inner-card-icon" aria-hidden="true">
                <BrandIcon name={item.icon} />
              </span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

