import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandIcon, ArrowRightIcon, type BrandIconName } from "@/components/ui/icon";
import { PlatformLogo } from "@/components/platforms/platform-glyph";
import { portfolioConcepts } from "@/content/portfolio";
import { platforms } from "@/content/platforms";
import { mascotDesigner } from "@/content/illustrations";
import { packageBySlug, websitePackages } from "@/content/packages";
import {
  currentSeasonalOffer,
  discountPrice,
  formatUsd,
  getFeaturedOfferPackages,
} from "@/content/offers";
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

const serviceCards: Array<{
  icon: BrandIconName;
  title: string;
  body: string;
}> = [
  { icon: "globe-2", title: "Business Websites", body: "Professional, responsive websites for local and growing businesses that need a clearer online presence." },
  { icon: "brush", title: "Website Redesign", body: "Modernize structure, presentation, usability, and mobile experience without forcing a template." },
  { icon: "mouse-pointer-click", title: "Landing Pages", body: "Focused pages for offers, campaigns, lead generation, and one clear conversion path." },
  { icon: "shopping-cart", title: "Shopify & E-Commerce", body: "Store design and development for approved commerce platforms, catalogs, and customer journeys." },
  { icon: "blocks", title: "Custom Website Design", body: "A tailored content and component system built around your audience, brand, and approved requirements." },
  { icon: "code-2", title: "Website Development", body: "Responsive implementation, standard integrations, QA, launch preparation, and practical ownership." },
];

const benefitCards: Array<{
  icon: BrandIconName;
  title: string;
  body: string;
}> = [
  { icon: "brush", title: "Custom Direction", body: "No recycled formula. The visual and content system follows the approved business goals." },
  { icon: "gauge", title: "Performance Aware", body: "Responsive layouts and implementation choices are reviewed for real devices and practical speed." },
  { icon: "search-check", title: "Search Foundation", body: "Clear structure, metadata, hierarchy, and content paths where included in the approved scope." },
  { icon: "shield-check", title: "Scope Protection", body: "Deliverables, exclusions, revision limits, responsibilities, and third-party costs are documented." },
  { icon: "smartphone", title: "Mobile-First Thinking", body: "Important journeys stay readable, usable, and action-oriented across smaller screens." },
  { icon: "headset", title: "Practical Support", body: "A visible path from enquiry through scope, production, launch, handoff, and optional ongoing care." },
];

const faqs = [
  { q: "Does the 40% offer apply to Shopify and e-commerce websites?", a: "Yes. Qualifying new Shopify and other e-commerce website projects are eligible for 40% off WDD website design and development service fees. Shopify subscriptions, paid themes, apps, payment-provider fees, and other third-party charges remain separate." },
  { q: "Can I use the offer for a website redesign?", a: "Yes. New qualifying redesign projects booked during October 2026 are eligible. We confirm the regular service-fee value and approved scope before the promotional discount is applied." },
  { q: "Does the discount apply to every WDD website package?", a: "The October offer applies to qualifying website-design and e-commerce service fees. The exact package or custom scope is confirmed after we review your requirements." },
  { q: "What about a custom website project?", a: "Custom website design and development can qualify. The regular scoped service-fee value is established first, then the 40% promotional discount is applied to the eligible WDD service fees." },
  { q: "Are hosting, domains, apps, themes, and premium software included?", a: "No, unless a written proposal explicitly says otherwise. Domain registration, hosting, platform subscriptions, paid themes, plugins, apps, licenses, processor fees, advertising spend, and other pass-through costs are separate." },
  { q: "How do you determine the final price?", a: "We review the page count, functionality, content responsibilities, integrations, platform, revision needs, and timeline. The written scope establishes the regular WDD service-fee value before the promotional discount is applied." },
  { q: "Can I choose Shopify, WordPress, Wix, Webflow, WooCommerce, or another platform?", a: "Yes. Platform selection follows ownership, editing, commerce, content, integration, operating-cost, and growth requirements. WDD does not force one platform onto every business." },
  { q: "When is the project considered booked?", a: "For this promotion, the project is considered booked when the approved scope is accepted and the required initial payment is received by October 31, 2026." },
  { q: "Can I combine this with another WDD promotion?", a: "No. The October website offer cannot be combined with another promotional discount unless Website Design Dogs confirms otherwise in writing." },
  { q: "Do you guarantee leads, sales, rankings, or revenue?", a: "No. WDD can improve clarity, usability, positioning, technical foundations, and conversion paths, but traffic quality, competition, pricing, follow-up, search engines, ad platforms, and customer decisions remain outside any honest guarantee." },
];

const platformSlugs = ["wordpress", "shopify", "wix-studio", "webflow", "squarespace", "woocommerce"];

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
  const visiblePlatforms = platformSlugs
    .map((slug) => platforms.find((platform) => platform.slug === slug))
    .filter((platform): platform is NonNullable<typeof platform> => Boolean(platform));

  return (
    <div className={styles.page}>
      <div className={styles.promoRail} aria-label="October offer summary">
        <span>October 2026</span>
        <b>{percentLabel(offer.discountPercent)} WEBSITE DESIGN &amp; DEVELOPMENT SERVICE FEES</b>
        <span>Ends October 31</span>
      </div>

      <section className={styles.hero} aria-labelledby="offers-hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroLeafOne} aria-hidden="true" />
        <div className={styles.heroLeafTwo} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{offer.eyebrow}</p>
            <h1 id="offers-hero-title" className={styles.heroTitle}>
              {offer.headline}
              <span>{offer.accentHeadline}</span>
            </h1>
            <p className={styles.heroBody}>
              Professional website design for businesses that are serious about what&apos;s next. {offer.body}
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={offer.ctaHref}>
                {offer.ctaLabel} <ArrowRightIcon />
              </Link>
              <Link className={styles.secondaryButton} href={offer.secondaryCtaHref}>
                {offer.secondaryCtaLabel}
              </Link>
            </div>
            <div className={styles.heroSignals} aria-label="Offer commitments">
              <span>Limited October slots</span>
              <span>Eligible website services</span>
              <span>Scope confirmed first</span>
              <span>No hidden WDD service fees</span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Website Design Dogs October campaign art">
            <div className={styles.pumpkin} aria-hidden="true"><span /></div>
            <div className={styles.chalkboard}>
              <small>OCTOBER NOTE</small>
              <strong>GREAT WEBSITES<br />SCARE AWAY<br />BAD COMPETITION.</strong>
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
            <div className={styles.discountSeal}>
              <strong>{offer.discountPercent}%</strong>
              <span>OFF THIS OCTOBER</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.platformStrip} aria-label="Supported website platforms">
        <div className={styles.platformStripInner}>
          <p>PLATFORM FIT, NOT PLATFORM BIAS</p>
          <div>
            {visiblePlatforms.map((platform) => (
              <span key={platform.slug} className={styles.platformItem}>
                <PlatformLogo platform={platform} size={28} />
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
          <p>
            Whether you are starting fresh, redesigning an outdated site, launching a focused campaign, or selling online, the offer applies to qualifying WDD website design and development service fees.
          </p>
        </div>

        <div className={styles.serviceGrid}>
          {serviceCards.map((card) => (
            <article key={card.title} className={[styles.serviceCard, "offer-service-card"].join(" ")}>
              <span className={styles.cardIcon}><BrandIcon name={card.icon} size={24} /></span>
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
            <h2>See the standard before you commit.</h2>
          </div>
          <div className={styles.sectionAside}>
            <p>
              Twelve complete Website Design Dogs design concepts across distinct industries and website types. These are concept demonstrations, not completed client work.
            </p>
            <Link className={styles.textLink} href="/portfolio">
              View Full Portfolio <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className={styles.portfolioGrid}>
          {portfolioConcepts.map((concept) => (
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
                <div><h3>{concept.brand}</h3><p>{concept.industries[0]}</p></div>
                <b aria-hidden="true">↗</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="offer-pricing" className={[styles.section, styles.pricingSection].join(" ")}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div>
            <p className={styles.eyebrow}>October pricing</p>
            <h2>Same premium quality. A smarter price this month.</h2>
          </div>
          <p>
            Every price below is calculated from the live WDD package catalog. Final project scope still controls the regular service-fee value before the {offer.discountPercent}% promotional discount is applied.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {featuredPackages.map((item) => {
            const discounted = discountPrice(item.priceValue, offer.discountPercent);
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
                  {item.features.slice(0, 5).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <Link className={styles.packageButton} href={item.quoteHref + "&offer=" + offer.id}>
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
              <li>Platform chosen around requirements</li>
              <li>Documented exclusions and responsibilities</li>
              <li>Written scope before production begins</li>
            </ul>
            <Link className={styles.packageButton} href={"/get-started?package=custom&service=custom-website-design&offer=" + offer.id}>
              Get Started <ArrowRightIcon />
            </Link>
          </article>
        </div>

        <div className={styles.allPackages}>
          <p>All eligible package foundations</p>
          <div>
            {eligiblePackageSlugs.map((slug) => {
              const item = packageBySlug.get(slug);
              if (!item) return null;
              const discounted = discountPrice(item.priceValue, offer.discountPercent);
              return (
                <Link key={slug} href={item.href}>
                  <span>{item.name}</span>
                  <b>{formatUsd(discounted)}</b>
                  {item.startingAt ? <small>+</small> : null}
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
        <div className={styles.whyMascot}>
          <picture>
            <source type="image/avif" srcSet={mascotDesigner.avif} />
            <Image src={mascotDesigner.webp} width={900} height={900} alt="Website Design Dogs project guide" />
          </picture>
          <div><small>BUILT FOR BUSINESSES</small><strong>THAT GO FURTHER.</strong></div>
        </div>
        <div>
          <div className={[styles.sectionHeadingCompact, "offer-section__heading"].join(" ")}>
            <p className={styles.eyebrow}>Why choose Website Design Dogs?</p>
            <h2>More than just a website. A clearer path forward.</h2>
          </div>
          <div className={styles.benefitGrid}>
            {benefitCards.map((card) => (
              <article key={card.title} className={[styles.benefitCard, "offer-benefit-card"].join(" ")}>
                <BrandIcon name={card.icon} size={23} />
                <div><h3>{card.title}</h3><p>{card.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={[styles.section, styles.processSection].join(" ")}>
        <div className={[styles.sectionHeading, "offer-section__heading"].join(" ")}>
          <div><p className={styles.eyebrow}>A clear process</p><h2>From October offer to approved project scope.</h2></div>
          <p>
            The promotion never replaces proper scoping. WDD confirms the work, regular service-fee value, exclusions, timeline, and discount before production begins.
          </p>
        </div>
        <div className={styles.processGrid}>
          {[
            ["01", "Tell Us About the Project", "Share the business, website type, platform, pages, features, budget, and timing."],
            ["02", "We Confirm Scope + Discount", "We establish the regular WDD service-fee value, exclusions, responsibilities, and October discount."],
            ["03", "Book the Project", "Accept the approved scope and submit the required initial payment during the promotional period."],
          ].map(([number, title, body]) => (
            <article key={number} className={[styles.processCard, "offer-benefit-card"].join(" ")}>
              <span>{number}</span><h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.faqSection].join(" ")}>
        <div className={styles.faqIntro}>
          <p className={styles.eyebrow}>Frequently asked questions</p>
          <h2>Got questions? We&apos;ve got answers.</h2>
          <p>Clear answers to the questions a serious buyer should ask before committing to a website project.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <details key={item.q} className="offer-faq">
              <summary>{item.q}</summary><p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={[styles.section, styles.termsSection].join(" ")} id="offer-terms">
        <div className={styles.termsCard}>
          <div><p className={styles.eyebrow}>Offer terms &amp; details</p><h2>Clear before you commit.</h2></div>
          <ol>{offer.exactTerms.map((term) => <li key={term}>{term}</li>)}</ol>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={[styles.finalCtaInner, "offer-final-cta__inner"].join(" ")}>
          <div className={styles.finalPumpkin} aria-hidden="true" />
          <div>
            <p className={styles.eyebrow}>October special</p>
            <h2>Ready to give your business a <span>stronger online presence?</span></h2>
            <p>Secure the October website-design discount before the offer ends.</p>
          </div>
          <div className={styles.finalCtaAction}>
            <Link className={styles.primaryButton} href={offer.ctaHref}>Get Started <ArrowRightIcon /></Link>
            <small>{offer.endsLabel}</small>
          </div>
          <picture className={styles.finalMascot}>
            <source type="image/avif" srcSet={mascotDesigner.avif} />
            <Image src={mascotDesigner.webp} width={900} height={900} alt="" aria-hidden="true" />
          </picture>
        </div>
      </section>
    </div>
  );
}
