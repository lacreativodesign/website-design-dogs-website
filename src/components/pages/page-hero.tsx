import { ThemeScene } from "@/components/theme/theme-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";

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
}: PageHeroProps) {
  return (
    <Section className="py-10 sm:py-14 lg:py-16">
      <Container className="grid min-h-[calc(560px-var(--header-height))] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            {body}
          </p>
          {primaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        <Card className="p-3 lg:p-4">
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
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="page-hero__scene aspect-[4/3] sm:aspect-[16/11]"
          />
        </Card>
      </Container>
    </Section>
  );
}
