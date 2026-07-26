export const campaignOffer = {
  name: "Website Design Dogs Starter Website",
  regularPrice: 499,
  promotionalPrice: 499,
  savings: 0,
  offerCode: "WDD-STARTER-499",
  qualifyingScope: "Campaign Starter" as const,
  currency: "USD" as const,
  scopeNote:
    "The $499 Starter package includes the listed base scope. Final content requirements, integrations, third-party costs, revisions, responsibilities, and project timing are confirmed before work begins.",
  exclusions:
    "The Starter package does not automatically include domain registration, hosting, premium software, full copywriting, e-commerce, complex integrations, custom applications, ongoing marketing, or services outside the confirmed project scope.",
};

export const campaignProjectTypes = [
  "New Website",
  "Website Redesign",
  "Not Sure Yet",
] as const;

export type CampaignSlug =
  | "cleaning"
  | "roofing"
  | "landscaping"
  | "home-services";

type Campaign = {
  slug: CampaignSlug;
  industry: string;
  path: string;
  metadata: { title: string; description: string };
  eyebrow: string;
  h1: string;
  heroBody: string;
  heroDark: string;
  heroLight: string;
  problemHeading: string;
  problemPoints: string[];
  strategyHeading: string;
  industryFeatures: string[];
  supports?: string[];
  concept: { src: string; title: string; disclaimer: string };
};

const disclaimer =
  "This visual is a Website Design Dogs design concept and is not presented as a completed client project.";

export const campaigns = [
  {
    slug: "cleaning",
    industry: "Cleaning Companies",
    path: "/campaigns/cleaning",
    metadata: {
      title: "Cleaning Company Website Design",
      description:
        "Get a professional, mobile-ready cleaning company website with the $499 one-time Starter package, including up to five core pages, a quote form, SEO foundations, and launch support.",
    },
    eyebrow: "WEBSITE DESIGN FOR CLEANING COMPANIES",
    h1: "Turn more local visitors into cleaning quote requests.",
    heroBody:
      "A professional cleaning website should make your services easy to understand, your business easier to trust, and requesting a quote simple from any device.",
    heroDark: "/campaigns/cleaning/hero-dark.webp",
    heroLight: "/campaigns/cleaning/hero-light.webp",
    problemHeading: "Your website should do more than list cleaning services.",
    problemPoints: [
      "Visitors cannot quickly understand which cleaning services are available",
      "Important trust information is difficult to find",
      "Quote requests require too many steps",
      "Mobile visitors struggle to contact the business",
      "Service areas are not presented clearly",
      "The website does not look as professional as the service being provided",
    ],
    strategyHeading: "A clearer online experience for cleaning customers.",
    industryFeatures: [
      "Residential cleaning service presentation",
      "Commercial cleaning service presentation",
      "Deep-cleaning and move-in/move-out sections",
      "Service-area visibility",
      "Quote-request calls to action",
      "Mobile-friendly enquiry flow",
      "Trust and process sections",
      "Before-and-after image readiness when genuine images are supplied",
    ],
    concept: {
      src: "/portfolio/concepts/cleaning-concept.webp",
      title: "Cleaning Company Website Concept",
      disclaimer,
    },
  },
  {
    slug: "roofing",
    industry: "Roofing Contractors",
    path: "/campaigns/roofing",
    metadata: {
      title: "Roofing Company Website Design",
      description:
        "Get a professional, mobile-ready roofing company website with the $499 one-time Starter package, including up to five core pages, a quote form, SEO foundations, and launch support.",
    },
    eyebrow: "WEBSITE DESIGN FOR ROOFING COMPANIES",
    h1: "Build trust before the homeowner makes the first call.",
    heroBody:
      "A professional roofing website should explain your services clearly, make urgent contact easy, and give homeowners confidence that they are contacting a serious business.",
    heroDark: "/campaigns/roofing/hero-dark.webp",
    heroLight: "/campaigns/roofing/hero-light.webp",
    problemHeading: "Roofing customers decide quickly who looks credible.",
    problemPoints: [
      "Roofing services are difficult to compare",
      "Emergency and inspection calls to action are buried",
      "Service areas are unclear",
      "Mobile contact options are difficult to use",
      "Project imagery lacks structure",
      "The website does not communicate professionalism clearly",
    ],
    strategyHeading: "A roofing website structured around trust and action.",
    industryFeatures: [
      "Roof repair and replacement presentation",
      "Inspection and estimate calls to action",
      "Storm-damage service readiness",
      "Emergency contact pathway",
      "Service-area sections",
      "Project-gallery readiness when genuine project images are supplied",
      "Mobile-first enquiry flow",
      "Financing or warranty sections only when verified information is supplied",
    ],
    concept: {
      src: "/portfolio/concepts/roofing-concept.webp",
      title: "Roofing Company Website Concept",
      disclaimer,
    },
  },
  {
    slug: "landscaping",
    industry: "Landscaping Businesses",
    path: "/campaigns/landscaping",
    metadata: {
      title: "Landscaping Website Design",
      description:
        "Get a professional, mobile-ready landscaping website with the $499 one-time Starter package, including up to five core pages, a quote form, SEO foundations, and launch support.",
    },
    eyebrow: "WEBSITE DESIGN FOR LANDSCAPING BUSINESSES",
    h1: "Show the quality of your landscaping work before the first estimate.",
    heroBody:
      "A landscaping website should present services visually, explain the process clearly, and make it easy for property owners to request an estimate.",
    heroDark: "/campaigns/landscaping/hero-dark.webp",
    heroLight: "/campaigns/landscaping/hero-light.webp",
    problemHeading: "Great landscaping work deserves a better online presentation.",
    problemPoints: [
      "Services are grouped together without clear explanation",
      "Project images are difficult to browse",
      "Estimate requests are hard to find",
      "Seasonal services are not organized clearly",
      "Mobile visitors cannot quickly contact the business",
      "The website does not reflect the quality of the work",
    ],
    strategyHeading: "A visual, practical website for landscaping customers.",
    industryFeatures: [
      "Lawn-care and maintenance sections",
      "Landscape-design presentation",
      "Hardscaping service readiness",
      "Irrigation or seasonal-service sections when applicable",
      "Project-gallery readiness using genuine images",
      "Service-area presentation",
      "Estimate-request calls to action",
      "Mobile-friendly enquiry flow",
    ],
    concept: {
      src: "/portfolio/concepts/landscaping-concept.webp",
      title: "Landscaping Business Website Concept",
      disclaimer,
    },
  },
  {
    slug: "home-services",
    industry: "Home-Service Businesses",
    path: "/campaigns/home-services",
    metadata: {
      title: "Home Services Website Design",
      description:
        "Get a professional, mobile-ready home-services website with the $499 one-time Starter package, including up to five core pages, a quote form, SEO foundations, and launch support.",
    },
    eyebrow: "WEBSITE DESIGN FOR HOME-SERVICE BUSINESSES",
    h1: "Make it easier for homeowners to understand, trust, and contact your business.",
    heroBody:
      "A strong home-services website should explain what you do, where you work, and how customers can request service without confusion.",
    heroDark: "/campaigns/home-services/hero-dark.webp",
    heroLight: "/campaigns/home-services/hero-light.webp",
    problemHeading: "Homeowners often choose the business that looks easiest to trust.",
    problemPoints: [
      "Services are not organized clearly",
      "Important contact actions are difficult to find",
      "Mobile visitors cannot request service easily",
      "Service areas are unclear",
      "The business looks less established than it is",
      "The website is not prepared for future advertising campaigns",
    ],
    strategyHeading: "A flexible website foundation for local service businesses.",
    industryFeatures: [
      "Clear service categories",
      "Service-area presentation",
      "Quote or service-request pathway",
      "Mobile-first contact experience",
      "Trust-information sections",
      "Genuine project-gallery readiness",
      "FAQ and process sections",
      "Campaign-ready page structure",
    ],
    supports: [
      "HVAC",
      "Plumbing",
      "Electrical",
      "Painting",
      "Remodeling",
      "Flooring",
      "Pest control",
      "Pool services",
      "General contracting",
      "Other local home services",
    ],
    concept: {
      src: "/portfolio/concepts/home-services-concept.webp",
      title: "Home Services Website Concept",
      disclaimer,
    },
  },
] satisfies Campaign[];

export const campaignSlugs = campaigns.map((campaign) => campaign.slug);

export function getCampaign(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}
