import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BrandIcon } from "@/components/ui/icon";
import { PlatformLogo } from "@/components/platforms/platform-glyph";
import { mascotDesigner } from "@/content/illustrations";
import {
  featuredOfferPortfolioIds,
  offerArt,
  offerBenefitCards,
  offerFaqs,
  offerPlatformSlugs,
  offerProcess,
  offerProofCards,
  offerServiceCards,
} from "@/content/offer-page";
import {
  currentSeasonalOffer,
  discountPrice,
  formatUsd,
  getFeaturedOfferPackages,
  getOfferQuoteHref,
} from "@/content/offers";
import { packageBySlug, websitePackages } from "@/content/packages";
import { platforms } from "@/content/platforms";
import { portfolioConcepts } from "@/content/portfolio";
import styles from "./offers.module.css";

export const metadata: Metadata = {
  title: "October Website Offer — 40% Off",
  description:
    "Save 40% on qualifying Website Design Dogs website design and development service fees for new website projects booked in October 2026.",
  alternates: { canonical: "/offers" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: "No Tricks. Just 40% Off. | Website Design Dogs",
    description:
      "October 2026: save 40% on qualifying Website Design Dogs website design and development service fees.",
    url: "/offers",
    type: "website",
  },
};

const eligiblePackageSlugs = [
  ...websitePackages.map((item) => item.slug),
  "commerce-launch",
  "commerce-growth",
  "commerce-pro",
];

function percentLabel(discount: number) {
  return String(discount) + "% OFF";
}

export default function OffersPage() {
  const offer = currentSeasonalOffer;
  const featuredPackages = getFeaturedOfferPackages(offer);
  const visiblePlatforms = offerPlatformSlugs
    .map((slug) => platforms.find((platform) => platform.slug === slug))
    .filter((platform): platform is NonNullable<typeof platform> => Boolean(platform));
  const featuredConcepts = featuredOfferPortfolioIds
    .map((id) => portfolioConcepts.find((concept) => concept.id === id))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept));

  return (
    <div className={styles.page}>
      <div className={styles.promoRail} aria-label="October offer summary">
        <span>{offer.eyebrow}</span>
        <b>{percentLabel(offer.discountPercent)} WEBSITE DESIGN &amp; DEVELOPMENT SERVICE FEES</b>
        <span>October 1–31, 2026</span>
      </div>

      <section className={styles.hero} aria-labelledby="offers-hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <span className={styles.floatingLeafOne} aria-hidden="true" />
        <span className={styles.floatingLeafTwo} aria-hidden="true" />
        <span className={styles.floatingLeafThree} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{offer.eyebrow}</p>
            <h1 id="offers-hero-title" className={styles.heroTitle}>
              {offer.headline}
              <span>{offer.accentHeadline}</span>
            </h1>
            <p className={styles.heroLead}>
              Professional website design for businesses that are serious about what&apos;s next.
            </p>
            <p className={styles.heroBody}>{offer.body}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={offer.ctaHref}>
                {offer.ctaLabel} <ArrowRightIcon />
              </Link>
              <Link className={styles.secondaryButton} href={offer.secondaryCtaHref}>
                {offer.secondaryCtaLabel}
              </Link>
            </div>

            <div className={styles.heroSignals} aria-label="Offer commitments">
              <span>October booking window</span>
              <span>Eligible website services</span>
              <span>Scope confirmed first</span>
              <span>Third-party costs separated</span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Website Design Dogs October campaign artwork">
            <div className={styles.windowGlow} aria-hidden="true" />
            <div className={styles.pumpkinCluster} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.chalkboard}>
              <small>SAME GREAT DESIGN.</small>
              <strong>
                GREAT WEBSITES
                <br />
                SCARE AWAY
                <br />
                BAD COMPETITION.
              </strong>
              <em>A better tomorrow.</em>
            </div>
            <picture className={styles.heroMascot}>
              <source type="image/avif" srcSet={mascotDesigner.avif} />
              <Image
                src={mascotDesigner.webp}
                width={900}
                height={900}
                priority
                alt="Website Design Dogs mascot ready to plan an October website project"
              />
            </picture>
            <div
              className={styles.discountSeal}
              aria-label={String(offer.discountPercent) + "% off this October"}
            >
              <strong>{offer.discountPercent}%</strong>
              <span>OFF THIS OCTOBER</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.platformStrip} aria-label="Website platforms supported by Website Design Dogs">
        <div className={styles.platformStripInner}>
          <div className={styles.platformIntro}>
            <small>BUILT AROUND YOUR BUSINESS</small>
            <strong>Platform fit, not platform bias.</strong>
          </div>
          <div className={styles.platformGrid}>
            {visiblePlatforms.map((platform) => (
              <span key={platform.slug} className={styles.platformItem}>
                <PlatformLogo platform={platform} size={27} />
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>Our website design services</p>
            <h2>{percentLabel(offer.discountPercent)}. All the ways we help you grow.</h2>
          </div>
          <div className={styles.sectionAside}>
            <p>
              Start fresh, redesign an outdated site, launch a focused campaign, or sell online. The promotion applies to qualifying WDD website design and development service fees.
            </p>
            <Link className={styles.outlineLink} href="/services">
              Explore All Services <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className={styles.serviceGrid}>
          {offerServiceCards.map((card) => (
            <article key={card.title} className={[styles.serviceCard, "offer-service-card"].join(" ")}>
              <span className={styles.cardIcon}>
                <BrandIcon name={card.icon} size={23} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.portfolioSection].join(" ")}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>Featured portfolio</p>
            <h2>Distinct concepts. Serious design direction.</h2>
          </div>
          <div className={styles.sectionAside}>
            <p>
              Open any concept to explore the complete responsive experience. Every item remains clearly labeled as concept design—not completed client work.
            </p>
            <Link className={styles.outlineLink} href="/portfolio">
              View Full Portfolio <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className={styles.portfolioGrid}>
          {featuredConcepts.map((concept) => (
            <Link key={concept.id} href={concept.liveUrl} className={[styles.portfolioCard, "offer-portfolio-card"].join(" ")}>
              <div className={styles.portfolioImage}>
                <Image
                  src={concept.thumbnail}
                  alt={concept.title}
                  width={960}
                  height={600}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 22vw"
                />
                <span>Concept Design</span>
              </div>
              <div className={styles.portfolioMeta}>
                <div>
                  <h3>{concept.brand}</h3>
                  <p>{concept.industries[0]}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="offer-pricing" className={[styles.section, styles.pricingSection].join(" ")}>
        <div className={styles.pricingHeader}>
          <div className="offer-section__heading">
            <p className={styles.eyebrow}>October pricing</p>
            <h2>Same premium quality. A smarter price this month.</h2>
            <p>
              The discount is calculated from the live WDD package catalog. Final scope still controls the regular service-fee value before the promotion is applied.
            </p>
          </div>
          <div className={styles.pricingBadge}>
            <small>PROJECT PRICING</small>
            <strong>ONE-TIME</strong>
            <span>Qualifying WDD service fees</span>
          </div>
        </div>

        <div className={styles.pricingGrid}>
          {featuredPackages.map((item) => {
            const discounted = discountPrice(item.priceValue, offer.discountPercent);
            const serviceSlug = item.categorySlug === "e-commerce" ? "e-commerce" : "website-design";
            return (
              <article key={item.slug} className={[styles.packageCard, "offer-package-card"].join(" ")}>
                {item.label ? <span className={styles.packageBadge}>{item.label}</span> : null}
                <p className={styles.packageType}>{item.categorySlug === "e-commerce" ? "E-Commerce" : "Website Design"}</p>
                <h3>{item.name}</h3>
                <p className={styles.packageTagline}>{item.tagline}</p>
                <div className={styles.packagePrice}>
                  <del>{item.price}</del>
                  <strong>{formatUsd(discounted)}</strong>
                  <small>{item.priceSuffix}</small>
                </div>
                <ul>
                  {item.features.slice(0, 6).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <Link
                  className={styles.packageButton}
                  href={getOfferQuoteHref({ serviceSlug, content: item.slug })}
                >
                  Get Started <ArrowRightIcon />
                </Link>
              </article>
            );
          })}

          <article className={[styles.packageCard, styles.customPackage, "offer-package-card"].join(" ")}>
            <span className={styles.packageBadge}>Custom Scope</span>
            <p className={styles.packageType}>Custom Website Project</p>
            <h3>Built Around Your Requirements</h3>
            <p className={styles.packageTagline}>For projects that do not fit a standard package foundation.</p>
            <div className={styles.customDiscount}>
              <strong>{offer.discountPercent}% OFF</strong>
              <span>eligible confirmed WDD website design/development service fees</span>
            </div>
            <ul>
              <li>Custom page and component scope</li>
              <li>Approved integrations and workflows</li>
              <li>Platform selected around requirements</li>
              <li>Documented exclusions and responsibilities</li>
              <li>Written scope before production begins</li>
              <li>Responsive QA and launch preparation</li>
            </ul>
            <Link
              className={styles.packageButton}
              href={getOfferQuoteHref({ serviceSlug: "custom-website-design", content: "custom-scope" })}
            >
              Get Started <ArrowRightIcon />
            </Link>
          </article>
        </div>

        <div className={styles.packageRail}>
          <span>More eligible package foundations</span>
          <div>
            {eligiblePackageSlugs.map((slug) => {
              const item = packageBySlug.get(slug);
              if (!item) return null;
              const discounted = discountPrice(item.priceValue, offer.discountPercent);
              return (
                <Link key={slug} href={item.href}>
                  <span>{item.name}</span>
                  <b>{formatUsd(discounted)}{item.startingAt ? "+" : ""}</b>
                </Link>
              );
            })}
          </div>
        </div>

        <p className={styles.pricingFinePrint}>
          Third-party charges are excluded. “Starting price” packages remain starting prices after the percentage discount. Final scope and price are confirmed in writing before work begins.
        </p>
      </section>

      <section className={[styles.section, styles.whySection].join(" ")}>
        <div className={[styles.visualPanel, "offer-benefit-card"].join(" ")}>
          <Image
            src={offerArt.clientProof}
            alt="Website Design Dogs creative project illustration"
            width={1200}
            height={900}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className={styles.visualPanelCopy}>
            <small>BUILT FOR BUSINESSES</small>
            <strong>THAT GO FURTHER.</strong>
          </div>
        </div>

        <div>
          <div className={[styles.sectionHeadingCompact, "offer-section__heading"].join(" ")}>
            <p className={styles.eyebrow}>Why choose Website Design Dogs?</p>
            <h2>More than just a website. A clearer path forward.</h2>
          </div>
          <div className={styles.benefitGrid}>
            {offerBenefitCards.map((card) => (
              <article key={card.title} className={[styles.benefitCard, "offer-benefit-card"].join(" ")}>
                <span><BrandIcon name={card.icon} size={22} /></span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={[styles.section, styles.proofSection].join(" ")}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>What you can expect</p>
            <h2>Real process. Clear responsibilities.</h2>
          </div>
          <p>
            We do not use fabricated testimonials, ratings, or performance claims. The proof on this page is the work, the scope discipline, and the process you can inspect before booking.
          </p>
        </div>
        <div className={styles.proofGrid}>
          {offerProofCards.map((card) => (
            <article key={card.title} className={[styles.proofCard, "offer-benefit-card"].join(" ")}>
              <span className={styles.proofIcon}><BrandIcon name={card.icon} size={24} /></span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.processSection].join(" ")}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>A clear process</p>
            <h2>From October offer to approved project scope.</h2>
          </div>
          <p>
            The promotion never replaces proper scoping. WDD confirms the work, regular service-fee value, exclusions, timeline, and discount before production begins.
          </p>
        </div>
        <div className={styles.processGrid}>
          {offerProcess.map((item) => (
            <article key={item.number} className={[styles.processCard, "offer-benefit-card"].join(" ")}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.faqSection].join(" ")}>
        <div className={styles.faqIntro}>
          <p className={styles.eyebrow}>Frequently asked questions</p>
          <h2>Got questions? We&apos;ve got answers.</h2>
          <p>Clear answers to the questions a serious buyer should ask before committing to a website project.</p>
          <div className={styles.faqArt}>
            <Image
              src={offerArt.faqSupport}
              alt="Website Design Dogs support illustration"
              width={1100}
              height={900}
              sizes="(max-width: 900px) 100vw, 35vw"
            />
          </div>
        </div>
        <div className={styles.faqList}>
          {offerFaqs.map((item) => (
            <details key={item.q} className="offer-faq">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.termsSection].join(" ")} id="offer-terms">
        <details className={styles.termsCard}>
          <summary>
            <span>
              <small>OCTOBER OFFER DETAILS</small>
              <strong>Review the exact promotion terms</strong>
            </span>
            <b aria-hidden="true">+</b>
          </summary>
          <ol>
            {offer.exactTerms.map((term) => <li key={term}>{term}</li>)}
          </ol>
        </details>
      </section>

      <section className={styles.finalCta}>
        <Image
          className={styles.finalCtaBackground}
          src={offerArt.cta}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
        <div className={styles.finalCtaOverlay} aria-hidden="true" />
        <div className={[styles.finalCtaInner, "offer-final-cta__inner"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>October special</p>
            <h2>
              Ready to give your business a <span>stronger online presence?</span>
            </h2>
            <p>Secure the October website-design discount before the promotional window closes.</p>
          </div>
          <div className={styles.finalCtaAction}>
            <Link
              className={styles.primaryButton}
              href={getOfferQuoteHref({ serviceSlug: "website-design", content: "final-cta" })}
            >
              Get Started <ArrowRightIcon />
            </Link>
            <small>{offer.endsLabel}</small>
          </div>
        </div>
      </section>
    </div>
  );
}
