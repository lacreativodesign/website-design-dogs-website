export const homeHero = {
  eyebrow: "LOYAL TO THE GAME.",
  title: "WE DESIGN WEBSITES THAT DELIVER RESULTS.",
  body: "Custom websites that look amazing, work flawlessly, and help your business grow online.",
  support: "Strategy, design, development, and ongoing care—handled by one reliable team.",
};

export const valuePoints = [
  ["Clear Positioning", "Help visitors quickly understand what you offer and why they should choose you."],
  ["Mobile-First Experience", "Create a smooth experience across phones, tablets, laptops, and desktops."],
  ["Conversion-Focused Structure", "Guide visitors toward calls, enquiries, bookings, and quote requests."],
  ["Reliable Ongoing Support", "Keep the website secure, updated, polished, and ready to grow."],
] as const;

export const homeIndustryStrip = [
  { title: "Home Services", icon: "/brand/icons/industries/construction.svg" },
  { title: "Professional Services", icon: "/brand/icons/industries/consulting.svg" },
  { title: "Health & Wellness", icon: "/brand/icons/industries/medical.svg" },
  { title: "Retail", icon: "/brand/icons/industries/ecommerce.svg" },
  { title: "Hospitality", icon: "/brand/icons/industries/restaurant.svg" },
  { title: "Growing Businesses", icon: "/brand/icons/services/development.svg" },
] as const;

export const homeServices = [
  { title: "Custom Website Design", body: "Tailored visual systems and page layouts shaped around your business goals.", icon: "/brand/icons/services/website-design.svg" },
  { title: "Website Development", body: "Fast, reliable implementation using reusable components and modern code.", icon: "/brand/icons/services/development.svg" },
  { title: "E-Commerce Solutions", body: "Clear storefront experiences for presenting products and supporting purchases.", icon: "/brand/icons/services/ecommerce.svg" },
  { title: "SEO & Local Optimization", body: "Technical and on-page foundations that help search engines understand your business.", icon: "/brand/icons/services/seo-local.svg" },
  { title: "Website Care", body: "Ongoing updates, maintenance, performance support, and launch follow-through.", icon: "/brand/icons/services/website-care.svg" },
] as const;

export const homeCapabilities = [
  { value: "5", label: "Core Pages" },
  { value: "100%", label: "Responsive Layout" },
  { value: "1", label: "Contact or Quote Form" },
  { value: "SEO", label: "Foundation Setup" },
  { value: "CARE", label: "Launch Support" },
] as const;

export const portfolioConcepts = [
  ["Cleaning Website Concept", "Home Services", "/portfolio/concepts/cleaning-concept.webp"],
  ["Roofing Website Concept", "Home Services", "/portfolio/concepts/roofing-concept.webp"],
  ["Landscaping Website Concept", "Home Services", "/portfolio/concepts/landscaping-concept.webp"],
  ["Real Estate Website Concept", "Professional Services", "/portfolio/concepts/real-estate-concept.webp"],
  ["Restaurant Website Concept", "Retail & Hospitality", "/portfolio/concepts/restaurant-concept.webp"],
  ["Law Firm Website Concept", "Professional Services", "/portfolio/concepts/law-firm-concept.webp"],
  ["Dental Website Concept", "Health & Wellness", "/portfolio/concepts/dental-concept.webp"],
  ["Fitness Website Concept", "Health & Wellness", "/portfolio/concepts/fitness-concept.webp"],
  ["Salon Website Concept", "Retail & Hospitality", "/portfolio/concepts/salon-concept.webp"],
  ["E-Commerce Website Concept", "Retail & Hospitality", "/portfolio/concepts/ecommerce-concept.webp"],
  ["Home Services Website Concept", "Home Services", "/portfolio/concepts/home-services-concept.webp"],
  ["Consulting Website Concept", "Professional Services", "/portfolio/concepts/consulting-concept.webp"],
] as const;

export const packagesHome = [
  ["STARTER", "$499", "", "A focused professional website for businesses that need a credible online presence.", ["Up to 5 core pages", "Responsive custom layout", "Contact or quote form", "Basic on-page SEO setup", "Essential performance optimization", "Launch support"], "/get-started?package=starter", "Choose Starter"],
  ["BUSINESS", "$899", "RECOMMENDED", "A stronger lead-generation website for established local and service businesses.", ["Up to 10 core pages", "Conversion-focused page structure", "Service and location content sections", "Analytics-ready implementation", "Enhanced performance optimization", "30 days of website care"], "/get-started?package=business", "Choose Business"],
  ["GROWTH", "$1,499", "", "A broader website foundation for businesses preparing to scale marketing and lead generation.", ["Up to 15 core pages", "Advanced lead-generation structure", "Blog or content-management setup", "Speed and technical optimization", "Priority launch support", "60 days of website care"], "/get-started?package=growth", "Choose Growth"],
] as const;

const industryIcon = (name: string) => `/brand/icons/industries/${name}.svg`;
export const industryTiles = [
  ["Cleaning Companies", industryIcon("cleaning")], ["Roofing Contractors", industryIcon("roofing")], ["Landscaping Businesses", industryIcon("landscaping")], ["HVAC Services", industryIcon("hvac")], ["Plumbing Services", industryIcon("plumbing")], ["Electrical Services", industryIcon("electrician")], ["General Contractors", industryIcon("construction")], ["Remodeling Companies", industryIcon("remodeling")], ["Painting Companies", industryIcon("painting")], ["Flooring Companies", industryIcon("flooring")], ["Pest Control", industryIcon("pest-control")], ["Pool Services", industryIcon("pool-services")], ["Moving Companies", industryIcon("moving")], ["Auto Repair", industryIcon("automotive")], ["Towing Services", industryIcon("automotive")], ["Real Estate", industryIcon("real-estate")], ["Property Management", industryIcon("real-estate")], ["Law Firms", industryIcon("legal")], ["Accounting Firms", industryIcon("accounting")], ["Insurance Agencies", industryIcon("consulting")], ["Dental Practices", industryIcon("dental")], ["Medical Clinics", industryIcon("medical")], ["Chiropractic Clinics", industryIcon("medical")], ["Fitness Businesses", industryIcon("fitness")], ["Salons & Spas", industryIcon("salon-spa")], ["Restaurants", industryIcon("restaurant")], ["Cafés", industryIcon("restaurant")], ["Retail Stores", industryIcon("ecommerce")], ["E-Commerce Brands", industryIcon("ecommerce")], ["Consultants", industryIcon("consulting")],
] as const;

export const reasons = [
  ["Strategy Before Decoration", "Every page begins with the business goal, customer journey, and action visitors should take."],
  ["Clear Communication", "Straightforward updates, practical explanations, and no unnecessary technical confusion."],
  ["Built for Real-World Use", "Responsive layouts, clear content hierarchy, accessible interactions, and maintainable code."],
  ["Support Beyond Launch", "Website care and improvement options help keep the finished website useful over time."],
] as const;

export const homepageFaqs = [
  ["How much does a Website Design Dogs website cost?", "Our main website packages begin at $499. Final pricing depends on page count, content needs, integrations, e-commerce requirements, and project scope."],
  ["How long does a website project take?", "Timing depends on scope and how quickly content and feedback are provided. A focused small-business website generally moves faster than a large custom or e-commerce project. Your timeline is confirmed before work begins."],
  ["Can you redesign an existing website?", "Yes. We can assess the current website, identify what should be retained or improved, and rebuild the experience around your current business goals."],
  ["Will my website work properly on mobile devices?", "Yes. Responsive behavior is treated as a core requirement so important content and actions remain clear across phones, tablets, laptops, and desktops."],
  ["Can you help organize website content?", "Yes. We can help structure pages, improve messaging hierarchy, and identify the content needed for each section. Any full copywriting requirement is confirmed in the project scope."],
  ["Do you build online stores?", "Yes. E-commerce projects can include product organization, store design, essential shopping flows, and selected third-party integrations based on the approved scope."],
  ["Do you provide website maintenance?", "Yes. Website care options can include updates, maintenance, performance reviews, security checks, and ongoing improvements."],
  ["Who owns the finished website?", "Ownership, source files, third-party licensing, hosting, and platform responsibilities are clearly defined in the project proposal before work begins."],
] as const;
