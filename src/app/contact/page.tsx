import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

const contactRows = [
  "Project Enquiries",
  "Secure Online Quote Form",
  "New Websites and Redesigns",
  "Website Design Dogs — a service brand of LA CREATIVO GROUP, LLC",
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
      <section className="compact-title-section" aria-labelledby="contact-page-title">
        <Container>
          <nav className="visual-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Contact Us</span>
          </nav>
          <p className="home-eyebrow">Contact Us</p>
          <h1 id="contact-page-title">Let’s start a conversation.</h1>
          <p>Tell us what you need, and we’ll review your project requirements and recommend the appropriate next step.</p>
        </Container>
      </section>

      <section className="contact-panel-section" aria-labelledby="contact-form-title">
        <Container>
          <div className="contact-layout-grid">
            <aside className="contact-info-card" aria-label="Contact information">
              <h2>Tell us about your project.</h2>
              <div className="contact-info-list">
                {contactRows.map((row) => (
                  <div key={row} className="contact-info-row">
                    <span aria-hidden="true">•</span>
                    {row}
                  </div>
                ))}
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
