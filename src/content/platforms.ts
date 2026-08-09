export type Platform = {
  slug: string;
  name: string;
  category: "Website & CMS" | "E-Commerce" | "Custom";
  bestFor: string;
  strengths: string[];
  considerations: string[];
};

export const platforms: Platform[] = [
  {
    slug: "wordpress",
    name: "WordPress",
    category: "Website & CMS",
    bestFor: "Content-rich business websites that need broad ownership and plugin flexibility.",
    strengths: ["Large ecosystem", "Flexible content management", "WooCommerce option"],
    considerations: ["Hosting, updates, plugin quality, and security responsibilities must be actively managed"],
  },
  {
    slug: "wix-studio",
    name: "Wix Studio",
    category: "Website & CMS",
    bestFor: "Managed business websites that prioritize visual editing and simpler platform operations.",
    strengths: ["Managed hosting", "Visual editing", "Integrated business tools"],
    considerations: ["Platform limits, app costs, and migration options should be reviewed before commitment"],
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "Website & CMS",
    bestFor: "Design-led marketing websites that need a managed visual CMS and polished interactions.",
    strengths: ["Visual control", "Managed hosting", "Structured CMS"],
    considerations: ["Editor workflows, localization, e-commerce limits, and plan costs vary by scope"],
  },
  {
    slug: "squarespace",
    name: "Squarespace",
    category: "Website & CMS",
    bestFor: "Focused service, hospitality, creative, and personal-brand websites on a managed platform.",
    strengths: ["Managed platform", "Simple editing", "Integrated scheduling and commerce options"],
    considerations: ["Advanced customization and complex integrations may require another platform"],
  },
  {
    slug: "shopify",
    name: "Shopify",
    category: "E-Commerce",
    bestFor: "Managed product commerce with a mature app, payment, and operations ecosystem.",
    strengths: ["Commerce-first platform", "Large integration ecosystem", "Managed infrastructure"],
    considerations: ["Subscription, theme, app, transaction, and customization costs must be included in planning"],
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "E-Commerce",
    bestFor: "WordPress-based stores that prioritize ownership, extensibility, and hosting choice.",
    strengths: ["Open-source foundation", "Deep WordPress integration", "Flexible catalog and extensions"],
    considerations: ["Hosting, updates, extensions, performance, backups, and security require active ownership"],
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    category: "E-Commerce",
    bestFor: "Growing or complex catalogs that need managed commerce and broader operational capabilities.",
    strengths: ["Managed commerce", "Multi-channel capabilities", "Headless options"],
    considerations: ["Plan thresholds, app costs, theme constraints, and integration needs should be modeled"],
  },
  {
    slug: "wix-ecommerce",
    name: "Wix eCommerce",
    category: "E-Commerce",
    bestFor: "Smaller stores that want a managed visual website and commerce experience in one platform.",
    strengths: ["Managed setup", "Visual editing", "Integrated business tools"],
    considerations: ["Catalog, fulfillment, integration, and scaling requirements should be validated early"],
  },
  {
    slug: "squarespace-commerce",
    name: "Squarespace Commerce",
    category: "E-Commerce",
    bestFor: "Focused catalogs, hospitality, creative products, and service-plus-commerce websites.",
    strengths: ["Unified managed platform", "Strong visual presentation", "Simple catalog operations"],
    considerations: ["Complex inventory, international, B2B, and integration needs may require another option"],
  },
  {
    slug: "nextjs",
    name: "Custom Next.js",
    category: "Custom",
    bestFor: "High-performance custom marketing sites, portals, and web experiences with unique requirements.",
    strengths: ["Full implementation control", "Strong performance potential", "Custom integrations and workflows"],
    considerations: ["Requires ongoing technical ownership, deployment, maintenance, and a justified custom scope"],
  },
  {
    slug: "headless-commerce",
    name: "Headless Commerce",
    category: "Custom",
    bestFor: "Qualified projects that need a custom front end across a mature commerce backend.",
    strengths: ["Experience flexibility", "Multi-channel architecture", "Custom performance strategy"],
    considerations: ["Higher build, integration, testing, maintenance, and operational complexity"],
  },
];

export const platformPreferenceOptions = [
  "Help me choose",
  "WordPress",
  "Wix Studio",
  "Webflow",
  "Squarespace",
  "Shopify",
  "WooCommerce",
  "BigCommerce",
  "Wix eCommerce",
  "Squarespace Commerce",
  "Custom Next.js",
  "Headless / custom commerce",
  "Another platform",
] as const;

export const platformPrinciples = [
  ["Ownership first", "The business should understand and control its domain, platform, data, billing, and critical accounts."],
  ["Fit before familiarity", "We recommend against forcing a familiar tool onto requirements it does not serve well."],
  ["Total cost visibility", "Subscriptions, apps, themes, plugins, processors, hosting, and maintenance belong in the decision."],
  ["Migration reality", "Content, catalog, customer, order, URL, and integration migration must be assessed before promises are made."],
] as const;

