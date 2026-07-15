import type { Metadata } from "next";
import Link from "next/link";
import { ThemeScene } from "@/components/theme/theme-scene";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Website Design Dogs collects, uses, protects, and routes website enquiry information.",
  path: "/privacy-policy",
});

const updated = "July 13, 2026";

const policyGroups = [
  {
    title: "Information We Collect",
    intro: "We collect information visitors submit directly and limited technical information needed to operate forms and understand enquiries.",
    items: [
      "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC. This policy applies to the Website Design Dogs website and forms.",
      "Forms may request name, business name, email, optional phone, optional website URL, service selection, project information, package preference, campaign form information, and consent acknowledgement.",
      "We may process landing page, current page, referrer, selected UTM parameters, fbclid, gclid, basic request-security information, and Turnstile verification data when configured.",
    ],
  },
  {
    title: "How We Use Your Information",
    intro: "Submitted information is used to review and respond to enquiries, prepare recommendations, and operate the website responsibly.",
    items: [
      "Information is used to review enquiries, respond to requests, prepare project recommendations, route leads, maintain operational records, prevent abuse, improve website operations, and understand campaign source.",
      "Submitted enquiries may be routed server-side to Bizosto for lead and enquiry management. API credentials are not exposed to visitors.",
      "Information may be shared with LA CREATIVO GROUP, LLC operational systems, Bizosto, service providers needed for website operation, hosting, security, analytics, and communication, or as required by legal obligations. Submitted enquiry information is not sold.",
    ],
  },
  {
    title: "Data Protection and Security",
    intro: "Security controls help protect submitted information and reduce spam, abuse, and unauthorized use of forms.",
    items: [
      "Forms may use validation, honeypot fields, submission timing, instance-local rate limiting, Cloudflare Turnstile when enabled, and request-security processing.",
      "Information is retained for legitimate operational, contractual, security, accounting, dispute-resolution, and legal purposes for as long as reasonably necessary.",
      "No legal certification, security certification, or guaranteed protection outcome is claimed by this policy.",
    ],
  },
  {
    title: "Cookies and Similar Technologies",
    intro: "Cookies, session storage, consent preferences, and optional tags may be used depending on visitor choices and configuration.",
    items: [
      "Google Tag Manager may be enabled. Optional analytics and marketing technologies are consent-controlled, and analytics storage and advertising storage remain denied until required consent is granted.",
      "First-touch campaign attribution may use sessionStorage. Consent preference may use a first-party necessary cookie. Optional analytics or marketing cookies depend on consent and configured tags.",
      "Cloudflare Turnstile may process verification information when configured to help distinguish legitimate submissions from abuse.",
    ],
  },
  {
    title: "Your Choices",
    intro: "Visitors can control optional tracking choices and contact Website Design Dogs about submitted information.",
    items: [
      "Visitors can reject optional tracking, change cookie preferences, and contact Website Design Dogs through /contact regarding submitted information.",
      "Consent choices can be updated through Cookie Settings where available on the website.",
      "Project, contractual, accounting, security, dispute-resolution, and legal retention requirements may affect whether information can be deleted immediately.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="visual-page-hero visual-page-hero--legal" aria-labelledby="privacy-page-title">
        <ThemeScene
          darkSrc="/brand/scenes/privacy-hero-dark.webp"
          lightSrc="/brand/scenes/privacy-hero-light.webp"
          alt="Website Design Dogs privacy scenic artwork"
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
            <span>Privacy Policy</span>
          </nav>
          <p className="home-eyebrow">Privacy Policy</p>
          <h1 id="privacy-page-title">Your privacy matters.</h1>
          <p>Website Design Dogs respects your privacy and is committed to protecting submitted enquiry information.</p>
        </Container>
      </section>

      <section className="legal-shell-section" aria-labelledby="privacy-panel-title">
        <Container>
          <div className="legal-intro-copy">
            <p className="home-eyebrow">Last updated {updated}</p>
            <h2 id="privacy-panel-title">Privacy Policy</h2>
            <p>
              This policy summarizes how Website Design Dogs handles website enquiry information while preserving the
              factual disclosures needed for secure submissions, consent, attribution, Turnstile, and Bizosto routing.
            </p>
          </div>
          <div className="legal-panel">
            {policyGroups.map((group) => (
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
