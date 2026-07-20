export type Package = { name: string; slug: string; price: string; label?: string; description: string; features: string[]; href: string; cta: string };

export const websitePackages: Package[] = [
  { name: "Starter", slug: "starter", price: "$499", description: "A focused website to get your business online with confidence.", features: ["Up to 5 Pages", "Mobile-Responsive Design", "Basic On-Page SEO Setup", "Contact or Quote Form", "1 Revision Round"], href: "/contact?package=starter", cta: "Choose Starter" },
  { name: "Business", slug: "business", price: "$899", label: "Recommended", description: "A strategic website built to convert and grow your business online.", features: ["Up to 10 Pages", "Mobile-Responsive Design", "Expanded On-Page SEO Setup", "Performance Optimization", "3 Revision Rounds"], href: "/contact?package=business", cta: "Choose Business" },
  { name: "Growth", slug: "growth", price: "$1,499", description: "A powerful website for businesses ready to scale and sell online.", features: ["Up to 20 Pages", "E-Commerce Functionality", "Mobile-Responsive Design", "SEO & Performance Setup", "5 Revision Rounds"], href: "/contact?package=growth", cta: "Choose Growth" },
];

export const packageTrustItems = ["One-Time Website Build", "Clear Project Scope", "Mobile-Responsive", "Optional Ongoing Care"] as const;
export const packageValueItems = ["Custom Design", "Fast Load Times", "SEO Ready", "Secure & Reliable", "Dedicated Support"] as const;

export const comparisonRows = [
  ["Pages", "Up to 5", "Up to 10", "Up to 20"],
  ["Custom Design", "Included", "Included", "Included"],
  ["Mobile-Responsive", "Included", "Included", "Included"],
  ["On-Page SEO", "Basic", "Expanded", "SEO & Performance Setup"],
  ["Contact / Quote Form", "Included", "Included", "Included"],
  ["Performance Optimization", "—", "Included", "Included"],
  ["E-Commerce", "—", "—", "Included"],
  ["Revision Rounds", "1", "3", "5"],
  ["Launch Support", "Included", "Included", "Included"],
] as const;

export const optionalServices = [
  ["Website Care", "Ongoing updates and support to keep your site running smoothly.", "Quoted to scope"],
  ["Content & Copywriting", "Professional content that engages visitors and supports your website’s purpose.", "Quoted to scope"],
  ["Advanced SEO", "Deeper keyword strategy and technical SEO to support visibility.", "Quoted to scope"],
  ["E-Commerce Enhancements", "Extra features and integrations to improve the online buying experience.", "Available by scope"],
  ["Analytics & Reporting", "Clear reporting and performance insight for ongoing decisions.", "Available by scope"],
  ["Hosting & Security", "Secure hosting and proactive protection scoped around your website needs.", "Quoted to scope"],
] as const;

export const packageProcess = [
  ["Choose", "Pick the package that best fits your business goals."],
  ["Scope", "We confirm the details, pages, and functionality."],
  ["Design", "We design your site with your brand in focus."],
  ["Build", "We build and test your site for quality and performance."],
  ["Launch", "We launch your site and make it live for your users."],
] as const;

export const packageFaqs = [
  ["What is included in the one-time price?", "The package establishes the listed website scope. Final deliverables, responsibilities, and any additional requirements are confirmed in your project proposal."],
  ["Can I add pages later?", "Yes. Additional pages can be scoped during the project or planned as a future improvement."],
  ["Do you provide domain and hosting?", "Domain and hosting needs are reviewed with your project. Any related services or third-party costs are confirmed in the proposal before work begins."],
  ["What if I need help with content?", "Content and copywriting support can be added where needed. The level of support and deliverables are confirmed during project scoping."],
  ["How do revisions work?", "Each package includes the listed number of revision rounds. The proposal confirms how feedback is collected and how changes are handled."],
  ["Can you build an online store?", "E-commerce functionality is included in the Growth package. Additional store requirements can be reviewed and scoped for your project."],
  ["What happens if the scope changes?", "If requirements change, the impact on deliverables, timeline, and pricing is reviewed and agreed before additional work begins."],
  ["How do I get started?", "Send an enquiry with your project details. We will review your needs and recommend the best practical starting point."],
] as const;
