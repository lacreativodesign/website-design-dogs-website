export type PortfolioCategory = "Home Services" | "Professional Services" | "Health & Wellness" | "Retail & Hospitality";

export type PortfolioConcept = {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
};

const concepts: readonly PortfolioConcept[] = [
  { id: "roofing", title: "Roofing Website Concept", category: "Home Services", image: "/portfolio/concepts/roofing-concept.webp", description: "A direct service layout for quote requests, service details, and trust-building information." },
  { id: "cleaning", title: "Cleaning Website Concept", category: "Home Services", image: "/portfolio/concepts/cleaning-concept.webp", description: "A clear service presentation for recurring cleaning, specialty work, and enquiry paths." },
  { id: "landscaping", title: "Landscaping Website Concept", category: "Home Services", image: "/portfolio/concepts/landscaping-concept.webp", description: "A visual structure for outdoor services, seasonal work, and project enquiry flows." },
  { id: "real-estate", title: "Real Estate Website Concept", category: "Professional Services", image: "/portfolio/concepts/real-estate-concept.webp", description: "A polished concept for property expertise, consultations, and local service positioning." },
  { id: "restaurant", title: "Restaurant Website Concept", category: "Retail & Hospitality", image: "/portfolio/concepts/restaurant-concept.webp", description: "A hospitality-focused layout for menus, location details, reservations, and customer actions." },
  { id: "law-firm", title: "Law Firm Website Concept", category: "Professional Services", image: "/portfolio/concepts/law-firm-concept.webp", description: "A professional services layout for practice areas, credibility, and consultation enquiries." },
  { id: "consulting", title: "Consulting Website Concept", category: "Professional Services", image: "/portfolio/concepts/consulting-concept.webp", description: "A consulting concept for expertise, service offers, and structured enquiry flows." },
  { id: "dental", title: "Dental Website Concept", category: "Health & Wellness", image: "/portfolio/concepts/dental-concept.webp", description: "A healthcare-oriented concept for services, patient information, and appointment paths." },
  { id: "fitness", title: "Fitness Website Concept", category: "Health & Wellness", image: "/portfolio/concepts/fitness-concept.webp", description: "A membership and programme layout focused on offers, schedules, and sign-up actions." },
  { id: "ecommerce", title: "E-Commerce Website Concept", category: "Retail & Hospitality", image: "/portfolio/concepts/ecommerce-concept.webp", description: "A commerce concept for product discovery, featured collections, and purchase paths." },
  { id: "home-services", title: "Home Services Website Concept", category: "Home Services", image: "/portfolio/concepts/home-services-concept.webp", description: "A flexible local services layout for service areas, enquiries, and practical proof points." },
  { id: "salon", title: "Salon Website Concept", category: "Retail & Hospitality", image: "/portfolio/concepts/salon-concept.webp", description: "A service-led concept for beauty services, booking paths, and brand presentation." },
];

export const portfolioConcepts = concepts;
export const portfolioFilters = ["All", "Home Services", "Professional Services", "Health & Wellness", "Retail & Hospitality"] as const;
export const portfolioTrustPoints = [["12", "DESIGN CONCEPTS", "Different industries. Responsive layouts. Clear direction."], ["01", "DESIGN APPROACH", "Built around the audience, offer, and next step."], ["03", "SCREEN SIZES", "Thoughtful layouts for desktop, tablet, and mobile."], ["04", "CLEAR PATHS", "Structure that makes the next action easy to find."]] as const;
export const portfolioStrategy = [["Audience", "Start with the people the business needs to reach and the questions they need answered."], ["Structure", "Organize services, proof points, and calls to action into a clear, useful path."], ["Responsive execution", "Adapt the hierarchy and interactions so the concept stays practical on every screen."]] as const;
export const portfolioProcess = [["01", "Choose a Direction", "We help identify the right style, business goals, and audience focus."], ["02", "Make It Yours", "We customize the design, content, services, and functionality around your project."], ["03", "Build and Launch", "We build your responsive site, review it together, and launch with confidence."]] as const;
export const portfolioLeadBenefits = ["Tell us which concepts fit your direction.", "We’ll recommend the right package and scope.", "Transparent pricing. Clear next steps.", "No fake promises or surprise scope."] as const;
