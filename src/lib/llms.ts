import { featuredFaqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import {
  allPackages,
  packageProcess,
} from "@/content/packages";
import { platforms } from "@/content/platforms";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import {
  absoluteUrl,
  BRAND_DISCLOSURE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SLOGAN,
} from "@/lib/site-config";

const link = (label: string, path: string, description: string) =>
  `- [${label}](${absoluteUrl(path)}): ${description}`;

export function createLlmsTxt() {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${BRAND_DISCLOSURE} ${SITE_SLOGAN} Website packages begin with the Starter package at $499 as a one-time starting project fee. Final scope, responsibilities, third-party costs, timing, and payment terms are confirmed before work begins.`,
    "",
    "## Core pages",
    "",
    link(
      "Services",
      "/services",
      "Website strategy, design, development, e-commerce, SEO foundations, content, hosting, security, analytics, and conversion support.",
    ),
    link(
      "Packages",
      "/packages",
      "Compare 21 starting packages across websites, commerce, SEO, social media, website care, and mobile apps.",
    ),
    link(
      "Platforms",
      "/platforms",
      "Compare website, CMS, commerce, and custom platform options by fit, ownership, cost, and operational requirements.",
    ),
    link(
      "Portfolio",
      "/portfolio",
      "Industry-focused design concepts that demonstrate layout and responsive thinking; these are concepts, not client case studies.",
    ),
    link(
      "About",
      "/about",
      "The Website Design Dogs approach, principles, process, and ownership disclosure.",
    ),
    link(
      "FAQ",
      "/faq",
      "Factual answers about scope, pricing, process, content, ownership, support, and SEO expectations.",
    ),
    link(
      "Get a free website quote",
      "/get-started",
      "A five-step project brief that is reviewed before any scope is confirmed.",
    ),
    "",
    "## Services",
    "",
    ...services.map((service) =>
      link(
        service.title,
        `/services/${service.slug}`,
        service.valueProposition,
      ),
    ),
    "",
    "## Packages",
    "",
    ...allPackages.map((websitePackage) =>
      link(
        `${websitePackage.name} — ${websitePackage.price}`,
        websitePackage.href,
        `${websitePackage.tagline} The listed amount is a starting price billed ${websitePackage.priceSuffix}.`,
      ),
    ),
    "",
    "## Policies and contact",
    "",
    link(
      "Contact",
      "/contact",
      `Email ${siteConfig.contact.email.value} or use the project enquiry form.`,
    ),
    link(
      "Privacy Policy",
      "/privacy-policy",
      "How enquiry, security, attribution, consent, and optional analytics information is handled.",
    ),
    link(
      "Terms of Service",
      "/terms-and-conditions",
      "General website and service-enquiry terms.",
    ),
    link(
      "Refund and Cancellation Policy",
      "/refund-cancellation-policy",
      "General cancellation and refund review principles.",
    ),
    link(
      "Cookie Policy",
      "/cookie-policy",
      "Necessary storage, visitor choices, attribution, and consent-controlled technologies.",
    ),
    "",
    "## Optional",
    "",
    link(
      "Expanded website information",
      "/llms-full.txt",
      "A longer factual reference covering services, packages, industries, process, FAQs, contact, and policy links.",
    ),
    "",
  ].join("\n");
}

export function createLlmsFullTxt() {
  return [
    `# ${SITE_NAME}: expanded website information`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Identity and source-of-truth notes",
    "",
    `- ${BRAND_DISCLOSURE}`,
    `- Brand slogan: ${SITE_SLOGAN}`,
    "- Service area: United States.",
    `- Contact email: ${siteConfig.contact.email.value}`,
    `- Contact phone: ${siteConfig.contact.phone.value}`,
    "- Portfolio images are design concepts used to demonstrate possible layout direction. They are not presented as completed client projects or verified performance case studies.",
    "- The website does not claim guaranteed rankings, traffic, leads, revenue, launch dates, uptime, or third-party approval.",
    "- Package prices are starting one-time project fees. The written proposal controls final scope, exclusions, responsibilities, third-party costs, timing, and payment terms.",
    "",
    "## Website services",
    "",
    ...services.flatMap((service) => [
      `### ${service.title}`,
      "",
      `${service.valueProposition}`,
      "",
      `Page: ${absoluteUrl(`/services/${service.slug}`)}`,
      "",
      "Typical scope items:",
      ...service.includes.map((item) => `- ${item}`),
      "",
      "Commonly suited to:",
      ...service.forWho.map((item) => `- ${item}`),
      "",
    ]),
    "## Service packages",
    "",
    ...allPackages.flatMap((websitePackage) => [
      `### ${websitePackage.name} — ${websitePackage.price} ${websitePackage.priceSuffix}`,
      "",
      websitePackage.description,
      "",
      `Page: ${absoluteUrl(websitePackage.href)}`,
      "",
      "Core listed features:",
      ...websitePackage.features.map((feature) => `- ${feature}`),
      "",
      "Important scope notes:",
      ...websitePackage.scopeNotes.map((note) => `- ${note}`),
      "",
    ]),
    "## Industries represented in the website planning flow",
    "",
    ...industries.map(
      (industry) =>
        `- **${industry.title}:** ${industry.description} ${industry.websiteFocus}`,
    ),
    "",
    "These industry selections help organize a project brief. They do not represent separate location pages, guaranteed specialization, or a list of completed clients.",
    "",
    "## Platform decision guide",
    "",
    ...platforms.flatMap((platform) => [
      `### ${platform.name}`,
      "",
      platform.bestFor,
      `- Category: ${platform.category}`,
      `- Strengths: ${platform.strengths.join("; ")}`,
      `- Planning consideration: ${platform.considerations.join("; ")}`,
      "",
    ]),
    "## Typical package-to-launch process",
    "",
    ...packageProcess.map(
      ([title, description], index) =>
        `${index + 1}. **${title}:** ${description}`,
    ),
    "",
    "## Frequently asked questions",
    "",
    ...featuredFaqs.flatMap(({ question, answer }) => [
      `### ${question}`,
      "",
      answer,
      "",
    ]),
    "## Key website pages",
    "",
    link(
      "Home",
      "/",
      "Overview of the brand, process, industries, design concepts, packages, and enquiry path.",
    ),
    link(
      "Services",
      "/services",
      "Directory of all website-related services.",
    ),
    link(
      "Packages",
      "/packages",
      "Package comparison, inclusions, optional services, process, and FAQs.",
    ),
    link(
      "Portfolio",
      "/portfolio",
      "Clearly labelled design concepts for several business categories.",
    ),
    link(
      "About",
      "/about",
      "Brand story, principles, process, and legal ownership relationship.",
    ),
    link(
      "FAQ",
      "/faq",
      "Detailed answers about packages, process, content, development, support, and marketing.",
    ),
    link(
      "Contact",
      "/contact",
      "Contact details, enquiry form, and project-start expectations.",
    ),
    link(
      "Get started",
      "/get-started",
      "Guided project-brief and quote-request flow.",
    ),
    "",
    "## Policies",
    "",
    link(
      "Privacy Policy",
      "/privacy-policy",
      "Enquiry processing, security, consent, attribution, service providers, retention, and visitor choices.",
    ),
    link(
      "Terms of Service",
      "/terms-and-conditions",
      "General website terms and the role of written project agreements.",
    ),
    link(
      "Refund and Cancellation Policy",
      "/refund-cancellation-policy",
      "General review principles subject to written project terms.",
    ),
    link(
      "Cookie Policy",
      "/cookie-policy",
      "Necessary storage, consent preferences, session attribution, and optional technologies.",
    ),
    "",
  ].join("\n");
}
