import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const contactMethods = [
  siteConfig.contact.email,
  siteConfig.contact.phone,
  siteConfig.contact.whatsapp,
] as const;

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
      <section className="compact-title-section" aria-labelledby="contact-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/contact-hero-dark.webp"
          lightSrc="/brand/scenes/contact-hero-light.webp"
          alt="Website Design Dogs mascot ready to discuss a website project"
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="contact-hero__scene"
        />
        <Container className="contact-hero__content">
          <div>
            <nav className="visual-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span>Contact Us</span>
            </nav>
            <p className="home-eyebrow">Contact Us</p>
            <h1 id="contact-page-title">Let’s start a useful conversation.</h1>
            <p>Share the context. We’ll review the requirements and recommend a practical next step.</p>
            <ul className="contact-reassurance" aria-label="What to expect">
              <li>Clear follow-up</li>
              <li>No pressure</li>
              <li>Scope before work</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="contact-panel-section" aria-labelledby="contact-form-title">
        <Container>
          <div className="contact-layout-grid">
            <aside className="contact-info-card" aria-label="Contact information">
              <h2>Tell us about your project.</h2>
              <div className="contact-info-list">
                {contactMethods.map((method) => (
                  <div key={method.label} className="contact-info-row">
                    <span aria-hidden="true">•</span>
                    <div>
                      <strong>{method.label}</strong>
                      <br />
                      <a
                        href={method.href}
                        {...(method.label === "WhatsApp Business"
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="contact-info-row">
                  <span aria-hidden="true">•</span>
                  {siteConfig.legalDisclosure}
                </div>
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
            <ThemeScene
              darkSrc="/brand/backgrounds/grid-dark.webp"
              lightSrc="/brand/backgrounds/grid-light.webp"
              alt=""
              width={1600}
              height={800}
              sizes="100vw"
              className="coverage-panel__background"
            />
            <div className="coverage-panel__content coverage-panel__content--steps">
              <div>
                <p className="home-eyebrow">PROJECT START</p>
                <h2 id="coverage-panel-title">A clear path from enquiry to project.</h2>
                <p>Project availability and scope are confirmed after enquiry review.</p>
              </div>
              <ol className="coverage-panel__steps">
                {['Submit your requirements', 'Receive the recommended scope', 'Review the quote', 'Begin the project'].map((step, index) => (
                  <li key={step}><span>{index + 1}</span>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
