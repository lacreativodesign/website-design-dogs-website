export type PortfolioIndustry =
  | "Home & Field Services"
  | "Professional & Property"
  | "Health, Wellness & Beauty"
  | "Retail, Food & Hospitality";

export type PortfolioWebsiteType =
  | "Business & Lead Generation"
  | "E-Commerce & Online Ordering"
  | "Booking & Appointment"
  | "Listings & Directories";

export type PortfolioConcept = {
  id: string;
  title: string;
  industries: PortfolioIndustry[];
  websiteTypes: PortfolioWebsiteType[];
  image: string;
  description: string;
};

const concepts: readonly PortfolioConcept[] = [
  { id: "roofing", title: "Roofing Website Concept", industries: ["Home & Field Services"], websiteTypes: ["Business & Lead Generation"], image: "/portfolio/concepts/roofing-concept.webp", description: "A direct service layout for estimates, service details, project proof, and local trust." },
  { id: "cleaning", title: "Cleaning Website Concept", industries: ["Home & Field Services"], websiteTypes: ["Business & Lead Generation", "Booking & Appointment"], image: "/portfolio/concepts/cleaning-concept.webp", description: "A clear service presentation for recurring cleaning, specialty work, and booking or quote paths." },
  { id: "landscaping", title: "Landscaping Website Concept", industries: ["Home & Field Services"], websiteTypes: ["Business & Lead Generation"], image: "/portfolio/concepts/landscaping-concept.webp", description: "A visual structure for outdoor services, seasonal work, project galleries, and enquiry flows." },
  { id: "real-estate", title: "Real Estate Website Concept", industries: ["Professional & Property"], websiteTypes: ["Listings & Directories", "Business & Lead Generation"], image: "/portfolio/concepts/real-estate-concept.webp", description: "A polished concept for property discovery, agent expertise, consultations, and local positioning." },
  { id: "restaurant", title: "Restaurant Website Concept", industries: ["Retail, Food & Hospitality"], websiteTypes: ["E-Commerce & Online Ordering", "Booking & Appointment"], image: "/portfolio/concepts/restaurant-concept.webp", description: "A hospitality layout for menus, locations, reservations, online ordering, and customer actions." },
  { id: "law-firm", title: "Law Firm Website Concept", industries: ["Professional & Property"], websiteTypes: ["Business & Lead Generation"], image: "/portfolio/concepts/law-firm-concept.webp", description: "A professional-services layout for practice areas, credibility, and consultation enquiries." },
  { id: "consulting", title: "Consulting Website Concept", industries: ["Professional & Property"], websiteTypes: ["Business & Lead Generation"], image: "/portfolio/concepts/consulting-concept.webp", description: "A consulting concept for expertise, service offers, useful resources, and structured enquiry flows." },
  { id: "dental", title: "Dental Website Concept", industries: ["Health, Wellness & Beauty"], websiteTypes: ["Booking & Appointment", "Business & Lead Generation"], image: "/portfolio/concepts/dental-concept.webp", description: "A healthcare-oriented concept for services, patient information, and appointment paths." },
  { id: "fitness", title: "Fitness Website Concept", industries: ["Health, Wellness & Beauty"], websiteTypes: ["Booking & Appointment"], image: "/portfolio/concepts/fitness-concept.webp", description: "A programme and membership layout focused on offers, schedules, and sign-up actions." },
  { id: "ecommerce", title: "E-Commerce Website Concept", industries: ["Retail, Food & Hospitality"], websiteTypes: ["E-Commerce & Online Ordering"], image: "/portfolio/concepts/ecommerce-concept.webp", description: "A commerce concept for product discovery, featured collections, cart confidence, and purchase paths." },
  { id: "home-services", title: "Home Services Website Concept", industries: ["Home & Field Services"], websiteTypes: ["Business & Lead Generation"], image: "/portfolio/concepts/home-services-concept.webp", description: "A flexible local-services layout for service areas, quote requests, and practical proof points." },
  { id: "salon", title: "Salon Website Concept", industries: ["Health, Wellness & Beauty"], websiteTypes: ["Booking & Appointment", "Business & Lead Generation"], image: "/portfolio/concepts/salon-concept.webp", description: "A service-led concept for beauty services, appointment paths, offers, and brand presentation." },
];

export const portfolioConcepts = concepts;
export const portfolioIndustryFilters = ["All", "Home & Field Services", "Professional & Property", "Health, Wellness & Beauty", "Retail, Food & Hospitality"] as const;
export const portfolioWebsiteTypeFilters = ["All", "Business & Lead Generation", "E-Commerce & Online Ordering", "Booking & Appointment", "Listings & Directories"] as const;
export const futureWebsiteTypes = ["Landing Pages", "Portfolio & Personal Brand", "Membership & Subscription", "Marketplaces", "Courses & Education", "Events & Ticketing", "Nonprofit & Donations", "Custom Portals & Web Applications"] as const;
export const portfolioTrustPoints = [["12", "DESIGN CONCEPTS", "Different industries. Responsive layouts. Clear direction."], ["02", "WAYS TO BROWSE", "Filter by industry or the kind of website you need."], ["03", "SCREEN SIZES", "Thoughtful layouts for desktop, tablet, and mobile."], ["04", "CLEAR PATHS", "Structure that makes the next action easy to find."]] as const;
export const portfolioStrategy = [["Clear Positioning", "Make the offer and next step easy to understand at a glance."], ["Strong Visual Hierarchy", "Use layout, contrast, and spacing to guide attention through the page."], ["Mobile-Responsive Design", "Keep the experience practical and readable across screen sizes."], ["Conversion-Focused Structure", "Give visitors a clear path from interest to action."], ["Consistent Brand System", "Coordinate colors, typography, imagery, and components with purpose."]] as const;
export const portfolioProcess = [["01", "Choose a Direction", "Identify the relevant style, business goal, platform, and audience focus."], ["02", "Make It Yours", "Customize the structure, content, services, and functionality around the approved project."], ["03", "Build and Launch", "Implement the responsive experience, review it together, and launch with clear ownership."]] as const;
export const portfolioLeadBenefits = ["Tell us which concepts fit your direction.", "We’ll recommend the right platform, package, and scope.", "Transparent starting prices and clear next steps.", "No concept is presented as completed client work."] as const;

