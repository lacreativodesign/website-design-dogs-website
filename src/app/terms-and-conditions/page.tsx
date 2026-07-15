import type { Metadata } from "next";
import Link from "next/link";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "General Website Design Dogs website terms, campaign offer terms, and project agreement controls.",
  path: "/terms-and-conditions",
});

const updated = "July 13, 2026";

const termsGroups = [
  {
    title: "Services",
    intro: "Website Design Dogs provides website-related information and accepts service enquiries subject to written project terms.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
      "By using this website, you agree to these general website terms.",
      "Submitting a form does not create a project agreement or guarantee acceptance.",
      "Scope, pricing, timing, responsibilities, revisions, intellectual property, third-party costs, payments, cancellations, and refunds are confirmed in the signed proposal or written project agreement.",
    ],
  },
  {
    title: "User Responsibilities",
    intro: "Visitors and clients are responsible for lawful website use and accurate project information.",
    items: [
      "Clients are responsible for timely feedback, accurate information, approved materials, access credentials when required, and rights to content supplied.",
      "Do not misuse the website, interfere with security, submit unlawful content, or attempt unauthorized access.",
      "Third-party platforms, hosting, licenses, plugins, payment processors, and external services remain subject to their own terms and availability.",
      "Scope changes, new requirements, missing content, unavailable access, or delayed feedback may affect timing, pricing, and delivery expectations.",
    ],
  },
  {
    title: "Intellectual Property",
    intro: "Ownership, licensing, and usage rights are controlled by the applicable written project agreement.",
    items: [
      "Project deliverables, source materials, content rights, license rights, third-party assets, and transfer terms are governed by the signed proposal or written project agreement.",
      "Website content is for general information and does not transfer ownership of Website Design Dogs or LA CREATIVO GROUP, LLC intellectual property.",
      "Clients must have rights to logos, images, copy, credentials, and other materials supplied for use in a project.",
    ],
  },
  {
    title: "Limitation of Liability",
    intro: "The website is informational and does not guarantee business, marketing, technical, or third-party outcomes.",
    items: [
      "Website content is for general information and does not guarantee outcomes, leads, rankings, revenue, delivery dates, or platform availability.",
      "The website is provided without warranties to the fullest extent permitted. Liability and indemnity obligations are controlled by any signed agreement and applicable law.",
      "Refunds, cancellations, and payment responsibilities are controlled by the applicable proposal, project agreement, and Refund and Cancellation Policy references where applicable.",
    ],
  },
  {
    title: "Changes to Terms",
    intro: "These terms may be updated, and campaign or project terms may be controlled by more specific written terms.",
    items: [
      "These terms may change and the Last updated date will be revised. Contact Website Design Dogs through /contact.",
      "Main website pricing starts at $499 for Starter. Campaign pages may show regular package price $499, promotional campaign price $249, and savings of $250 for qualifying Campaign Starter scope. Submission does not automatically confirm eligibility, no expiry date is represented, and acceptance is not guaranteed.",
      "When a signed proposal, order form, statement of work, or written agreement conflicts with these general website terms, the signed or written project terms control for that project.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <section className="visual-page-hero visual-page-hero--legal" aria-labelledby="terms-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/terms-hero-dark.webp"
          lightSrc="/brand/scenes/terms-hero-light.webp"
          alt="Website Design Dogs terms scenic artwork"
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
            <span>Terms of Service</span>
          </nav>
          <p className="home-eyebrow">Terms of Service</p>
          <h1 id="terms-page-title">Terms of Service</h1>
          <p>Please read these terms carefully before using the website or requesting services.</p>
        </Container>
      </section>

      <section className="legal-shell-section" aria-labelledby="terms-panel-title">
        <Container>
          <div className="legal-intro-copy">
            <p className="home-eyebrow">Last updated {updated}</p>
            <h2 id="terms-panel-title">Terms and Conditions</h2>
            <p>
              These general website terms are informational and may be controlled by a signed proposal, order form,
              statement of work, or written agreement when those terms differ.
            </p>
          </div>
          <div className="legal-panel">
            {termsGroups.map((group) => (
              <section key={group.title} className="legal-primary-group">
                <h2>{group.title}</h2>
                <p>{group.intro}</p>
                <details>
                  <summary>Read details</summary>
                  <div>
                    {group.items.map((item) => (
                      <p key={item}>
                        {item.includes("/contact") ? (
                          <>
                            {item.replace("/contact", "")}
                            <Link href="/contact">/contact</Link>.
                          </>
                        ) : (
                          item
                        )}
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
