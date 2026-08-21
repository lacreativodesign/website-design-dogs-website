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
  description: string;
};

const concept = (
  id: string,
  title: string,
  brand: string,
  industries: PortfolioIndustry[],
  websiteTypes: PortfolioWebsiteType[],
  description: string,
  fullImageHeight = 8800,
): PortfolioConcept => ({
  id,
  title,
  brand,
  industries,
  websiteTypes,
  thumbnail: `/portfolio/concepts/${id}-thumb.webp`,
  fullImage: `/portfolio/concepts/${id}-full.webp`,
  fullImageHeight,
  description,
});

export const portfolioConcepts: readonly PortfolioConcept[] = [
  concept("roofing", "Roofing Website Concept", "RidgeCraft Roofing", ["Home & Field Services"], ["Business & Lead Generation"], "A direct service layout for estimates, service details, project proof, and local trust.", 8500),
  concept("cleaning", "Cleaning Website Concept", "Nestwell Cleaning", ["Home & Field Services"], ["Business & Lead Generation", "Booking & Appointment"], "A clear service presentation for recurring cleaning, specialty work, and booking or quote paths.", 8800),
  concept("landscaping", "Landscaping Website Concept", "Verdant Yard Co.", ["Home & Field Services"], ["Business & Lead Generation"], "A visual structure for outdoor services, seasonal work, project galleries, and enquiry flows."),
  concept("real-estate", "Real Estate Website Concept", "Northline Realty", ["Professional & Property"], ["Listings & Directories", "Business & Lead Generation"], "A polished concept for property discovery, agent expertise, consultations, and local positioning."),
  concept("restaurant", "Restaurant Website Concept", "Ember & Rye", ["Retail, Food & Hospitality"], ["E-Commerce & Online Ordering", "Booking & Appointment"], "A hospitality layout for menus, locations, reservations, online ordering, and customer actions."),
  concept("law-firm", "Law Firm Website Concept", "Hale & Finch Legal", ["Professional & Property"], ["Business & Lead Generation"], "A professional-services layout for practice areas, credibility, and consultation enquiries."),
  concept("consulting", "Consulting Website Concept", "Meridian Advisory", ["Professional & Property"], ["Business & Lead Generation"], "A consulting concept for expertise, service offers, useful resources, and structured enquiry flows."),
  concept("dental", "Dental Website Concept", "Luma Dental", ["Health, Wellness & Beauty"], ["Booking & Appointment", "Business & Lead Generation"], "A healthcare-oriented concept for services, patient information, and appointment paths."),
  concept("fitness", "Fitness Website Concept", "Formhouse Studio", ["Health, Wellness & Beauty"], ["Booking & Appointment"], "A programme and membership layout focused on offers, schedules, and sign-up actions."),
  concept("ecommerce", "E-Commerce Website Concept", "Serein Goods", ["Retail, Food & Hospitality"], ["E-Commerce & Online Ordering"], "A commerce concept for product discovery, featured collections, cart confidence, and purchase paths."),
  concept("home-services", "Home Services Website Concept", "HandyNest", ["Home & Field Services"], ["Business & Lead Generation"], "A flexible local-services layout for service areas, quote requests, and practical proof points."),
  concept("salon", "Salon Website Concept", "Atelier Sora", ["Health, Wellness & Beauty"], ["Booking & Appointment", "Business & Lead Generation"], "A service-led concept for beauty services, appointment paths, offers, and brand presentation."),
  concept("saas-launch", "SaaS Launch Landing Page Concept", "Arcflow", ["Technology & SaaS"], ["Landing Pages"], "A conversion-focused product launch page for positioning, feature education, pricing, and demo acquisition."),
  concept("creative-portfolio", "Creative Portfolio Website Concept", "Mara Vale Studio", ["Creators & Education"], ["Portfolio & Personal Brand"], "An editorial personal-brand portfolio for selected work, expertise, services, and direct enquiries."),
  concept("wellness-membership", "Wellness Membership Website Concept", "Stillwell", ["Health, Wellness & Beauty"], ["Membership & Subscription"], "A recurring-membership experience for plan comparison, member benefits, programmes, and account access."),
  concept("services-marketplace", "Local Services Marketplace Concept", "Neighborly Pro", ["Technology & SaaS", "Home & Field Services"], ["Marketplaces"], "A two-sided marketplace concept for service discovery, provider profiles, trust, availability, and booking."),
  concept("course-academy", "Online Course Academy Concept", "Fieldnote Academy", ["Creators & Education"], ["Courses & Education"], "A structured learning platform for programme discovery, curriculum previews, instructor authority, and enrolment."),
  concept("conference-ticketing", "Conference & Ticketing Website Concept", "Signal North", ["Events & Entertainment"], ["Events & Ticketing"], "An event-led experience for schedules, speakers, venue information, ticket tiers, and registration."),
  concept("nonprofit-foundation", "Nonprofit Foundation Website Concept", "OpenHand Foundation", ["Nonprofit & Community"], ["Nonprofit & Donations"], "A mission-first nonprofit concept for programmes, transparent impact communication, volunteering, and donations."),
  concept("client-operations-portal", "Client Operations Portal Concept", "Keystone Client Hub", ["Technology & SaaS", "Professional & Property"], ["Custom Portals & Web Applications"], "A secure application concept for client onboarding, project visibility, documents, approvals, and account actions."),
];

export const portfolioIndustryFilters = ["All", "Home & Field Services", "Professional & Property", "Health, Wellness & Beauty", "Retail, Food & Hospitality", "Technology & SaaS", "Creators & Education", "Nonprofit & Community", "Events & Entertainment"] as const;
export const portfolioWebsiteTypeFilters = ["All", "Business & Lead Generation", "E-Commerce & Online Ordering", "Booking & Appointment", "Listings & Directories", "Landing Pages", "Portfolio & Personal Brand", "Membership & Subscription", "Marketplaces", "Courses & Education", "Events & Ticketing", "Nonprofit & Donations", "Custom Portals & Web Applications"] as const;
export const portfolioTrustPoints = [["20", "DESIGN CONCEPTS", "Different industries. Responsive layouts. Clear direction."], ["02", "WAYS TO BROWSE", "Filter by industry or the kind of website you need."], ["03", "SCREEN SIZES", "Thoughtful layouts for desktop, tablet, and mobile."], ["04", "CLEAR PATHS", "Structure that makes the next action easy to find."]] as const;
export const portfolioStrategy = [["Clear Positioning", "Make the offer and next step easy to understand at a glance."], ["Strong Visual Hierarchy", "Use layout, contrast, and spacing to guide attention through the page."], ["Mobile-Responsive Design", "Keep the experience practical and readable across screen sizes."], ["Conversion-Focused Structure", "Give visitors a clear path from interest to action."], ["Consistent Brand System", "Coordinate colors, typography, imagery, and components with purpose."]] as const;
export const portfolioProcess = [["01", "Choose a Direction", "Identify the relevant style, business goal, platform, and audience focus."], ["02", "Make It Yours", "Customize the structure, content, services, and functionality around the approved project."], ["03", "Build and Launch", "Implement the responsive experience, review it together, and launch with clear ownership."]] as const;
export const portfolioLeadBenefits = ["Tell us which concepts fit your direction.", "We’ll recommend the right platform, package, and scope.", "Transparent starting prices and clear next steps.", "No concept is presented as completed client work."] as const;
