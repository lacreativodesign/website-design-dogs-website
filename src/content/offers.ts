import { packageBySlug } from "@/content/packages";

export type SeasonalOffer = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  accentHeadline: string;
  body: string;
  discountPercent: number;
  startsAt: string;
  endsAt: string;
  endsLabel: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  featuredPackageSlugs: string[];
  eligiblePackageCategories: string[];
  exactTerms: string[];
};

export const currentSeasonalOffer: SeasonalOffer = {
  id: "october-2026-40-off",
  name: "October 2026 Website Offer",
  eyebrow: "OCTOBER SPECIAL",
  headline: "NO TRICKS.",
  accentHeadline: "JUST 40% OFF.",
  body:
    "Save 40% on Website Design Dogs website design and development service fees for qualifying new website projects booked this October.",
  discountPercent: 40,
  startsAt: "2026-10-01",
  endsAt: "2026-10-31",
  endsLabel: "Offer ends October 31, 2026",
  ctaLabel: "Get Started",
  ctaHref:
    "/get-started?service=website-design&utm_source=website&utm_medium=offer-page&utm_campaign=october-2026-40-off&utm_content=hero",
  secondaryCtaLabel: "View Packages",
  secondaryCtaHref: "#offer-pricing",
  featuredPackageSlugs: ["starter", "business", "commerce-launch"],
  eligiblePackageCategories: ["website-design", "e-commerce"],
  exactTerms: [
    "Offer valid October 1–31, 2026 for new qualifying website projects booked during the promotional period.",
    "The 40% discount applies to Website Design Dogs website design and development service fees for qualifying new websites, website redesigns, landing pages, e-commerce / Shopify website work, local-business websites, and custom website projects.",
    "Domains, hosting, platform subscriptions, premium themes, paid apps or plugins, premium software, advertising spend, ongoing maintenance, recurring services, and other third-party or pass-through costs are excluded unless expressly included in the approved scope.",
    "Final project scope, regular service-fee value, deliverables, responsibilities, revision limits, integrations, content requirements, third-party costs, and timing are confirmed before work begins.",
    "A project is considered booked once the approved scope is accepted and the required initial payment is received during the promotional period.",
    "Offer cannot be combined with other promotional discounts unless confirmed by Website Design Dogs in writing.",
  ],
};

export function discountPrice(priceValue: number, discountPercent: number) {
  return priceValue * (1 - discountPercent / 100);
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getFeaturedOfferPackages(offer = currentSeasonalOffer) {
  return offer.featuredPackageSlugs
    .map((slug) => packageBySlug.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export function getOfferQuoteHref({
  offer = currentSeasonalOffer,
  serviceSlug,
  content,
}: {
  offer?: SeasonalOffer;
  serviceSlug: string;
  content: string;
}) {
  const params = new URLSearchParams({
    service: serviceSlug,
    utm_source: "website",
    utm_medium: "offer-page",
    utm_campaign: offer.id,
    utm_content: content,
  });
  return `/get-started?${params.toString()}`;
}
