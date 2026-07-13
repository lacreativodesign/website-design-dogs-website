export type FaqItem = { question:string; answer:string };
export type FaqCategory = { title:string; items:FaqItem[] };
export const faqCategories: FaqCategory[] = [
{title:"Pricing & Packages",items:[
{question:"How much does a website cost?",answer:"Website Design Dogs packages start at $499 for Starter, $899 for Business, and $1,499 for Growth. Final pricing depends on approved scope, content, integrations, and third-party costs."},
{question:"Are the listed package prices one-time fees?",answer:"They are starting one-time project fees. Ongoing website care, hosting, licensing, and external tools are confirmed separately when needed."},
{question:"What may increase the final project price?",answer:"Additional pages, e-commerce, copywriting, custom illustrations, complex integrations, automation, membership features, licensing, or ongoing marketing needs may affect price."},
{question:"Are third-party costs included?",answer:"No third-party costs are assumed unless they are documented in the project proposal. External platforms, hosting, plugins, or licenses remain separate where applicable."},
{question:"Can I upgrade the project later?",answer:"Yes. A project can begin with a focused scope and expand later through additional pages, features, integrations, or ongoing care."},]},
{title:"Process & Timing",items:[
{question:"How long does a website project take?",answer:"Timing depends on scope, content readiness, approvals, integrations, and review cycles. The project proposal confirms expectations before work begins."},
{question:"What do you need from me before starting?",answer:"Helpful inputs include a business overview, service or product information, existing brand materials, required page content, timely feedback, and approved account access when required."},
{question:"How does the review and revision process work?",answer:"Review points are planned around the approved scope. Feedback is organized, clarified when needed, and applied before launch preparation."},
{question:"What can delay a website project?",answer:"Delays can come from missing content, late feedback, unclear scope, unavailable third-party access, or new requirements introduced after planning."},
{question:"What happens before launch?",answer:"The site is reviewed for content, responsive behavior, core functionality, SEO foundations, performance readiness, and launch details tied to the approved scope."},]},
{title:"Content & Design",items:[
{question:"Can you help organize my website content?",answer:"Yes. Content can be organized into clearer page structures, headings, sections, and calls to action so visitors can understand the offer more easily."},
{question:"Is copywriting included?",answer:"Copy organization is part of the planning process, but full copywriting may require additional scope depending on the amount and complexity of content needed."},
{question:"Can you use my existing logo and branding?",answer:"Yes. Approved existing brand materials can guide the visual direction when provided in usable formats."},
{question:"Can you redesign my existing website?",answer:"Yes. Redesign projects begin by reviewing the current website, business goals, content, technical needs, and customer journey."},
{question:"Will the website match my business style?",answer:"The design direction is created around the business, audience, content, and approved brand materials while keeping usability and conversion goals in view."},]},
{title:"Development & Ownership",items:[
{question:"Will the website work on mobile devices?",answer:"Yes. Responsive layout, readable content, mobile navigation, touch-friendly controls, and cross-device behavior are part of the implementation approach."},
{question:"Who owns the completed website?",answer:"Ownership details are documented in the project agreement and depend on the approved scope, platform, third-party licensing, and final payment terms."},
{question:"Will I be able to update the website?",answer:"Update options depend on the selected implementation and content-management scope. This is confirmed before work begins."},
{question:"Can you connect third-party tools?",answer:"Third-party tools can be planned when approved access, requirements, and platform limitations are clear. Active integrations are not assumed until implemented."},
{question:"Do you build e-commerce websites?",answer:"Yes. E-commerce projects can be scoped for product presentation, shopping experiences, essential configuration, responsive pages, and selected approved integrations."},]},
{title:"Support & Marketing",items:[
{question:"Do you provide website maintenance?",answer:"Website care can include content updates, maintenance reviews, performance monitoring, security checks, and improvement planning depending on the approved plan."},
{question:"Is SEO included?",answer:"SEO foundations such as metadata structure, headings, crawl-friendly pages, local content organization, and mobile readiness can be included in scope."},
{question:"Do you guarantee Google rankings?",answer:"No. Search rankings, traffic, leads, revenue, third-party approvals, and platform uptime cannot be guaranteed."},
{question:"Can you create campaign landing pages?",answer:"Campaign landing pages can be planned as future work when offer details, content, tracking requirements, and compliance needs are approved."},
{question:"Can you help with future improvements?",answer:"Yes. Future improvements can be scoped after launch based on business goals, website performance, content needs, and operational priorities."},]},
];
