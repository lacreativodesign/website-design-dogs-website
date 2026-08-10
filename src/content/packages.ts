export type PackageCategorySlug =
  | "website-design"
  | "e-commerce"
  | "seo-local"
  | "social-media"
  | "website-care"
  | "mobile-apps";

export type Package = {
  name: string;
  slug: string;
  categorySlug: PackageCategorySlug;
  price: string;
  priceValue: number;
  priceSuffix: string;
  startingAt?: boolean;
  label?: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string[];
  scopeNotes: string[];
  exclusions: string[];
  href: string;
  quoteHref: string;
  cta: string;
};

export type PackageCategory = {
  slug: PackageCategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  serviceSlug: string;
  featuredSlugs: string[];
  packages: Package[];
};

const createPackage = (
  categorySlug: PackageCategorySlug,
  data: Omit<Package, "categorySlug" | "href" | "quoteHref" | "cta">,
): Package => ({
  ...data,
  categorySlug,
  href: `/packages/${data.slug}`,
  quoteHref: `/get-started?package=${data.slug}&service=${
    categorySlug === "website-design"
      ? "custom-website-design"
      : categorySlug === "e-commerce"
        ? "e-commerce-solutions"
        : categorySlug === "seo-local"
          ? "seo-local-optimization"
          : categorySlug === "social-media"
            ? "social-media-marketing"
            : categorySlug === "website-care"
              ? "hosting-security"
              : "mobile-app-development"
  }`,
  cta: `View ${data.name}`,
});

const websitePackages: Package[] = [
  createPackage("website-design", {
    name: "Starter",
    slug: "starter",
    price: "$499",
    priceValue: 499,
    priceSuffix: "one time",
    tagline: "A focused first website with the essentials in place.",
    description: "A professional brochure-style website for a focused offer and a clear enquiry path.",
    features: ["Up to 5 pages", "Custom responsive design", "Contact or quote form", "Basic on-page SEO setup", "1 revision round", "Launch support"],
    idealFor: ["New or small service businesses", "A focused offer and simple enquiry path", "Businesses replacing a social-only presence"],
    scopeNotes: ["Page map and content responsibilities are confirmed before design begins.", "The website uses one approved language and one agreed primary conversion path."],
    exclusions: ["Copywriting beyond light formatting", "E-commerce and custom web applications", "Domain, hosting, themes, plugins, licenses, and third-party fees"],
  }),
  createPackage("website-design", {
    name: "Essentials",
    slug: "essentials",
    price: "$799",
    priceValue: 799,
    priceSuffix: "one time",
    tagline: "More room for services, trust, and useful customer answers.",
    description: "A broader small-business website with stronger service presentation and credibility content.",
    features: ["Up to 7 pages", "Custom responsive design", "Up to 2 forms", "Expanded on-page SEO setup", "2 revision rounds", "Performance and launch review"],
    idealFor: ["Growing local businesses", "Two or more services", "Teams that need stronger trust and FAQ content"],
    scopeNotes: ["Up to two reusable page patterns are included within the page allowance.", "Client supplies approved factual content unless copywriting is added."],
    exclusions: ["Advanced automation or portals", "Online-store functionality", "Third-party subscriptions and paid assets"],
  }),
  createPackage("website-design", {
    name: "Business",
    slug: "business",
    price: "$1,099",
    priceValue: 1099,
    priceSuffix: "one time",
    label: "Most Popular",
    tagline: "A conversion-focused website for an established service business.",
    description: "A strategic website with multiple service paths, stronger content hierarchy, and practical integrations.",
    features: ["Up to 10 pages", "Conversion-focused responsive design", "Up to 3 forms or booking embeds", "Expanded SEO and local foundations", "3 revision rounds", "Analytics-ready launch"],
    idealFor: ["Established service businesses", "Multiple services or audience paths", "Businesses replacing an outdated website"],
    scopeNotes: ["One standard booking or CRM embed can be included when the provider supports it.", "Tracking IDs and account access must be supplied by the client."],
    exclusions: ["Custom application development", "Complex data migration", "Paid media management and third-party costs"],
  }),
  createPackage("website-design", {
    name: "Professional",
    slug: "professional",
    price: "$1,499",
    priceValue: 1499,
    priceSuffix: "one time",
    tagline: "A deeper content and conversion system for a growing company.",
    description: "A larger marketing website with richer service content, lead paths, and approved integrations.",
    features: ["Up to 15 pages", "Advanced responsive component system", "Up to 5 forms or embeds", "Technical and on-page SEO foundation", "4 revision rounds", "Analytics and consent readiness"],
    idealFor: ["Businesses with several services or locations", "Teams running active lead generation", "Companies that need a stronger content system"],
    scopeNotes: ["Location pages must represent genuine business information and useful content.", "Integration feasibility is confirmed before the proposal is finalized."],
    exclusions: ["E-commerce catalogs", "Membership systems and custom portals", "Ongoing SEO, advertising, care, and software fees"],
  }),
  createPackage("website-design", {
    name: "Growth",
    slug: "growth",
    price: "$1,999",
    priceValue: 1999,
    priceSuffix: "one time",
    tagline: "A substantial website foundation for broader acquisition and content.",
    description: "A multi-section growth website with stronger strategy, deeper content paths, and more integration capacity.",
    features: ["Up to 20 pages", "Advanced responsive design system", "Up to 7 forms, embeds, or standard integrations", "SEO/GEO content architecture", "5 revision rounds", "Campaign and measurement readiness"],
    idealFor: ["Multi-service businesses", "Teams supporting SEO and paid campaigns", "Organizations with complex website content"],
    scopeNotes: ["Campaign landing-page templates may be included within the page allowance.", "Standard integrations use supported provider tools and documented access."],
    exclusions: ["Custom SaaS or mobile-app development", "Complex authenticated workflows", "Content production and ongoing marketing unless added"],
  }),
  createPackage("website-design", {
    name: "Premium",
    slug: "premium",
    price: "$2,499",
    priceValue: 2499,
    priceSuffix: "one time",
    label: "Most Complete",
    tagline: "The most comprehensive WDD marketing-website scope.",
    description: "A premium website engagement for substantial content, multiple journeys, and a polished launch system.",
    features: ["Up to 30 pages", "Premium responsive design system", "Up to 10 standard forms, embeds, or integrations", "Advanced SEO/GEO architecture", "6 revision rounds", "Launch, measurement, and handoff plan"],
    idealFor: ["Established companies with broad content", "Multi-audience or multi-location websites", "Teams that need the strongest website foundation"],
    scopeNotes: ["A discovery-approved page map controls the 30-page allowance.", "Complex integrations are assessed before inclusion and may require separate scope."],
    exclusions: ["Custom software, portals, and mobile apps", "Large catalog migration or custom commerce", "Ongoing campaigns, licenses, hosting, and maintenance"],
  }),
];

const ecommercePackages: Package[] = [
  createPackage("e-commerce", {
    name: "Commerce Launch",
    slug: "commerce-launch",
    price: "$1,499",
    priceValue: 1499,
    priceSuffix: "one time",
    tagline: "Launch a focused online store with a clear purchase path.",
    description: "A compact store on an approved managed or open-source commerce platform.",
    features: ["Up to 15 products", "Storefront, collection, product, cart, and checkout setup", "One payment method", "Basic shipping and tax configuration", "Responsive commerce design", "2 revision rounds"],
    idealFor: ["Focused product launches", "Small catalogs", "Businesses entering online commerce"],
    scopeNotes: ["The selected platform must support the approved catalog and region.", "Client supplies accurate product, price, tax, shipping, and policy information."],
    exclusions: ["Platform, app, processor, theme, and license fees", "Complex migration, subscriptions, or marketplace workflows", "Product photography and full product-copy production"],
  }),
  createPackage("e-commerce", {
    name: "Commerce Growth",
    slug: "commerce-growth",
    price: "$2,499",
    priceValue: 2499,
    priceSuffix: "one time",
    label: "Most Popular",
    tagline: "A stronger store for a growing catalog and richer merchandising.",
    description: "A conversion-aware storefront with broader catalog organization and approved integrations.",
    features: ["Up to 50 products", "Collection and navigation strategy", "Up to 2 payment or operational integrations", "Email and analytics readiness", "Responsive storefront customization", "3 revision rounds"],
    idealFor: ["Growing retailers", "Stores replacing a basic setup", "Businesses with multiple collections"],
    scopeNotes: ["Product variants and migration quality are reviewed before final scope.", "Standard integrations depend on supported platform capabilities."],
    exclusions: ["Custom ERP or warehouse software", "Complex historical-order migration", "Ongoing merchandising and ad management"],
  }),
  createPackage("e-commerce", {
    name: "Commerce Pro",
    slug: "commerce-pro",
    price: "$3,999",
    priceValue: 3999,
    priceSuffix: "starting price",
    startingAt: true,
    tagline: "A more advanced commerce build for complex selling requirements.",
    description: "A substantial store foundation with deeper catalog, integration, and conversion requirements.",
    features: ["Up to 100 products", "Advanced catalog and merchandising structure", "Up to 4 standard integrations", "Conversion and checkout review", "Analytics and consent implementation", "5 revision rounds"],
    idealFor: ["Established retailers", "Complex collections or operational needs", "Teams preparing significant commerce growth"],
    scopeNotes: ["Projects above 100 products or with custom workflows require a separate estimate.", "Platform selection follows catalog, ownership, integration, and operating requirements."],
    exclusions: ["Headless commerce unless explicitly scoped", "Custom marketplace or multi-vendor systems", "Ongoing development, platform, processor, and app fees"],
  }),
];

const seoPackages: Package[] = [
  createPackage("seo-local", {
    name: "SEO Launch",
    slug: "seo-launch",
    price: "$299",
    priceValue: 299,
    priceSuffix: "per month",
    tagline: "Clean up the core search and local foundations.",
    description: "A focused monthly foundation for a small service website.",
    features: ["Up to 5 priority pages", "Metadata and heading review", "Technical basics review", "Local information consistency checklist", "Search Console/Bing guidance", "Monthly action summary"],
    idealFor: ["New websites", "Small local-service businesses", "Teams fixing core on-page issues"],
    scopeNotes: ["One website and one primary market are included.", "Access and factual business information must be supplied."],
    exclusions: ["Promises of specific rankings or AI citations", "Backlink purchasing", "Large-scale content creation and developer work"],
  }),
  createPackage("seo-local", {
    name: "SEO Growth",
    slug: "seo-growth",
    price: "$599",
    priceValue: 599,
    priceSuffix: "per month",
    label: "Most Popular",
    tagline: "Improve priority service pages and local discovery month by month.",
    description: "Ongoing technical, on-page, internal-link, and content optimization for a growing site.",
    features: ["Up to 10 priority pages", "Keyword and intent mapping", "Technical and on-page improvements", "Internal-link optimization", "One content brief or page refresh monthly", "Monthly reporting and priorities"],
    idealFor: ["Growing service businesses", "Sites with several priority services", "Teams investing in sustainable discovery"],
    scopeNotes: ["Implementation depends on platform access and may be scheduled across the month.", "Content approval remains with the client."],
    exclusions: ["Guaranteed outcomes", "Digital PR or paid links", "Unlimited pages, copy, or development"],
  }),
  createPackage("seo-local", {
    name: "SEO Authority",
    slug: "seo-authority",
    price: "$999",
    priceValue: 999,
    priceSuffix: "per month",
    tagline: "Coordinate deeper technical, content, local, and GEO priorities.",
    description: "A broader monthly program for businesses with more services, content, and competitive search goals.",
    features: ["Up to 20 priority pages", "Technical backlog and schema guidance", "Service and topic-cluster planning", "Up to 2 content briefs or page refreshes monthly", "Local and GEO entity consistency review", "Monthly strategy report"],
    idealFor: ["Established multi-service businesses", "Competitive local or regional markets", "Teams building a defensible content base"],
    scopeNotes: ["Priorities are sequenced against the approved monthly capacity.", "External publishing and major development are separately scoped."],
    exclusions: ["Promises of specific rankings, traffic, leads, or citations", "High-volume content production", "Third-party tools and major technical rebuilds"],
  }),
];

const socialPackages: Package[] = [
  createPackage("social-media", {
    name: "Social Foundation",
    slug: "social-foundation",
    price: "$399",
    priceValue: 399,
    priceSuffix: "per month",
    tagline: "Create a consistent, credible Facebook and Instagram presence.",
    description: "A focused organic content and page-management foundation.",
    features: ["Facebook and Instagram setup or optimization", "8 feed posts per month", "Content calendar", "Branded static creative", "Publishing and scheduling", "Monthly summary"],
    idealFor: ["Businesses starting social channels", "Teams posting inconsistently", "Brands that need a professional baseline"],
    scopeNotes: ["One approved brand and one primary audience are included.", "Client supplies timely approvals and accurate business information."],
    exclusions: ["Ad spend and paid-media management", "On-location photography or video", "24/7 community management"],
  }),
  createPackage("social-media", {
    name: "Social Growth",
    slug: "social-growth",
    price: "$699",
    priceValue: 699,
    priceSuffix: "per month",
    label: "Most Popular",
    tagline: "Publish more consistently and connect content to campaigns.",
    description: "Organic content, community support, and a focused Meta Ads management layer.",
    features: ["12 feed posts per month", "Up to 8 story frames", "Content calendar and creative", "Business-hours community triage", "One Meta campaign managed", "Monthly performance report"],
    idealFor: ["Growing local businesses", "Brands preparing regular campaigns", "Teams that need coordinated content and ads"],
    scopeNotes: ["Client owns and funds the ad account directly.", "One campaign and agreed audience/offer scope are included."],
    exclusions: ["Advertising spend", "Influencer fees and production shoots", "Guaranteed followers, leads, or sales"],
  }),
  createPackage("social-media", {
    name: "Social Scale",
    slug: "social-scale",
    price: "$1,199",
    priceValue: 1199,
    priceSuffix: "per month",
    tagline: "Coordinate a broader content and paid-social rhythm.",
    description: "A higher-capacity social program with more creative formats, campaigns, and reporting depth.",
    features: ["16 feed posts per month", "Up to 16 story frames", "Up to 4 short-form edited videos from supplied footage", "Business-hours community triage", "Up to 3 Meta campaigns managed", "Pixel/CAPI and monthly strategy review"],
    idealFor: ["Established brands", "Teams running multiple offers", "Businesses investing consistently in paid social"],
    scopeNotes: ["Campaign count refers to actively managed campaigns within one ad account.", "Video editing uses client-supplied or separately scoped footage."],
    exclusions: ["Ad spend, creator fees, and on-location production", "Full-time moderation", "Guaranteed platform or commercial outcomes"],
  }),
];

const carePackages: Package[] = [
  createPackage("website-care", {
    name: "Essential Care",
    slug: "care-essential",
    price: "$49",
    priceValue: 49,
    priceSuffix: "per month",
    tagline: "Keep a small website updated and monitored.",
    description: "A lightweight care plan for a stable brochure-style website.",
    features: ["Monthly update review", "Backup verification where supported", "Security and uptime check", "Up to 30 minutes of content updates", "Email support", "Monthly care note"],
    idealFor: ["Small brochure websites", "Low-change sites", "Owners who need a clear support route"],
    scopeNotes: ["Unused update time does not roll over.", "Hosting responsibility depends on the approved platform arrangement."],
    exclusions: ["Emergency recovery from pre-existing issues", "New pages, redesigns, or features", "Hosting, licenses, plugins, and third-party fees"],
  }),
  createPackage("website-care", {
    name: "Business Care",
    slug: "care-business",
    price: "$99",
    priceValue: 99,
    priceSuffix: "per month",
    label: "Most Popular",
    tagline: "More proactive care for an active business website.",
    description: "Recurring maintenance, monitoring, and a practical monthly update allowance.",
    features: ["Twice-monthly update review", "Backup and recovery spot check", "Security, uptime, and form checks", "Up to 90 minutes of content updates", "Priority email support", "Monthly care summary"],
    idealFor: ["Active service websites", "Teams updating content regularly", "Businesses relying on website enquiries"],
    scopeNotes: ["Response and work scheduling follow the agreed support window.", "Substantial issues are assessed before repair work begins."],
    exclusions: ["24/7 incident response", "New functionality or major design work", "Third-party subscriptions and paid licenses"],
  }),
  createPackage("website-care", {
    name: "Priority Care",
    slug: "care-priority",
    price: "$199",
    priceValue: 199,
    priceSuffix: "per month",
    tagline: "Higher-capacity maintenance and improvement support.",
    description: "A proactive plan for websites with frequent changes and greater operational importance.",
    features: ["Weekly update review", "Backup, uptime, security, and form checks", "Up to 3 hours of content or configuration updates", "Priority support queue", "Performance spot check", "Monthly improvement recommendations"],
    idealFor: ["High-activity business websites", "Campaign and content teams", "Sites with more operational dependency"],
    scopeNotes: ["Support covers one approved website.", "Complex troubleshooting is assessed against remaining capacity or separately scoped."],
    exclusions: ["Guaranteed uptime or absolute security", "Custom development projects", "Hosting, software, and external vendor fees"],
  }),
];

const appPackages: Package[] = [
  createPackage("mobile-apps", {
    name: "App Blueprint",
    slug: "app-blueprint",
    price: "$2,499",
    priceValue: 2499,
    priceSuffix: "one time",
    tagline: "Turn the product idea into a buildable plan and prototype.",
    description: "A paid discovery, UX, architecture, and prototype engagement before coded development.",
    features: ["Product discovery workshop", "Core user flows and role map", "Information architecture", "Key-screen UX/UI direction", "Clickable prototype", "Technical blueprint and build estimate"],
    idealFor: ["Founders validating an app idea", "Teams preparing an internal business case", "Businesses reducing risk before development"],
    scopeNotes: ["This package does not include a coded application.", "The prototype covers the agreed core journey and representative screens."],
    exclusions: ["Production code", "Backend implementation", "App-store submission, cloud, software, and third-party fees"],
  }),
  createPackage("mobile-apps", {
    name: "Launch MVP",
    slug: "app-launch-mvp",
    price: "$12,499",
    priceValue: 12499,
    priceSuffix: "starting price",
    startingAt: true,
    label: "Most Popular",
    tagline: "Build a focused cross-platform MVP around one core journey.",
    description: "A scoped iOS and Android MVP with an approved blueprint, core screens, backend needs, and launch support.",
    features: ["Cross-platform iOS and Android app", "One core user role and journey", "Up to 15 primary screens", "Authentication and one standard integration", "QA and device testing", "Store-submission support"],
    idealFor: ["Validated product ideas", "Businesses launching a focused customer app", "Teams that need a testable first release"],
    scopeNotes: ["A completed or approved blueprint is required before build scope is finalized.", "Store approval remains under Apple and Google control."],
    exclusions: ["Complex multi-role administration", "Advanced offline, AI, real-time, or marketplace features", "Store fees, cloud usage, third-party services, and maintenance"],
  }),
  createPackage("mobile-apps", {
    name: "Growth App",
    slug: "app-growth",
    price: "$24,999",
    priceValue: 24999,
    priceSuffix: "starting price",
    startingAt: true,
    tagline: "Support multiple roles, workflows, integrations, and growth features.",
    description: "A larger cross-platform product scope for more complex customer or operational journeys.",
    features: ["Multiple approved user roles", "Up to 30 primary screens", "Administration experience", "Up to 3 standard integrations", "Payments, subscriptions, or notifications as scoped", "Expanded QA and store-submission support"],
    idealFor: ["Businesses with validated complex workflows", "Products requiring customer and administrator experiences", "Teams preparing a substantial market release"],
    scopeNotes: ["Architecture, screen count, integrations, and non-functional requirements control the final estimate.", "Native-only requirements are assessed separately."],
    exclusions: ["Unlimited roles, screens, or integrations", "Guaranteed store approval", "Cloud usage, processor fees, licenses, and post-launch care"],
  }),
];

export const packageCategories: PackageCategory[] = [
  { slug: "website-design", title: "Website Design Packages", shortTitle: "Websites", description: "Six one-time website foundations from a focused brochure site to a substantial premium build.", serviceSlug: "custom-website-design", featuredSlugs: ["starter", "business", "premium"], packages: websitePackages },
  { slug: "e-commerce", title: "E-Commerce Packages", shortTitle: "E-Commerce", description: "Storefront packages for focused launches, growing catalogs, and more advanced commerce requirements.", serviceSlug: "e-commerce-solutions", featuredSlugs: ["commerce-launch", "commerce-growth", "commerce-pro"], packages: ecommercePackages },
  { slug: "seo-local", title: "SEO & Local Packages", shortTitle: "SEO & Local", description: "Monthly technical, content, local, and GEO foundations without ranking guarantees.", serviceSlug: "seo-local-optimization", featuredSlugs: ["seo-launch", "seo-growth", "seo-authority"], packages: seoPackages },
  { slug: "social-media", title: "Social Media Packages", shortTitle: "Social Media", description: "Facebook and Instagram content, management, paid campaigns, tracking, and reporting.", serviceSlug: "social-media-marketing", featuredSlugs: ["social-foundation", "social-growth", "social-scale"], packages: socialPackages },
  { slug: "website-care", title: "Website Care Packages", shortTitle: "Website Care", description: "Recurring updates, monitoring, support, backups, security checks, and improvement guidance.", serviceSlug: "hosting-security", featuredSlugs: ["care-essential", "care-business", "care-priority"], packages: carePackages },
  { slug: "mobile-apps", title: "Mobile App Packages", shortTitle: "Mobile Apps", description: "A paid product blueprint followed by responsibly priced MVP and growth build scopes.", serviceSlug: "mobile-app-development", featuredSlugs: ["app-blueprint", "app-launch-mvp", "app-growth"], packages: appPackages },
];

export { websitePackages };
export const allPackages = packageCategories.flatMap((category) => category.packages);
export const packageBySlug = new Map(allPackages.map((item) => [item.slug, item]));
export const packageCategoryBySlug = new Map(packageCategories.map((item) => [item.slug, item]));
export const websitePackageBySlug = new Map(websitePackages.map((item) => [item.slug, item]));

export const packageTrustItems = ["Clear deliverable limits", "Transparent starting prices", "Responsive execution", "Client-owned accounts"] as const;
export const packageValueItems = [
  ["Custom Direction", "A visual and content system shaped around the approved business goals."],
  ["Performance Aware", "Responsive assets and implementation choices reviewed for real devices."],
  ["Search Foundation", "Clear structure, metadata, and content paths where included."],
  ["Scope Protection", "Deliverables, exclusions, responsibilities, and third-party costs are documented."],
  ["Practical Support", "A visible route from enquiry through handoff and optional ongoing care."],
] as const;

export const comparisonRows = [
  ["Pages", "Up to 5", "Up to 7", "Up to 10", "Up to 15", "Up to 20", "Up to 30"],
  ["Forms / standard embeds", "1", "Up to 2", "Up to 3", "Up to 5", "Up to 7", "Up to 10"],
  ["Responsive custom design", "Included", "Included", "Included", "Advanced", "Advanced", "Premium system"],
  ["On-page SEO foundation", "Basic", "Expanded", "Expanded + local", "Technical + on-page", "SEO/GEO architecture", "Advanced SEO/GEO"],
  ["Revision rounds", "1", "2", "3", "4", "5", "6"],
  ["Analytics readiness", "Basic", "Basic", "Included", "Included", "Campaign-ready", "Launch plan"],
] as const;

export const optionalServices = [
  { title: "Content & Copywriting", body: "Turn source material into clear page copy, service explanations, and useful calls to action.", availability: "Quoted to scope", href: "/services/content-copywriting" },
  { title: "Conversion Optimization", body: "Reduce friction across landing pages, forms, booking paths, and important customer decisions.", availability: "Focused engagement", href: "/services/conversion-optimization" },
  { title: "Analytics & Reporting", body: "Plan consent-aware events, attribution, dashboards, and useful reporting signals.", availability: "Quoted to scope", href: "/services/analytics-reporting" },
  { title: "Website Development", body: "Implement approved designs, features, integrations, and reusable responsive components.", availability: "Quoted to scope", href: "/services/website-development" },
  { title: "SEO & Local Optimization", body: "Strengthen technical, on-page, local, internal-link, and GEO foundations.", availability: "From $299/mo", href: "/services/seo-local-optimization" },
  { title: "Social Media Marketing", body: "Connect content, Meta campaigns, landing pages, attribution, and reporting.", availability: "From $399/mo", href: "/services/social-media-marketing" },
] as const;

export const packageProcess = [
  ["Choose", "Select a starting tier or ask us to recommend one."],
  ["Scope", "We confirm limits, responsibilities, integrations, exclusions, and timing."],
  ["Design", "The approved direction and content structure are prepared for review."],
  ["Build", "The agreed experience is implemented and tested against its acceptance criteria."],
  ["Launch", "Final checks, ownership, measurement, and handoff steps are completed."],
] as const;

export const packageFaqs = [
  ["Are these fixed final quotes?", "The listed amounts are starting prices for the stated scope. Your written proposal confirms final deliverables, limits, responsibilities, third-party costs, timing, and payment terms before work begins."],
  ["Can I combine packages or services?", "Yes. The practical starting tier can be combined with separately scoped services when the responsibilities and limits remain clear."],
  ["Are domain, hosting, platforms, apps, and ad spend included?", "No, unless a proposal explicitly states otherwise. Third-party subscriptions, processors, themes, plugins, software, store fees, cloud usage, and advertising spend are separate."],
  ["Can I choose Shopify, Wix, WooCommerce, BigCommerce, or another platform?", "Yes. Platform selection is based on ownership, content, commerce, integrations, editing needs, and growth requirements. We do not force one platform onto every project."],
  ["How do revisions work?", "Each package includes the listed number of consolidated revision rounds. New directions, added pages, features, or requirements are reviewed as scope changes."],
  ["What happens if the project scope changes?", "The impact on price, timeline, responsibilities, and deliverables is documented and approved before additional work begins."],
  ["Do recurring packages require ad spend or third-party fees?", "Advertising spend and third-party fees are separate. Recurring package pricing covers only the listed Website Design Dogs service scope."],
  ["How do I get started?", "Complete the guided project brief. We will review the context, confirm whether the selected tier fits, and recommend a responsible next step."],
] as const;
