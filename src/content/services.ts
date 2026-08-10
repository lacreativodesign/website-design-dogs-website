export type ServiceFaq = { question: string; answer: string };

export type ServiceDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  valueProposition: string;
  shortBenefit: string;
  includes: string[];
  forWho: string[];
  painPoints: string[];
  outcomes: string[];
  valueAdds: string[];
  approach: readonly [string, string][];
  relatedSlugs: string[];
  packageCategory: PackageCategorySlug;
  faqs: ServiceFaq[];
  icon: string;
  illustration: { webp: string; avif: string; alt: string };
};

const process = (steps: readonly [string, string][]) => steps;
const art = (slug: string, alt: string) => ({
  webp: `/brand/illustrations/services/${slug}.webp`,
  avif: `/brand/illustrations/services/${slug}.avif`,
  alt,
});

export const services: ServiceDetail[] = [
  {
    slug: "custom-website-design",
    title: "Custom Website Design",
    eyebrow: "Design that earns attention",
    description: "Bespoke, responsive website design shaped around your brand, audience, offer, and highest-value visitor actions.",
    valueProposition: "Give your business a clear, credible digital home that makes the offer easier to understand and the next step easier to take.",
    shortBenefit: "A distinctive, conversion-aware website experience built around your business—not a recycled template.",
    icon: "/brand/icons/services/website-design.svg",
    illustration: art("custom-website-design", "Border collie designer arranging a custom responsive website interface"),
    includes: ["Audience and offer discovery", "Page architecture and user-flow planning", "Desktop, tablet, and mobile design", "Brand-aligned interface system", "Conversion paths and calls to action", "Accessibility-conscious layouts"],
    forWho: ["Businesses launching a primary website", "Teams replacing an outdated or generic site", "Organizations that need clearer service presentation"],
    painPoints: ["Visitors cannot quickly understand the offer", "The current design does not reflect the business", "Mobile pages feel crowded or difficult to use"],
    outcomes: ["A clearer first impression", "Consistent responsive page patterns", "Visible paths to enquiry, booking, or purchase"],
    valueAdds: ["Content hierarchy guidance", "Performance-aware design decisions", "SEO-ready heading and page structure"],
    approach: process([["Discover", "Review your audience, offer, content, and priorities."], ["Structure", "Map the page hierarchy and the action each page should support."], ["Design", "Create and refine responsive visual directions."], ["Prepare", "Document the approved experience for production implementation."]]),
    relatedSlugs: ["website-development", "content-copywriting", "conversion-optimization"],
    packageCategory: "website-design",
    faqs: [
      { question: "Do you design around an existing brand?", answer: "Yes. Existing logos, colors, and approved brand materials can guide the work. If materials are incomplete, the proposal can define the additional direction required." },
      { question: "Will I see mobile layouts?", answer: "Yes. Responsive behavior is considered from the beginning, with the exact screens and review points defined by the project scope." },
      { question: "Can you redesign selected pages only?", answer: "Yes. A focused redesign can center on priority pages, a campaign journey, or a specific conversion problem." },
      { question: "Is development included?", answer: "Design and development can be combined or scoped separately. Your proposal identifies exactly which deliverables are included." },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    eyebrow: "Built for real-world use",
    description: "Fast, accessible, maintainable websites implemented for modern devices, browsers, content needs, and integrations.",
    valueProposition: "Turn approved strategy and design into a dependable website that loads quickly, scales cleanly, and remains practical to operate.",
    shortBenefit: "Reusable, responsive implementation that protects performance and makes future improvements easier.",
    icon: "/brand/icons/services/development.svg",
    illustration: art("website-development", "Border collie developer assembling reusable responsive website components"),
    includes: ["Responsive page implementation", "Reusable component development", "Semantic HTML and accessibility checks", "Performance-conscious asset handling", "Forms and approved integrations", "Cross-device launch review"],
    forWho: ["Businesses with approved designs ready to build", "Teams modernizing a marketing website", "Organizations that need maintainable components"],
    painPoints: ["The current site is slow or fragile", "Small updates break layouts", "The implementation does not match the approved design"],
    outcomes: ["A stable production build", "Faster and more consistent pages", "A reusable base for future content"],
    valueAdds: ["Technical SEO foundations", "Security-header awareness", "Ownership and handoff documentation"],
    approach: process([["Plan", "Confirm pages, integrations, content, and technical constraints."], ["Build", "Implement reusable responsive components."], ["Verify", "Test key journeys, forms, and layouts."], ["Launch", "Complete the agreed deployment and handoff steps."]]),
    relatedSlugs: ["custom-website-design", "hosting-security", "analytics-reporting"],
    packageCategory: "website-design",
    faqs: [
      { question: "Can you work from existing designs?", answer: "Yes, when the required designs and assets are available. A technical review identifies implementation questions before work begins." },
      { question: "Which platforms do you support?", answer: "We support WordPress, Wix Studio, Webflow, Squarespace, Shopify, WooCommerce, BigCommerce, and custom Next.js builds where they fit the project." },
      { question: "Will the site be responsive?", answer: "Yes. Responsive implementation is reviewed across representative desktop, tablet, and mobile conditions." },
      { question: "Can you add features to an existing site?", answer: "Potentially. Existing code, platform limits, licenses, and third-party dependencies must be reviewed before a safe scope is confirmed." },
    ],
  },
  {
    slug: "e-commerce-solutions",
    title: "E-Commerce Solutions",
    eyebrow: "Commerce with clarity",
    description: "Online stores designed around product discovery, customer confidence, checkout clarity, and the operational reality behind every order.",
    valueProposition: "Make products easier to discover, compare, and purchase through a storefront built for your catalog, team, and preferred commerce platform.",
    shortBenefit: "A cleaner path from product discovery to checkout on Shopify, WooCommerce, BigCommerce, Wix, or another approved platform.",
    icon: "/brand/icons/services/ecommerce.svg",
    illustration: art("e-commerce-solutions", "Border collie commerce specialist organizing a product catalog and checkout journey"),
    includes: ["Catalog and collection planning", "Product-page presentation", "Cart and checkout configuration", "Payment and shipping setup support", "Responsive storefront design", "Selected integration planning"],
    forWho: ["Businesses selling products online", "Retailers improving an existing store", "Teams preparing a focused product launch"],
    painPoints: ["Products are difficult to browse or compare", "Checkout creates avoidable friction", "The store platform no longer fits operations"],
    outcomes: ["Clearer catalog navigation", "More confident product pages", "A tested purchase journey"],
    valueAdds: ["Platform recommendation", "Analytics event planning", "Product-copy and SEO options"],
    approach: process([["Assess", "Review products, catalog structure, fulfillment, and customer questions."], ["Map", "Plan collections, product pages, checkout, and integrations."], ["Build", "Configure the approved storefront experience."], ["Test", "Review representative shopping, payment, and notification flows."]]),
    relatedSlugs: ["custom-website-design", "conversion-optimization", "analytics-reporting"],
    packageCategory: "e-commerce",
    faqs: [
      { question: "Which e-commerce platforms do you build on?", answer: "Projects may use Shopify, WooCommerce, BigCommerce, Wix eCommerce, Squarespace Commerce, or a justified custom/headless setup. The recommendation depends on ownership, catalog, integrations, and growth plans." },
      { question: "Can you migrate an existing store?", answer: "Migration feasibility depends on the platform, catalog, orders, customer data, subscriptions, and integrations. Those items are reviewed before migration is scoped." },
      { question: "Is payment processing included?", answer: "Supported processor configuration may be included. Merchant approval, transaction fees, chargebacks, and account ownership remain with the business." },
      { question: "Are platform and app fees included?", answer: "No. Platform subscriptions, paid themes, plugins, apps, licenses, and transaction fees are separate unless a proposal explicitly states otherwise." },
    ],
  },
  {
    slug: "seo-local-optimization",
    title: "SEO & Local Optimization",
    eyebrow: "Be easier to discover",
    description: "Technical, on-page, content, and local-search foundations that help search engines and customers understand the business.",
    valueProposition: "Build a clearer search foundation with useful service content, consistent local signals, crawlable pages, and measurable priorities.",
    shortBenefit: "Practical SEO and local-search work grounded in accurate business information—not ranking guarantees or thin location pages.",
    icon: "/brand/icons/services/seo-local.svg",
    illustration: art("seo-local-optimization", "Border collie SEO specialist auditing a website beside a location map and visibility chart"),
    includes: ["Keyword and intent mapping", "Metadata and heading structure", "Technical crawl review", "Internal-link planning", "Local profile consistency guidance", "Performance and mobile readiness review"],
    forWho: ["Businesses launching a new website", "Teams improving weak on-page foundations", "Local businesses with inconsistent search signals"],
    painPoints: ["Search engines cannot clearly classify key services", "Important pages compete or remain disconnected", "Business information is inconsistent across the web"],
    outcomes: ["Clearer service-page targeting", "Stronger crawl and internal-link structure", "A prioritized optimization roadmap"],
    valueAdds: ["GEO-friendly answer sections", "Schema recommendations", "Search Console and Bing setup guidance"],
    approach: process([["Audit", "Review agreed pages, technical signals, and content structure."], ["Map", "Connect real customer intent to the right pages."], ["Improve", "Implement or document the approved priorities."], ["Measure", "Confirm indexing signals and define the next reporting cycle."]]),
    relatedSlugs: ["content-copywriting", "website-development", "analytics-reporting"],
    packageCategory: "seo-local",
    faqs: [
      { question: "Do you guarantee rankings?", answer: "No. Search visibility depends on competition, authority, content, technical quality, user behavior, and search-engine decisions outside any agency’s control." },
      { question: "Do you create location pages?", answer: "Only when a page represents genuine, useful service-area information. We do not create thin or misleading location pages." },
      { question: "Does this include ongoing SEO?", answer: "The Launch tier is a focused setup. Monthly Growth and Authority tiers provide continuing optimization within their defined scope." },
      { question: "What is GEO?", answer: "Generative Engine Optimization improves factual clarity, entity signals, answer-ready content, and source consistency for AI-assisted discovery. It cannot guarantee an AI citation." },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    eyebrow: "Content with a commercial purpose",
    description: "Facebook and Instagram setup, planning, publishing, community support, Meta Ads management, and transparent reporting.",
    valueProposition: "Turn disconnected posts and ad activity into a consistent social presence with clear ownership, approved creative, and measurable campaign paths.",
    shortBenefit: "A coordinated social system covering page setup, content, community, Meta Ads, tracking, and reporting.",
    icon: "/brand/icons/services/social-media.svg",
    illustration: art("social-media-marketing", "Border collie social strategist planning content, community, and campaign measurement"),
    includes: ["Facebook and Instagram setup or optimization", "Content pillars and calendar", "Creative production and scheduling", "Community-management scope", "Meta Ads setup and management", "Pixel/CAPI and reporting guidance"],
    forWho: ["Businesses without a consistent social presence", "Teams that need regular content support", "Brands preparing or improving Meta campaigns"],
    painPoints: ["Publishing is inconsistent", "Creative and ads feel disconnected", "Leads cannot be traced back to campaigns"],
    outcomes: ["A consistent publishing rhythm", "Clearer campaign-to-landing-page alignment", "Decision-ready performance reporting"],
    valueAdds: ["Landing-page recommendations", "First-party attribution preservation", "Client ownership of business and advertising accounts"],
    approach: process([["Align", "Confirm audience, offer, channels, access, and commercial goal."], ["Plan", "Build content pillars, calendar, creative needs, and campaign structure."], ["Publish", "Create, approve, schedule, and manage the agreed activity."], ["Improve", "Review signals and refine the next cycle without inventing guarantees."]]),
    relatedSlugs: ["content-copywriting", "conversion-optimization", "analytics-reporting"],
    packageCategory: "social-media",
    faqs: [
      { question: "Does social media management include Meta Ads?", answer: "Ads management is included only in the tiers that list it. Advertising spend is always separate and paid through the client-owned ad account." },
      { question: "Who owns the Facebook and Instagram accounts?", answer: "The client should own the pages, business portfolio, dataset, and advertising account. Website Design Dogs receives only the access needed for the approved scope." },
      { question: "Do you guarantee followers or sales?", answer: "No. Audience growth and sales depend on the offer, budget, market, creative, landing experience, follow-up, and platform delivery." },
      { question: "Can you create the pages from scratch?", answer: "Yes. Page creation, profile optimization, permissions, brand setup, and initial content can be included when the required client information and approvals are available." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    eyebrow: "From product idea to launchable app",
    description: "Mobile product strategy, UX/UI, prototypes, cross-platform development, integrations, testing, and store-submission support.",
    valueProposition: "Turn a validated product idea into a scoped iOS and Android experience with clear architecture, ownership, milestones, and launch responsibilities.",
    shortBenefit: "A product-first app process covering blueprint, prototype, build, integrations, testing, and launch support.",
    icon: "/brand/icons/services/mobile-app.svg",
    illustration: art("mobile-app-development", "Border collie product developer assembling a mobile app journey across several devices"),
    includes: ["Product discovery and user flows", "UX/UI and clickable prototype", "Cross-platform app development", "Backend and approved integrations", "Device, accessibility, and security testing", "App Store and Google Play submission support"],
    forWho: ["Businesses validating a mobile product idea", "Teams building a focused launch MVP", "Companies extending workflows to mobile users"],
    painPoints: ["The idea lacks a buildable scope", "Roles and integrations are not mapped", "The team needs one accountable product process"],
    outcomes: ["A decision-ready product blueprint", "A testable cross-platform application", "Clear launch and maintenance responsibilities"],
    valueAdds: ["React Native/Expo-first assessment", "Analytics and notification planning", "Post-launch care options"],
    approach: process([["Validate", "Define the problem, user, core journey, assumptions, and success signals."], ["Blueprint", "Map flows, screens, architecture, integrations, and delivery milestones."], ["Build", "Implement the approved product scope with visible review points."], ["Launch", "Complete testing, store materials, submission support, and handoff."]]),
    relatedSlugs: ["custom-website-design", "website-development", "analytics-reporting"],
    packageCategory: "mobile-apps",
    faqs: [
      { question: "Does the App Blueprint include a coded app?", answer: "No. The App Blueprint is a paid strategy, flow, architecture, and clickable-prototype engagement. It is intended to reduce risk before development." },
      { question: "Do you build for both iOS and Android?", answer: "A cross-platform approach can support both from one shared codebase when appropriate. Native development is separately scoped when product requirements justify it." },
      { question: "Are app-store fees included?", answer: "No. Apple and Google developer fees, cloud usage, third-party services, payment fees, and ongoing maintenance are separate unless explicitly included." },
      { question: "Can you guarantee app-store approval?", answer: "No. Apple and Google control their review decisions. We can prepare the agreed submission materials and address review feedback within the approved scope." },
    ],
  },
  {
    slug: "conversion-optimization",
    title: "Conversion Optimization",
    eyebrow: "Make next steps easier",
    description: "Focused UX, messaging, form, trust, and journey improvements that reduce friction around the action that matters most.",
    valueProposition: "Help more of the right visitors understand the offer, trust the business, and complete a useful next step without manipulative tactics.",
    shortBenefit: "A clearer, lower-friction journey from first impression to enquiry, booking, signup, or purchase.",
    icon: "/brand/icons/mobile-app.svg",
    illustration: art("conversion-optimization", "Border collie optimization specialist simplifying a visitor funnel into one clear action"),
    includes: ["Priority action review", "Offer and CTA hierarchy", "Form and booking-path review", "Trust-signal organization", "Mobile conversion checks", "Test-ready recommendations"],
    forWho: ["Businesses with traffic but weak enquiry paths", "Teams improving campaign landing pages", "Store owners simplifying checkout decisions"],
    painPoints: ["Visitors do not know what to do next", "Forms ask too much too early", "Important proof is missing or badly timed"],
    outcomes: ["A clearer primary action", "Reduced journey friction", "A prioritized test and implementation plan"],
    valueAdds: ["Analytics-event review", "Accessible interaction guidance", "Honest persuasion without fake scarcity"],
    approach: process([["Identify", "Agree on the audience path and action worth improving."], ["Review", "Examine hierarchy, messaging, forms, proof, and friction."], ["Prioritize", "Rank focused changes by impact and effort."], ["Refine", "Implement or hand off the approved improvements."]]),
    relatedSlugs: ["custom-website-design", "content-copywriting", "analytics-reporting"],
    packageCategory: "website-design",
    faqs: [
      { question: "Do you guarantee more leads or sales?", answer: "No. Results depend on traffic quality, offer, competition, price, follow-up, and other factors. The work focuses on clearer, lower-friction user journeys." },
      { question: "Can this be a focused engagement?", answer: "Yes. One landing page, form, checkout step, or service journey can be reviewed when that is the most practical starting point." },
      { question: "Do you need analytics access?", answer: "Data is useful when available, but a structured usability, messaging, and accessibility review can still identify important friction." },
      { question: "Can you implement the recommendations?", answer: "Implementation can be included when the platform and access allow it; otherwise recommendations can be prepared for your team." },
    ],
  },
  {
    slug: "content-copywriting",
    title: "Content & Copywriting",
    eyebrow: "Words with a job to do",
    description: "Website messaging, page copy, service explanations, calls to action, and content structure grounded in approved business facts.",
    valueProposition: "Turn expertise and source material into clear website content that answers customer questions and supports a useful next action.",
    shortBenefit: "Clear, organized copy that sounds credible, supports search intent, and gives every page a commercial purpose.",
    icon: "/brand/icons/social-media.svg",
    illustration: art("content-copywriting", "Border collie copywriter organizing ideas into a clear website content hierarchy"),
    includes: ["Messaging hierarchy", "Service-page copy", "CTA and form microcopy", "Content-gap review", "Interview or source-material review", "Launch-ready formatting"],
    forWho: ["Businesses with expertise but incomplete copy", "Teams refreshing unclear service messaging", "Owners who need help organizing source material"],
    painPoints: ["The copy sounds generic", "Important questions remain unanswered", "Pages repeat facts without guiding a decision"],
    outcomes: ["Clearer positioning", "Useful page-by-page messaging", "Consistent voice and next-step language"],
    valueAdds: ["SEO/GEO answer structure", "Factual-claim approval workflow", "Content handoff mapped to page components"],
    approach: process([["Learn", "Review the offer, audience questions, source material, and voice."], ["Outline", "Create a page-by-page messaging structure."], ["Write", "Develop drafts around approved facts and priorities."], ["Refine", "Incorporate feedback and prepare final website content."]]),
    relatedSlugs: ["custom-website-design", "seo-local-optimization", "conversion-optimization"],
    packageCategory: "website-design",
    faqs: [
      { question: "Can you write from scratch?", answer: "Yes, when interviews, questionnaires, and reliable source information are available. The client remains responsible for approving factual claims." },
      { question: "Who approves the copy?", answer: "A designated client contact approves services, claims, pricing, compliance statements, and final wording before publication." },
      { question: "Can you update existing pages?", answer: "Yes. Existing pages can be revised for clarity, hierarchy, search intent, and calls to action." },
      { question: "Do you create regulated claims?", answer: "No. Clients must supply and approve legal, medical, financial, safety, or other regulated statements." },
    ],
  },
  {
    slug: "hosting-security",
    title: "Website Care, Hosting & Security",
    eyebrow: "Care after launch",
    description: "Ongoing updates, backups, monitoring, hosting guidance, security reviews, and a clear route for website support.",
    valueProposition: "Keep the website maintained, recoverable, monitored, and supported with responsibilities matched to its actual platform and risk profile.",
    shortBenefit: "Practical post-launch care that protects reliability, ownership, updates, and response expectations.",
    icon: "/brand/icons/industries/security.svg",
    illustration: art("hosting-security", "Border collie website-care specialist monitoring backups, hosting, uptime, and security"),
    includes: ["Update and maintenance support", "Backup and recovery checks", "Security and form-protection review", "Hosting-readiness guidance", "Uptime and issue-monitoring options", "Access and ownership checklist"],
    forWho: ["Businesses preparing a site launch", "Owners without an internal web team", "Teams that need predictable update support"],
    painPoints: ["Updates are ignored until something breaks", "Account ownership is unclear", "There is no documented recovery path"],
    outcomes: ["A visible maintenance cadence", "Clear account and support responsibilities", "Faster response to approved website issues"],
    valueAdds: ["Performance spot checks", "Monthly care summary on eligible tiers", "Improvement backlog for future scope"],
    approach: process([["Review", "Assess the platform, access, hosting, and support needs."], ["Plan", "Define ownership, updates, backups, monitoring, and response scope."], ["Maintain", "Complete the agreed recurring care tasks."], ["Report", "Record completed work, findings, and recommended next steps."]]),
    relatedSlugs: ["website-development", "analytics-reporting", "seo-local-optimization"],
    packageCategory: "website-care",
    faqs: [
      { question: "Is hosting included in every care plan?", answer: "No. Hosting depends on the platform and selected plan. Any hosting, license, or third-party cost is disclosed separately." },
      { question: "Do you guarantee uptime or absolute security?", answer: "No. No provider can promise absolute availability or security. The plan defines practical monitoring, maintenance, backup, and support responsibilities." },
      { question: "Who owns the accounts?", answer: "Client ownership should remain clear. Website Design Dogs receives only the access needed to deliver the approved service." },
      { question: "Does a care plan include redesign work?", answer: "Routine updates are limited by the selected plan. New pages, redesigns, migrations, and substantial features are separately scoped." },
    ],
  },
  {
    slug: "analytics-reporting",
    title: "Analytics & Reporting",
    eyebrow: "Measure what supports a decision",
    description: "Consent-aware analytics, conversion events, attribution, dashboards, and reporting organized around useful business questions.",
    valueProposition: "Replace dashboard noise with meaningful signals that connect website actions, campaigns, and enquiry outcomes as responsibly as the available data allows.",
    shortBenefit: "A clearer measurement system covering consent, events, attribution, reporting, and decision-ready recommendations.",
    icon: "/brand/icons/ai-automation.svg",
    illustration: art("analytics-reporting", "Border collie analyst presenting consent-aware website performance and attribution signals"),
    includes: ["Analytics readiness review", "Conversion event plan", "Consent-aware configuration", "Campaign attribution preparation", "Dashboard or reporting setup", "Measurement documentation"],
    forWho: ["Businesses launching a marketing website", "Teams running paid campaigns", "Owners who need clearer enquiry signals"],
    painPoints: ["Reports show activity but not decisions", "Campaign attribution disappears between pages", "Consent and advertising events are inconsistent"],
    outcomes: ["Defined business events", "More reliable campaign context", "A repeatable reporting cadence"],
    valueAdds: ["Meta Pixel/CAPI deduplication review", "UTM and click-ID preservation", "Tracking privacy and data-quality checks"],
    approach: process([["Define", "Agree on the decisions, actions, and questions measurement should support."], ["Map", "Document events, consent states, attribution, and available data sources."], ["Configure", "Implement the approved measurement setup where access permits."], ["Verify", "Test representative events and explain reporting limitations."]]),
    relatedSlugs: ["conversion-optimization", "seo-local-optimization", "social-media-marketing"],
    packageCategory: "website-design",
    faqs: [
      { question: "Will analytics track visitors without consent?", answer: "Optional analytics and advertising technologies should respect the configured consent choices and applicable obligations." },
      { question: "Can you guarantee perfect attribution?", answer: "No. Consent choices, browsers, blockers, platform restrictions, cross-device behavior, and third-party systems create unavoidable gaps." },
      { question: "Which metrics will you report?", answer: "Metrics are selected around agreed business questions, such as qualified form submissions, booking paths, product actions, or campaign landing-page performance." },
      { question: "Can you work with existing accounts?", answer: "Yes, when appropriate access is provided and the current configuration can be reviewed safely." },
    ],
  },
];

export const DEFAULT_SERVICE_SLUG = "custom-website-design";
export const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
export const serviceProcess = [["Discovery", "Understand the business, audience, goals, and current challenges."], ["Planning", "Define the content, functionality, responsibilities, and project scope."], ["Design", "Create the visual direction, structure, and responsive experience."], ["Development", "Build the approved experience using production-ready implementation."], ["Review & Launch", "Test, refine, confirm details, and prepare the work for release."]] as const;
export const clientNeeds = ["A clear business overview", "Service or product information", "Existing brand materials", "Required content and approvals", "Timely consolidated feedback", "Access to approved third-party accounts when required"];
import type { PackageCategorySlug } from "@/content/packages";

