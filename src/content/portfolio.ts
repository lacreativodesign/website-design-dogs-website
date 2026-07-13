export type PortfolioCategory = "Home Services" | "Professional Services" | "Health & Wellness" | "Retail & Hospitality";
export type PortfolioConcept = { title: string; category: PortfolioCategory; image: string; description: string };
export const portfolioConcepts: PortfolioConcept[] = [
{title:"Roofing Website Concept",category:"Home Services",image:"/portfolio/concepts/roofing-concept.webp",description:"A direct service layout for quote requests, service details, and trust-building information."},
{title:"Cleaning Website Concept",category:"Home Services",image:"/portfolio/concepts/cleaning-concept.webp",description:"A clear service presentation for recurring cleaning, specialty work, and enquiry paths."},
{title:"Landscaping Website Concept",category:"Home Services",image:"/portfolio/concepts/landscaping-concept.webp",description:"A visual structure for outdoor services, seasonal work, and project enquiry flows."},
{title:"Real Estate Website Concept",category:"Professional Services",image:"/portfolio/concepts/real-estate-concept.webp",description:"A polished concept for property expertise, consultations, and local service positioning."},
{title:"Restaurant Website Concept",category:"Retail & Hospitality",image:"/portfolio/concepts/restaurant-concept.webp",description:"A hospitality-focused layout for menus, location details, reservations, and customer actions."},
{title:"Law Firm Website Concept",category:"Professional Services",image:"/portfolio/concepts/law-firm-concept.webp",description:"A professional services layout for practice areas, credibility, and consultation enquiries."},
{title:"Dental Website Concept",category:"Health & Wellness",image:"/portfolio/concepts/dental-concept.webp",description:"A healthcare-oriented concept for services, patient information, and appointment paths."},
{title:"Fitness Website Concept",category:"Health & Wellness",image:"/portfolio/concepts/fitness-concept.webp",description:"A membership and programme layout focused on offers, schedules, and sign-up actions."},
{title:"Salon Website Concept",category:"Retail & Hospitality",image:"/portfolio/concepts/salon-concept.webp",description:"A service-led concept for beauty services, booking paths, and brand presentation."},
{title:"E-Commerce Website Concept",category:"Retail & Hospitality",image:"/portfolio/concepts/ecommerce-concept.webp",description:"A commerce concept for product discovery, featured collections, and purchase paths."},
{title:"Home Services Website Concept",category:"Home Services",image:"/portfolio/concepts/home-services-concept.webp",description:"A flexible local services layout for service areas, enquiries, and practical proof points."},
{title:"Consulting or Professional Services Website Concept",category:"Professional Services",image:"/portfolio/concepts/consulting-concept.webp",description:"A consulting concept for expertise, service offers, and structured enquiry flows."},
];
export const portfolioFilters = ["All","Home Services","Professional Services","Health & Wellness","Retail & Hospitality"] as const;
export const conceptPrinciples = [["Clear Positioning","Help visitors immediately understand the business and its offer."],["Strong Visual Hierarchy","Make important information easier to scan and understand."],["Conversion Paths","Guide users toward enquiries, bookings, purchases, or quote requests."],["Responsive Experience","Keep the experience useful across phones, tablets, and desktops."]] as const;
