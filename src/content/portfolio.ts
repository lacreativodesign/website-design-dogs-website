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
): PortfolioConcept => ({
  id,
  title,
  brand,
  industries,
  websiteTypes,
  thumbnail: `/portfolio/concepts/${id}-thumb.webp`,
  fullImage: `/portfolio/concepts/${id}-full.webp`,
  fullImageHeight: 8800,
  liveUrl: `/portfolio/live/?concept=${id}`,
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
];

export const portfolioIndustryFilters = [
  "All",
  "Home & Field Services",
  "Professional & Property",
  "Health, Wellness & Beauty",
  "Retail, Food & Hospitality",
] as const;

export const portfolioWebsiteTypeFilters = [
  "All",
  "Business & Lead Generation",
  "E-Commerce & Online Ordering",
  "Booking & Appointment",
  "Listings & Directories",
] as const;

export const portfolioTrustPoints = [
  ["12", "LIVE DESIGN CONCEPTS", "Distinct industries, layouts, art direction, and responsive behavior."],
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
