import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { ProofStrip, TopLevelHero, type ProofItem } from "@/components/pages/top-level-hero";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { siteConfig } from "@/content/site";
import { illustrationScenes } from "@/content/illustrations";
import { pageMetadata } from "@/lib/seo";

const contactMethods = [
  siteConfig.contact.email,
  siteConfig.contact.phone,
  siteConfig.contact.whatsapp,
] as const;

const contactIcons: BrandIconName[] = ["headset", "smartphone", "heart-handshake"];
const projectStepIcons: BrandIconName[] = ["search", "clipboard-check", "pen-tool", "rocket"];
const contactProof: ProofItem[] = [
  { title: "Share only what you know", body: "A useful first enquiry does not need a finished specification.", icon: "clipboard-check" },
  { title: "Scope-first review", body: "We assess fit and requirements before confirming deliverables or terms.", icon: "search-check" },
  { title: "No-pressure guidance", body: "The next step should fit the project—not the other way around.", icon: "heart-handshake" },
  { title: "Your context stays attached", body: "Campaign and package preferences are preserved through the enquiry path.", icon: "shield-check" },
];

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
] as const;

export const metadata: Metadata = pageMetadata({
  title: "Contact Website Design Dogs",
  description: "Contact Website Design Dogs to discuss website design, development, redesign, e-commerce, optimization, or ongoing website care.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]}
      />
      <WebPageJsonLd
        type="ContactPage"
        name="Contact Website Design Dogs"
        description="Contact Website Design Dogs to discuss website design, development, redesign, e-commerce, optimization, or ongoing website care."
        path="/contact"
      />
      <TopLevelHero
        id="contact-page-title"
        eyebrow="Contact Website Design Dogs"
        title={<>Let’s start a <em>useful conversation.</em></>}
        body="Share the context. We’ll review the requirements and recommend a practical next step without pretending the scope is final."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        scene={illustrationScenes.contact}
        alt="Border collie designer ready to discuss a digital project at a moonlit studio desk"
        primaryCta={{ label: "Build Your Project Brief", href: "/get-started" }}
        secondaryCta={{ label: "Email Us", href: siteConfig.contact.email.href }}
      />
      <ProofStrip label="What to expect when you contact Website Design Dogs" items={contactProof} />

      <section className="contact-panel-section" aria-labelledby="contact-form-title">
        <Container>
          <div className="contact-layout-grid">
            <aside className="contact-info-card" aria-label="Contact information">
              <p className="home-eyebrow">Direct contact</p>
              <h2>Tell us about your project.</h2>
              <p className="contact-info-card__intro">
                Choose the channel that works for you. Every enquiry is reviewed with the same
                scope-first approach.
              </p>
              <div className="contact-method-grid">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.label}
                    className="contact-method-card"
                    href={method.href}
                    {...(method.label === "WhatsApp Business"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="inner-card-icon"><BrandIcon name={contactIcons[index] ?? "headset"} /></span>
                    <div>
                      <strong>{method.label}</strong>
                      <span>{method.value}</span>
                    </div>
                    <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
              <div className="contact-disclosure">
                <BrandIcon name="shield-check" />
                <p>{siteConfig.legalDisclosure}</p>
              </div>
              <nav className="contact-quick-links" aria-label="Quick links">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <div className="contact-form-card">
              <h2 id="contact-form-title">Send Enquiry</h2>
              <p>Fields marked with an asterisk are required. Add only what you know—we can clarify the rest.</p>
              <ContactForm />
            </div>
          </div>

          <div className="coverage-panel" aria-labelledby="coverage-panel-title">
            <div className="coverage-panel__content coverage-panel__content--steps">
              <header>
                <p className="home-eyebrow">PROJECT START</p>
                <h2 id="coverage-panel-title">A clear path from enquiry to project.</h2>
                <p>Project availability and scope are confirmed after enquiry review.</p>
                <Button href="/get-started" icon={<ArrowRightIcon />}>
                  Build Your Project Brief
                </Button>
              </header>
              <ol className="coverage-panel__steps">
                {['Submit your requirements', 'Receive the recommended scope', 'Review the quote', 'Begin the project'].map((step, index) => (
                  <li key={step}>
                    <span className="inner-card-icon"><BrandIcon name={projectStepIcons[index] ?? "clipboard-check"} /></span>
                    <strong>{step}</strong>
                    <small>{["Share what you know", "We match scope to need", "Confirm deliverables and terms", "Begin with a visible plan"][index]}</small>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
