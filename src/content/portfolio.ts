export type PortfolioIndustry =
  | "Home & Field Services"
  | "Professional & Property"
  | "Health, Wellness & Beauty"
  | "Retail, Food & Hospitality"
  | "Technology & SaaS"
  | "Creators & Education"
  | "Nonprofit & Community"
  | "Events & Entertainment";

export type PortfolioWebsiteType =
  | "Business & Lead Generation"
  | "E-Commerce & Online Ordering"
  | "Booking & Appointment"
  | "Listings & Directories"
  | "Landing Pages"
  | "Portfolio & Personal Brand"
  | "Membership & Subscription"
  | "Marketplaces"
  | "Courses & Education"
  | "Events & Ticketing"
  | "Nonprofit & Donations"
  | "Custom Portals & Web Applications";

export type PortfolioConcept = {
  id: string;
  title: string;
  brand: string;
  industries: PortfolioIndustry[];
  websiteTypes: PortfolioWebsiteType[];
  thumbnail: string;
  fullImage: string;
  fullImageHeight: number;
  liveUrl: string;
  description: string;
};

const concept = (
  id: string,
  title: string,
  brand: string,
  industries: PortfolioIndustry[],
  websiteTypes: PortfolioWebsiteType[],
  description: string,
  assets?: { thumbnail?: string; fullImage?: string; fullImageHeight?: number },
): PortfolioConcept => ({
  id,
  title,
  brand,
  industries,
  websiteTypes,
  thumbnail: assets?.thumbnail ?? `/portfolio/concepts/${id}-thumb.webp`,
  fullImage: assets?.fullImage ?? `/portfolio/concepts/${id}-full.webp`,
  fullImageHeight: assets?.fullImageHeight ?? 8800,
  liveUrl: `/portfolio/live?concept=${id}`,
  description,
});

export const portfolioConcepts: readonly PortfolioConcept[] = [
  concept("roofing", "Roofing Website Concept", "Forge & Field Roofing", ["Home & Field Services"], ["Business & Lead Generation"], "An industrial editorial direction for a craft-led residential roofing company."),
  concept("cleaning", "Cleaning Website Concept", "Sunday House Co.", ["Home & Field Services"], ["Business & Lead Generation", "Booking & Appointment"], "An airy, warm service experience designed around recurring home-care rhythms."),
  concept("landscaping", "Landscaping Website Concept", "Wildline Gardens", ["Home & Field Services"], ["Business & Lead Generation"], "An immersive botanical field journal for landscape design and stewardship."),
  concept("real-estate", "Real Estate Website Concept", "Aster Row Realty", ["Professional & Property"], ["Listings & Directories", "Business & Lead Generation"], "A property magazine direction that starts with lifestyle, context, and point of view."),
  concept("restaurant", "Restaurant Website Concept", "Casa Brasa", ["Retail, Food & Hospitality"], ["E-Commerce & Online Ordering", "Booking & Appointment"], "A vivid open-fire hospitality concept built around menus, gathering, and reservations."),
  concept("law-firm", "Law Firm Website Concept", "Arden & Cole", ["Professional & Property"], ["Business & Lead Generation"], "A restrained legal-services system centered on clarity, judgment, and practice depth."),
  concept("consulting", "Consulting Website Concept", "Northstar Works", ["Professional & Property"], ["Business & Lead Generation"], "A high-contrast Swiss system for strategy, operating design, and working sessions."),
  concept("dental", "Dental Website Concept", "Kindred Dental Studio", ["Health, Wellness & Beauty"], ["Booking & Appointment", "Business & Lead Generation"], "A calm, sculptural care experience designed to make patients feel informed and at ease."),
  concept("fitness", "Fitness Website Concept", "Hinterland Training Club", ["Health, Wellness & Beauty"], ["Booking & Appointment"], "A kinetic training concept focused on useful strength, coaching, and repeatable effort."),
  concept("ecommerce", "E-Commerce Website Concept", "Orris Supply", ["Retail, Food & Hospitality"], ["E-Commerce & Online Ordering"], "A tactile product catalogue for small-batch home goods and maker-led storytelling."),
  concept("home-services", "Home Services Website Concept", "Juniper Home Crew", ["Home & Field Services"], ["Business & Lead Generation"], "A friendly utility-first service site for repairs, installs, and room improvements."),
  concept("salon", "Salon Website Concept", "Miro House", ["Health, Wellness & Beauty"], ["Booking & Appointment", "Business & Lead Generation"], "An avant-garde beauty editorial built around shape, color, ritual, and booking."),
  concept("saas-launch", "SaaS Launch Landing Page Concept", "Northframe", ["Technology & SaaS"], ["Landing Pages", "Business & Lead Generation"], "A high-clarity SaaS launch page built around product value, workflow visibility, and one decisive conversion path.", { thumbnail: "/portfolio/concepts/saas-launch-thumb.svg", fullImage: "/portfolio/concepts/saas-launch-thumb.svg", fullImageHeight: 1500 }),
  concept("creative-portfolio", "Creative Portfolio Website Concept", "Mara Vale Studio", ["Creators & Education"], ["Portfolio & Personal Brand"], "An editorial portfolio direction that uses oversized type, project sequencing, and restrained motion to put the work first.", { thumbnail: "/portfolio/concepts/creative-portfolio-thumb.svg", fullImage: "/portfolio/concepts/creative-portfolio-thumb.svg", fullImageHeight: 1500 }),
  concept("wellness-membership", "Wellness Membership Website Concept", "Stillhouse Club", ["Health, Wellness & Beauty"], ["Membership & Subscription", "Booking & Appointment"], "A warm membership experience organized around weekly rituals, simple plan choices, and a calm recurring-service journey.", { thumbnail: "/portfolio/concepts/wellness-membership-thumb.svg", fullImage: "/portfolio/concepts/wellness-membership-thumb.svg", fullImageHeight: 1500 }),
  concept("local-marketplace", "Local Services Marketplace Concept", "Neighborly", ["Home & Field Services"], ["Marketplaces", "Listings & Directories"], "A neighborhood services marketplace with category discovery, clear provider context, and a practical request flow.", { thumbnail: "/portfolio/concepts/local-marketplace-thumb.svg", fullImage: "/portfolio/concepts/local-marketplace-thumb.svg", fullImageHeight: 1500 }),
  concept("course-academy", "Online Course Academy Concept", "Fieldwork Academy", ["Creators & Education"], ["Courses & Education", "Membership & Subscription"], "A structured education concept that makes the curriculum, learning rhythm, and enrollment path understandable before signup.", { thumbnail: "/portfolio/concepts/course-academy-thumb.svg", fullImage: "/portfolio/concepts/course-academy-thumb.svg", fullImageHeight: 1500 }),
  concept("conference", "Conference & Ticketing Website Concept", "Signal / 27", ["Events & Entertainment"], ["Events & Ticketing", "Landing Pages"], "A kinetic event site centered on schedule clarity, session discovery, and a direct ticketing path without invented attendance claims.", { thumbnail: "/portfolio/concepts/conference-thumb.svg", fullImage: "/portfolio/concepts/conference-thumb.svg", fullImageHeight: 1500 }),
  concept("nonprofit", "Nonprofit Foundation Website Concept", "Common Ground Fund", ["Nonprofit & Community"], ["Nonprofit & Donations", "Business & Lead Generation"], "A transparent nonprofit concept focused on program understanding, donation confidence, and clear stewardship language.", { thumbnail: "/portfolio/concepts/nonprofit-thumb.svg", fullImage: "/portfolio/concepts/nonprofit-thumb.svg", fullImageHeight: 1500 }),
  concept("client-portal", "Client Operations Portal Concept", "OrbitOps", ["Technology & SaaS"], ["Custom Portals & Web Applications"], "A product-style client portal concept for projects, approvals, files, messages, and operational visibility in one interface.", { thumbnail: "/portfolio/concepts/client-portal-thumb.svg", fullImage: "/portfolio/concepts/client-portal-thumb.svg", fullImageHeight: 1500 }),
];

export const portfolioIndustryFilters = [
  "All",
  "Home & Field Services",
  "Professional & Property",
  "Health, Wellness & Beauty",
  "Retail, Food & Hospitality",
  "Technology & SaaS",
  "Creators & Education",
  "Nonprofit & Community",
  "Events & Entertainment",
] as const;

export const portfolioWebsiteTypeFilters = [
  "All",
  "Business & Lead Generation",
  "E-Commerce & Online Ordering",
  "Booking & Appointment",
  "Listings & Directories",
  "Landing Pages",
  "Portfolio & Personal Brand",
  "Membership & Subscription",
  "Marketplaces",
  "Courses & Education",
  "Events & Ticketing",
  "Nonprofit & Donations",
  "Custom Portals & Web Applications",
] as const;

export const portfolioTrustPoints = [
  ["20", "LIVE DESIGN CONCEPTS", "Distinct industries, layouts, art direction, and responsive behavior."],
  ["02", "WAYS TO BROWSE", "Filter by industry or the kind of website you need."],
  ["03", "SCREEN SIZES", "Thoughtful layouts for desktop, tablet, and mobile."],
  ["04", "CLEAR PATHS", "Structure that makes the next action easy to find."],
] as const;

export const portfolioStrategy = [
  ["Clear Positioning", "Make the offer and next step easy to understand at a glance."],
  ["Strong Visual Hierarchy", "Use layout, contrast, and spacing to guide attention through the page."],
  ["Mobile-Responsive Design", "Keep the experience practical and readable across screen sizes."],
  ["Conversion-Focused Structure", "Give visitors a clear path from interest to action."],
  ["Consistent Brand System", "Coordinate colors, typography, imagery, and components with purpose."],
] as const;

export const portfolioProcess = [
  ["01", "Choose a Direction", "Identify the relevant style, business goal, platform, and audience focus."],
  ["02", "Make It Yours", "Customize the structure, content, services, and functionality around the approved project."],
  ["03", "Build and Launch", "Implement the responsive experience, review it together, and launch with clear ownership."],
] as const;

export const portfolioLeadBenefits = [
  "Tell us which concepts fit your direction.",
  "We’ll recommend the right platform, package, and scope.",
  "Transparent starting prices and clear next steps.",
  "No concept is presented as completed client work.",
] as const;
