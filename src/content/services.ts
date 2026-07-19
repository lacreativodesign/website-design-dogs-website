export type Service = { title: string; description: string; includes: string[]; icon: string };

export const services: Service[] = [
  {
    title: "Custom Website Design",
    icon: "/brand/icons/services/website-design.svg",
    description: "Bespoke, responsive website design tailored to your brand.",
    includes: ["Page structure and information hierarchy", "Responsive visual design", "Clear calls to action", "Brand-aligned styling", "Accessibility-conscious layouts"],
  },
  {
    title: "Website Development",
    icon: "/brand/icons/services/development.svg",
    description: "Fast, accessible websites built for modern devices.",
    includes: ["Responsive development", "Performance-conscious implementation", "Reusable components", "Technical quality checks", "Cross-device compatibility"],
  },
  {
    title: "E-Commerce Solutions",
    icon: "/brand/icons/services/ecommerce.svg",
    description: "Online storefronts designed around your products and customers.",
    includes: ["Store layout and product presentation", "Shopping and checkout experience", "Essential store configuration", "Responsive commerce pages", "Selected third-party integrations"],
  },
  {
    title: "Conversion Optimization",
    icon: "/brand/icons/mobile-app.svg",
    description: "Practical UX improvements that make important actions easier.",
    includes: ["Action-focused page hierarchy", "CTA placement review", "Form-entry path planning", "Trust-signal organization", "Mobile conversion checks"],
  },
  {
    title: "SEO & Speed Optimization",
    icon: "/brand/icons/services/seo-local.svg",
    description: "Technical improvements for discoverability and performance.",
    includes: ["Metadata structure", "Heading hierarchy", "Crawl-friendly page structure", "Local service content organization", "Performance and mobile readiness"],
  },
  {
    title: "Content & Copywriting",
    icon: "/brand/icons/social-media.svg",
    description: "Clear website copy structured around your business and offer.",
    includes: ["Page messaging hierarchy", "Service copy organization", "CTA copy support", "Content gap review", "Launch-ready content formatting"],
  },
  {
    title: "Hosting & Security",
    icon: "/brand/icons/industries/security.svg",
    description: "Hosting, updates, and security options based on project needs.",
    includes: ["Hosting readiness", "Security header awareness", "Form protection planning", "Update support", "Launch checks"],
  },
  {
    title: "Analytics & Reporting",
    icon: "/brand/icons/ai-automation.svg",
    description: "Analytics setup and reporting options for clearer visibility.",
    includes: ["Analytics readiness", "Conversion event planning", "Consent-aware tracking", "Attribution preparation", "Reporting handoff support"],
  },
];

export const serviceProcess = [
  ["Discovery", "Understand the business, audience, goals, and current challenges."],
  ["Planning", "Define the pages, content needs, features, and project scope."],
  ["Design", "Create the visual direction, page structure, and responsive experience."],
  ["Development", "Build the approved experience using production-ready implementation."],
  ["Review & Launch", "Test, refine, confirm details, and prepare the website for release."],
  ["Ongoing Care", "Support updates, maintenance, and future improvements where included."],
] as const;

export const clientNeeds = ["A clear business overview", "Service and product information", "Existing brand materials", "Required page content", "Timely feedback", "Access to approved third-party accounts when required"];
