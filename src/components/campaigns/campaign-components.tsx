import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { campaignOffer } from "@/content/campaigns";
import type { getCampaign } from "@/content/campaigns";
import { siteConfig } from "@/content/site";

type Campaign = NonNullable<ReturnType<typeof getCampaign>>;

const cta = "#campaign-form";

export function CampaignHeader() {
  return (
    <header className="campaign-header">
      <Container className="campaign-header__inner">
        <BrandLogo priority />
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] sm:inline"
          >
            Visit Main Website
          </Link>
          <Button href={cta} size="small">
            Get My Website Quote
          </Button>
        </div>
      </Container>
    </header>
  );
}

export function CampaignHero({ campaign }: { campaign: Campaign }) {
  return (
    <Section className="pt-10 lg:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="eyebrow">{campaign.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {campaign.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
            {campaign.heroBody}
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] text-center">
            <Price label="Starter" value={`$${campaignOffer.regularPrice}`} hot />
            <Price label="Pricing" value="One time" />
            <Price label="Includes" value="Up to 5 pages" />
          </div>
          <p className="mt-3 text-sm font-bold text-[var(--color-text-muted)]">
            Final requirements and any work outside the listed Starter scope are
            confirmed in writing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={cta} size="large">
              Get My Website Quote
            </Button>
            <Button href="#offer-details" variant="outline" size="large">
              See What’s Included
            </Button>
          </div>
        </div>
        <div className="relative">
          <span className="badge mb-4 inline-flex">STARTER WEBSITE PACKAGE</span>
          <ThemeScene
            darkSrc={campaign.heroDark}
            lightSrc={campaign.heroLight}
            alt={`${campaign.industry} campaign website artwork`}
            width={900}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            objectFit="contain"
            className="aspect-square rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
          />
        </div>
      </Container>
    </Section>
  );
}

function Price({
  label,
  value,
  hot = false,
}: {
  label: string;
  value: string;
  hot?: boolean;
}) {
  return (
    <div
      className={
        hot
          ? "bg-[var(--color-primary-orange)] p-4 text-black"
          : "p-4"
      }
    >
      <div className="text-xs font-black uppercase tracking-wide">{label}</div>
      <div className="text-xl font-black sm:text-2xl">{value}</div>
    </div>
  );
}

export function Problem({ campaign }: { campaign: Campaign }) {
  return (
    <Section alternate>
      <Container>
        <h2 className="section-title">{campaign.problemHeading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaign.problemPoints.map((point) => (
            <Card key={point} className="p-6">
              <p className="font-bold">{point}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Offer() {
  const items = [
    "Up to 5 Core Pages",
    "Responsive Design",
    "Contact or Quote Form",
    "SEO Foundations",
    "Performance Preparation",
    "Launch Support",
  ];

  return (
    <Section id="offer-details" className="scroll-mt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-8">
            <p className="eyebrow">{campaignOffer.name}</p>
            <h2 className="mt-3 text-3xl font-black">
              A professional Starter website for $
              {campaignOffer.regularPrice} one time.
            </h2>
            <div className="mt-6 space-y-3">
              <PriceRow
                label="Starter Website"
                value={`$${campaignOffer.regularPrice}`}
              />
              <PriceRow label="Payment" value="One time" />
              <PriceRow label="Page Scope" value="Up to 5" />
            </div>
            <p className="mt-6 text-[var(--color-text-muted)]">
              The Starter package is a defined foundation for local-service
              businesses that need a professional, mobile-ready website.
            </p>
            <Button href={cta} className="mt-6">
              Request a Starter Website Quote
            </Button>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <Card key={item} className="p-6">
                <h3 className="font-black">{item}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {offerCopy(item)}
                </p>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-8 text-sm font-bold">{campaignOffer.scopeNote}</p>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          {campaignOffer.exclusions}
        </p>
      </Container>
    </Section>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
      <span className="font-bold">{label}</span>
      <strong className="text-2xl">{value}</strong>
    </div>
  );
}

function offerCopy(item: string) {
  return {
    "Up to 5 Core Pages":
      "Home, Services, About, Contact, and one additional priority page; final page structure is confirmed during project scoping.",
    "Responsive Design":
      "The website must work clearly across phones, tablets, laptops, and desktops.",
    "Contact or Quote Form":
      "A clear enquiry path prepared around the business’s preferred customer action.",
    "SEO Foundations":
      "Page titles, descriptions, heading structure, mobile readiness, and crawl-friendly page organization. Rankings are not guaranteed.",
    "Performance Preparation":
      "Practical image, layout, and implementation decisions intended to support a fast experience. No PageSpeed score is guaranteed.",
    "Launch Support":
      "Final checks and launch preparation based on the confirmed project scope.",
  }[item];
}

export function Strategy({ campaign }: { campaign: Campaign }) {
  return (
    <Section alternate>
      <Container>
        <h2 className="section-title">{campaign.strategyHeading}</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {campaign.industryFeatures.map((feature) => (
            <p
              key={feature}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 font-bold"
            >
              {feature}
            </p>
          ))}
        </div>
        {campaign.supports ? (
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            May support businesses such as {campaign.supports.join(", ")}.
            Services are only presented when supplied by the actual lead.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}

export function Concept({ campaign }: { campaign: Campaign }) {
  return (
    <Section>
      <Container className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="badge">DESIGN CONCEPT</span>
          <h2 className="mt-4 section-title">{campaign.concept.title}</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            {campaign.concept.disclaimer}
          </p>
        </div>
        <Image
          src={campaign.concept.src}
          alt={campaign.concept.title}
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="rounded-[var(--radius-xl)] border border-[var(--color-border)]"
        />
      </Container>
    </Section>
  );
}

export function ProcessWhy() {
  const steps = [
    "Tell Us About Your Business|Share the service, current website situation, and primary goal.",
    "Confirm the Starter Scope|We review the information and confirm whether the $499 Starter package fits the requested project.",
    "Approve the Project Plan|Scope, responsibilities, content needs, pricing, and timing are documented before work begins.",
  ];
  const why = [
    "Strategy Before Decoration|Pages are organized around the business goal and the action visitors should take.",
    "Mobile-First Thinking|The experience is designed for customers who discover and contact local businesses from their phones.",
    "Clear Communication|Scope, requirements, exclusions, and next steps are explained without unnecessary technical confusion.",
    "Practical Business Focus|The website is treated as a tool for credibility, enquiries, and future growth.",
    "Support Beyond Launch|Website-care options are available separately when the business needs continued help.",
  ];

  return (
    <>
      <Section alternate>
        <Container>
          <h2 className="section-title">A simple way to get started.</h2>
          <Grid items={steps} />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="section-title">
            A focused website partner for growing local businesses.
          </h2>
          <Grid items={why} />
        </Container>
      </Section>
    </>
  );
}

function Grid({ items }: { items: string[] }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {items.map((item, index) => {
        const [title, body] = item.split("|");
        return (
          <Card key={title} className="p-6">
            <span className="text-sm font-black text-[var(--color-primary-orange)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-black">{title}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {body}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export function FinalCta() {
  return (
    <Section alternate>
      <Container className="text-center">
        <h2 className="section-title">
          Ready to request your Starter website quote?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-muted)]">
          Submitting the campaign form requests a project review and does not
          automatically confirm scope, timing, acceptance, or work outside the
          listed Starter package.
        </p>
        <Button href={cta} className="mt-6" size="large">
          Get My Website Quote
        </Button>
      </Container>
    </Section>
  );
}

export function CampaignFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <Container className="grid gap-5 text-sm text-[var(--color-text-muted)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p>Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.</p>
          <nav
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Campaign contact"
          >
            <a href={siteConfig.contact.email.href}>
              {siteConfig.contact.email.value}
            </a>
            <a href={siteConfig.contact.phone.href}>
              {siteConfig.contact.phone.value}
            </a>
            <a
              href={siteConfig.contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Business
            </a>
          </nav>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label="Campaign legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/refund-cancellation-policy">
            Refund & Cancellation Policy
          </Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <CookieSettingsButton />
        </nav>
      </Container>
    </footer>
  );
}

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-background)]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
      <Button href={cta} className="w-full">
        Get My Website Quote
      </Button>
    </div>
  );
}
