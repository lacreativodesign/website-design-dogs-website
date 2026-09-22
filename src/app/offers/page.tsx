import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BrandIcon } from "@/components/ui/icon";
import { PlatformLogo } from "@/components/platforms/platform-glyph";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { OfferLeadForm } from "@/components/offers/offer-lead-form";
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

const offerChoices = [
  {
    kicker: "Launch",
    title: "New Website",
    body: "Start with a polished, mobile-ready website built around trust, clarity, and action.",
    serviceSlug: "website-design",
    content: "offer-new-website",
  },
  {
    kicker: "Refresh",
    title: "Website Redesign",
    body: "Replace an outdated experience with a sharper brand presence and clearer conversion path.",
    serviceSlug: "website-design",
    content: "offer-redesign",
  },
  {
    kicker: "Sell",
    title: "E-Commerce",
    body: "Create a stronger storefront for products, collections, payments, and customer confidence.",
    serviceSlug: "e-commerce",
    content: "offer-ecommerce",
  },
  {
    kicker: "Convert",
    title: "Landing Page",
    body: "Build a focused campaign page designed to turn paid traffic into qualified enquiries.",
    serviceSlug: "website-design",
    content: "offer-landing-page",
  },
] as const;

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
              Turn this October into the moment your business finally looks as serious online as it is in real life.
            </p>
            <p className={styles.heroBody}>{offer.body}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#offer-hero-form">
                Get My 40% Off Quote <ArrowRightIcon />
              </a>
              <a className={styles.secondaryButton} href="#offer-options">
                See Eligible Projects
              </a>
            </div>

            <div className={styles.heroSignals} aria-label="Offer commitments">
              <span>October 1–31 only</span>
              <span>Qualifying new projects</span>
              <span>Clear written scope</span>
              <span>Real WDD support</span>
            </div>

            <div className={styles.heroMicroProof}>
              <strong>One request. One clear next step.</strong>
              <span>No package guessing. No surprise commitment. We review the project before anything is booked.</span>
            </div>
          </div>

          <div className={styles.heroConversion}>
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

            <div id="offer-hero-form" className={styles.heroForm}>
              <OfferLeadForm placement="hero" compact />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.platformStrip} aria-label="Website platforms supported by Website Design Dogs">
        <div className={styles.platformStripInner}>
          <div className={styles.platformIntro}>
            <small>WE BUILD ON LEADING WEBSITE PLATFORMS</small>
            <strong>Choose the right platform for the job.</strong>
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

      <section id="offer-options" className={[styles.section, styles.offerChoiceSection].join(" ")}>
        <div className={styles.offerChoiceIntro}>
          <div>
            <p className={styles.eyebrow}>Choose your move</p>
            <h2>A stronger website. A better October price. Pick the project that moves your business forward.</h2>
          </div>
          <p>
            The promotion applies to qualifying WDD website design and development service fees. We confirm eligibility and the regular service-fee value before the discount is applied.
          </p>
        </div>
        <div className={styles.offerChoiceGrid}>
          {offerChoices.map((choice, index) => (
            <article key={choice.title} className={styles.offerChoiceCard}>
              <span className={styles.offerChoiceNumber}>0{index + 1}</span>
              <small>{choice.kicker}</small>
              <h3>{choice.title}</h3>
              <p>{choice.body}</p>
              <Link
                href={getOfferQuoteHref({
                  serviceSlug: choice.serviceSlug,
                  content: choice.content,
                })}
              >
                Claim This Offer <ArrowRightIcon />
              </Link>
            </article>
          ))}
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
            <p className={styles.eyebrow}>Featured website concepts</p>
            <h2>See the design quality before you book.</h2>
          </div>
          <div className={styles.sectionAside}>
            <p>
              These are clearly labeled WDD concept designs, not completed client projects. Select a thumbnail to open the full interactive website in a lightbox.
            </p>
            <Link className={styles.outlineLink} href="/portfolio">
              View Full Portfolio <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <PortfolioGallery
          concepts={featuredConcepts}
          variant="thumbnail"
          className={styles.offerPortfolioGallery}
        />
      </section>

      <section className={styles.midConversion} aria-labelledby="mid-offer-title">
        <div className={styles.midConversionArt}>
          <Image
            src={offerArt.clientProof}
            alt="Website Design Dogs team turning a website idea into a stronger online presence"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <div className={styles.midConversionOverlay} aria-hidden="true" />
          <div className={styles.midConversionCopy}>
            <p className={styles.eyebrow}>Don’t just browse the offer</p>
            <h2 id="mid-offer-title">Put your project in front of the team while the October window is open.</h2>
            <p>
              You do not need a perfect brief. Give us the essentials now, then add deeper project details later if you want.
            </p>
            <div>
              <span>Fast first step</span>
              <span>Required phone</span>
              <span>Confirmation email</span>
              <span>No obligation</span>
            </div>
          </div>
        </div>
        <div className={styles.midConversionForm}>
          <OfferLeadForm placement="mid" />
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
            Know what happens before, during, and after the build. These commitments stay visible from scope approval through responsive QA, launch preparation, and handoff.
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
        <div className={styles.finalConversionGrid}>
          <div className={styles.finalCtaCopy}>
            <p className={styles.eyebrow}>October special</p>
            <h2>
              Stop putting the website off. <span>Make this the month you move.</span>
            </h2>
            <p>
              If your business needs a stronger first impression, more leads, better online sales, or a cleaner customer journey, start the conversation while the 40% promotion is available.
            </p>
            <ul>
              <li>40% off qualifying WDD website design/development service fees</li>
              <li>Written scope and eligibility confirmation before work begins</li>
              <li>Customer confirmation plus permanent WDD lead-safety delivery</li>
            </ul>
            <div className={styles.finalQuickActions}>
              <Link
                className={styles.secondaryButton}
                href={getOfferQuoteHref({ serviceSlug: "website-design", content: "final-full-brief" })}
              >
                Complete Full Project Brief
              </Link>
              <small>{offer.endsLabel}</small>
            </div>
          </div>
          <div className={styles.finalOfferForm}>
            <OfferLeadForm placement="final" />
          </div>
        </div>
      </section>

      <a className={styles.mobileStickyCta} href="#offer-hero-form">
        Get My 40% Off Quote
      </a>

    </div>
  );
}
