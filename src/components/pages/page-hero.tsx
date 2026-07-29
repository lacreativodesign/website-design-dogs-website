import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { HeroBreadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";

type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  darkSrc: string;
  darkAvifSrc?: string;
  lightSrc?: string;
  tabletDarkSrc?: string;
  tabletDarkAvifSrc?: string;
  mobileDarkSrc?: string;
  mobileDarkAvifSrc?: string;
  alt: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  breadcrumb?: { label: string; href?: string }[];
};

export function PageHero({
  eyebrow,
  title,
  body,
  darkSrc,
  darkAvifSrc,
  lightSrc,
  tabletDarkSrc,
  tabletDarkAvifSrc,
  mobileDarkSrc,
  mobileDarkAvifSrc,
  alt,
  primaryCta,
  secondaryCta,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="guided-hero">
      <ThemeScene
        darkSrc={darkSrc}
        darkAvifSrc={darkAvifSrc}
        lightSrc={lightSrc}
        tabletDarkSrc={tabletDarkSrc}
        tabletDarkAvifSrc={tabletDarkAvifSrc}
        mobileDarkSrc={mobileDarkSrc}
        mobileDarkAvifSrc={mobileDarkAvifSrc}
        alt={alt}
        width={1600}
        height={1000}
        priority
        sizes="100vw"
        className="guided-hero__scene"
      />
      <Container className="guided-hero__content">
        <div className="guided-hero__copy">
          {breadcrumb?.length ? <HeroBreadcrumb items={breadcrumb} /> : null}
          <p className="home-eyebrow">{eyebrow}</p>
          <h1>
            {title}
          </h1>
          <p>{body}</p>
          {primaryCta ? (
            <div className="guided-hero__actions">
              <Button
                href={primaryCta.href}
                size="large"
                variant={primaryCta.variant ?? "primary"}
                icon={<ArrowRightIcon />}
                fullWidthMobile
              >
                {primaryCta.label}
              </Button>
              {secondaryCta ? (
                <Button
                  href={secondaryCta.href}
                  size="large"
                  variant={secondaryCta.variant ?? "outline"}
                  fullWidthMobile
                >
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
