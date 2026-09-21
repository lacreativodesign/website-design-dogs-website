import {
  packageBySlug,
  type Package,
  type PackageCategorySlug,
} from "@/content/packages";

export type PrimaryProjectType = PackageCategorySlug | "not-sure";

export type RecommendationScope = {
  size: string;
  complexity: string;
};

export type RecommendationInput = {
  primaryType: PrimaryProjectType;
  scope: RecommendationScope;
  platform?: string;
};

export type PackageRecommendation = {
  packageSlug: string | null;
  title: string;
  reason: string;
  custom: boolean;
};

type ScopeOption = {
  value: string;
  label: string;
};

type ScopeQuestion = {
  sizeLabel: string;
  sizeOptions: readonly ScopeOption[];
  complexityLabel: string;
  complexityOptions: readonly ScopeOption[];
};

export const primaryProjectOptions: readonly {
  value: PrimaryProjectType;
  label: string;
  description: string;
}[] = [
  {
    value: "website-design",
    label: "Website Design & Development",
    description: "New websites, redesigns, landing pages, and marketing-site builds.",
  },
  {
    value: "e-commerce",
    label: "E-Commerce",
    description: "Shopify, WooCommerce, BigCommerce, and other online stores.",
  },
  {
    value: "seo-local",
    label: "SEO & Local Optimization",
    description: "Technical, on-page, local, content, and GEO foundations.",
  },
  {
    value: "social-media",
    label: "Social Media Marketing",
    description: "Organic social, Meta campaigns, creative, and reporting.",
  },
  {
    value: "website-care",
    label: "Website Care",
    description: "Maintenance, monitoring, updates, and support.",
  },
  {
    value: "mobile-apps",
    label: "Mobile App Development",
    description: "Product blueprint, MVP, or a more complex mobile application.",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
    description: "Tell us what you are trying to accomplish and we will help route it.",
  },
] as const;

export const additionalNeedOptions = [
  "Campaign Landing Page",
  "Website Development",
  "Custom Website Design",
  "Content & Copywriting",
  "Conversion Optimization",
  "Analytics & Reporting",
  "AI or Workflow Integration",
  "Email Automation",
  "CRM Integration",
  "Online Booking",
] as const;

export const scopeQuestions: Record<
  Exclude<PrimaryProjectType, "not-sure">,
  ScopeQuestion
> = {
  "website-design": {
    sizeLabel: "Approximate website size",
    sizeOptions: [
      { value: "web-pages-1-5", label: "1–5 pages" },
      { value: "web-pages-6-7", label: "6–7 pages" },
      { value: "web-pages-8-10", label: "8–10 pages" },
      { value: "web-pages-11-15", label: "11–15 pages" },
      { value: "web-pages-16-20", label: "16–20 pages" },
      { value: "web-pages-21-30", label: "21–30 pages" },
      { value: "web-pages-30-plus", label: "More than 30 pages" },
      { value: "web-pages-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "Forms, embeds, or standard integrations",
    complexityOptions: [
      { value: "web-integrations-1", label: "1" },
      { value: "web-integrations-2", label: "Up to 2" },
      { value: "web-integrations-3", label: "Up to 3" },
      { value: "web-integrations-5", label: "Up to 5" },
      { value: "web-integrations-7", label: "Up to 7" },
      { value: "web-integrations-10", label: "Up to 10" },
      {
        value: "web-integrations-custom",
        label: "More than 10 or custom/authenticated functionality",
      },
      { value: "web-integrations-unsure", label: "Not sure yet" },
    ],
  },
  "e-commerce": {
    sizeLabel: "Approximate product catalog",
    sizeOptions: [
      { value: "commerce-products-15", label: "Up to 15 products" },
      { value: "commerce-products-50", label: "Up to 50 products" },
      { value: "commerce-products-100", label: "Up to 100 products" },
      { value: "commerce-products-100-plus", label: "More than 100 products" },
      { value: "commerce-products-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "Commerce complexity",
    complexityOptions: [
      {
        value: "commerce-standard",
        label: "Standard storefront, checkout, shipping, tax, and one payment method",
      },
      {
        value: "commerce-growth",
        label: "Growing store with up to 2 payment or operational integrations",
      },
      {
        value: "commerce-pro",
        label: "Advanced store with up to 4 standard integrations",
      },
      {
        value: "commerce-custom",
        label: "Subscriptions, marketplace, multi-vendor, custom ERP, or custom/headless workflows",
      },
      { value: "commerce-unsure", label: "Not sure yet" },
    ],
  },
  "seo-local": {
    sizeLabel: "Priority pages to optimize",
    sizeOptions: [
      { value: "seo-pages-5", label: "Up to 5 priority pages" },
      { value: "seo-pages-10", label: "Up to 10 priority pages" },
      { value: "seo-pages-20", label: "Up to 20 priority pages" },
      { value: "seo-pages-20-plus", label: "More than 20 priority pages" },
      { value: "seo-pages-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "Search scope",
    complexityOptions: [
      {
        value: "seo-single-market",
        label: "One website and one primary local/service market",
      },
      {
        value: "seo-growing",
        label: "Several services or a growing local/regional presence",
      },
      {
        value: "seo-authority",
        label: "Competitive multi-service or broader regional SEO/GEO program",
      },
      {
        value: "seo-custom",
        label: "Multiple markets, large content operation, or major technical rebuild",
      },
      { value: "seo-unsure", label: "Not sure yet" },
    ],
  },
  "social-media": {
    sizeLabel: "Monthly content level",
    sizeOptions: [
      { value: "social-foundation", label: "About 8 feed posts" },
      {
        value: "social-growth",
        label: "About 12 feed posts plus story support",
      },
      {
        value: "social-scale",
        label: "About 16 feed posts, stories, and short-form video support",
      },
      {
        value: "social-custom",
        label: "Higher-volume content or broader channel/production needs",
      },
      { value: "social-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "Paid social requirement",
    complexityOptions: [
      { value: "social-organic", label: "Organic social only" },
      { value: "social-one-campaign", label: "Manage 1 Meta campaign" },
      { value: "social-three-campaigns", label: "Manage up to 3 Meta campaigns" },
      {
        value: "social-paid-custom",
        label: "More than 3 campaigns, multiple ad accounts, or substantial production",
      },
      { value: "social-paid-unsure", label: "Not sure yet" },
    ],
  },
  "website-care": {
    sizeLabel: "Monthly update allowance needed",
    sizeOptions: [
      { value: "care-30", label: "Up to 30 minutes" },
      { value: "care-90", label: "Up to 90 minutes" },
      { value: "care-180", label: "Up to 3 hours" },
      { value: "care-180-plus", label: "More than 3 hours" },
      { value: "care-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "Support cadence",
    complexityOptions: [
      { value: "care-monthly", label: "Monthly review" },
      { value: "care-twice-monthly", label: "Twice-monthly review" },
      { value: "care-weekly", label: "Weekly review / priority queue" },
      {
        value: "care-emergency",
        label: "24/7, emergency-response, or unusually high operational dependency",
      },
      { value: "care-cadence-unsure", label: "Not sure yet" },
    ],
  },
  "mobile-apps": {
    sizeLabel: "Product stage",
    sizeOptions: [
      {
        value: "app-blueprint",
        label: "Idea/discovery stage — need flows, UX, prototype, and technical blueprint",
      },
      {
        value: "app-mvp",
        label: "Validated concept — ready for a focused launch MVP",
      },
      {
        value: "app-growth",
        label: "Validated product — needs a broader growth build",
      },
      {
        value: "app-custom",
        label: "Large or highly specialized mobile product",
      },
      { value: "app-stage-unsure", label: "Not sure yet" },
    ],
    complexityLabel: "App complexity",
    complexityOptions: [
      {
        value: "app-prototype-only",
        label: "Prototype / blueprint only, no production app yet",
      },
      {
        value: "app-focused",
        label: "Up to 15 primary screens, one core role/journey, one standard integration",
      },
      {
        value: "app-complex",
        label: "Up to 30 primary screens, multiple roles, admin, and up to 3 integrations",
      },
      {
        value: "app-advanced",
        label: "More than 30 screens or advanced native/offline/marketplace/custom requirements",
      },
      { value: "app-complexity-unsure", label: "Not sure yet" },
    ],
  },
};

const websiteTiers = [
  "starter",
  "essentials",
  "business",
  "professional",
  "growth",
  "premium",
] as const;

function packageResult(
  slug: string,
  reason: string,
): PackageRecommendation {
  const item = packageBySlug.get(slug);
  if (!item) {
    return {
      packageSlug: null,
      title: "Custom Scope",
      reason: "We need to review the scope before recommending a package.",
      custom: true,
    };
  }
  return {
    packageSlug: item.slug,
    title: item.name,
    reason,
    custom: false,
  };
}

function custom(reason: string): PackageRecommendation {
  return {
    packageSlug: null,
    title: "Custom Scope",
    reason,
    custom: true,
  };
}

function unsure(reason: string): PackageRecommendation {
  return {
    packageSlug: "not-sure",
    title: "Not sure yet",
    reason,
    custom: false,
  };
}

function maxTier(indexes: number[]) {
  return Math.max(...indexes.filter((value) => Number.isFinite(value)), 0);
}

function websiteTier(scope: RecommendationScope) {
  const size = new Map<string, number>([
    ["web-pages-1-5", 0],
    ["web-pages-6-7", 1],
    ["web-pages-8-10", 2],
    ["web-pages-11-15", 3],
    ["web-pages-16-20", 4],
    ["web-pages-21-30", 5],
  ]);
  const complexity = new Map<string, number>([
    ["web-integrations-1", 0],
    ["web-integrations-2", 1],
    ["web-integrations-3", 2],
    ["web-integrations-5", 3],
    ["web-integrations-7", 4],
    ["web-integrations-10", 5],
  ]);

  if (
    scope.size === "web-pages-30-plus" ||
    scope.complexity === "web-integrations-custom"
  ) {
    return custom(
      "The requested page count or custom/authenticated functionality exceeds the published website-package limits, so a scoped estimate is safer.",
    );
  }
  if (
    scope.size === "web-pages-unsure" ||
    scope.complexity === "web-integrations-unsure"
  ) {
    return unsure(
      "We need the approximate page count and integration level before choosing a website tier responsibly.",
    );
  }

  const tier = maxTier([
    size.get(scope.size) ?? 0,
    complexity.get(scope.complexity) ?? 0,
  ]);
  const slug = websiteTiers[tier]!;
  return packageResult(
    slug,
    `This tier matches the larger of your page-count and forms/integration requirements, using the published limits of the ${packageBySlug.get(slug)?.name ?? "website"} package.`,
  );
}

function ecommerceTier(scope: RecommendationScope, platform?: string) {
  if (
    scope.size === "commerce-products-100-plus" ||
    scope.complexity === "commerce-custom" ||
    platform === "Headless / custom commerce"
  ) {
    return custom(
      "The catalog size or advanced commerce workflow exceeds the packaged Commerce Pro limits and needs a scoped estimate.",
    );
  }
  if (
    scope.size === "commerce-products-unsure" ||
    scope.complexity === "commerce-unsure"
  ) {
    return unsure(
      "We need the approximate catalog size and commerce complexity before choosing a store package responsibly.",
    );
  }

  const sizeTier = new Map<string, number>([
    ["commerce-products-15", 0],
    ["commerce-products-50", 1],
    ["commerce-products-100", 2],
  ]);
  const complexityTier = new Map<string, number>([
    ["commerce-standard", 0],
    ["commerce-growth", 1],
    ["commerce-pro", 2],
  ]);
  const tier = maxTier([
    sizeTier.get(scope.size) ?? 0,
    complexityTier.get(scope.complexity) ?? 0,
  ]);
  const slug = ["commerce-launch", "commerce-growth", "commerce-pro"][tier]!;
  const platformNote = platform && platform !== "Help me choose"
    ? ` The selected platform (${platform}) is treated as a platform preference, not a reason to force a custom package.`
    : "";
  return packageResult(
    slug,
    `The recommendation follows the published product-count and integration limits for WDD commerce packages.${platformNote}`,
  );
}

function seoTier(scope: RecommendationScope) {
  if (
    scope.size === "seo-pages-20-plus" ||
    scope.complexity === "seo-custom"
  ) {
    return custom(
      "The number of priority pages or multi-market/technical scope exceeds the published SEO Authority capacity.",
    );
  }
  if (
    scope.size === "seo-pages-unsure" ||
    scope.complexity === "seo-unsure"
  ) {
    return unsure(
      "We need the approximate number of priority pages and market scope before choosing an SEO tier.",
    );
  }
  const sizeTier = new Map<string, number>([
    ["seo-pages-5", 0],
    ["seo-pages-10", 1],
    ["seo-pages-20", 2],
  ]);
  const complexityTier = new Map<string, number>([
    ["seo-single-market", 0],
    ["seo-growing", 1],
    ["seo-authority", 2],
  ]);
  const tier = maxTier([
    sizeTier.get(scope.size) ?? 0,
    complexityTier.get(scope.complexity) ?? 0,
  ]);
  const slug = ["seo-launch", "seo-growth", "seo-authority"][tier]!;
  return packageResult(
    slug,
    "This tier matches the larger of your priority-page count and market/competitive scope using WDD's published SEO package limits.",
  );
}

function socialTier(scope: RecommendationScope) {
  if (
    scope.size === "social-custom" ||
    scope.complexity === "social-paid-custom"
  ) {
    return custom(
      "The requested content volume or paid-social management exceeds the published Social Scale capacity.",
    );
  }
  if (
    scope.size === "social-unsure" ||
    scope.complexity === "social-paid-unsure"
  ) {
    return unsure(
      "We need the approximate monthly content volume and paid-media requirement before choosing a social package.",
    );
  }
  const contentTier = new Map<string, number>([
    ["social-foundation", 0],
    ["social-growth", 1],
    ["social-scale", 2],
  ]);
  const paidTier = new Map<string, number>([
    ["social-organic", 0],
    ["social-one-campaign", 1],
    ["social-three-campaigns", 2],
  ]);
  const tier = maxTier([
    contentTier.get(scope.size) ?? 0,
    paidTier.get(scope.complexity) ?? 0,
  ]);
  const slug = ["social-foundation", "social-growth", "social-scale"][tier]!;
  return packageResult(
    slug,
    "This tier matches the larger of your monthly content and Meta campaign-management requirements using the published WDD social package limits.",
  );
}

function careTier(scope: RecommendationScope) {
  if (
    scope.size === "care-180-plus" ||
    scope.complexity === "care-emergency"
  ) {
    return custom(
      "The requested monthly update capacity or emergency-response requirement exceeds the published Priority Care scope.",
    );
  }
  if (
    scope.size === "care-unsure" ||
    scope.complexity === "care-cadence-unsure"
  ) {
    return unsure(
      "We need the approximate update allowance and support cadence before choosing a care plan.",
    );
  }
  const timeTier = new Map<string, number>([
    ["care-30", 0],
    ["care-90", 1],
    ["care-180", 2],
  ]);
  const cadenceTier = new Map<string, number>([
    ["care-monthly", 0],
    ["care-twice-monthly", 1],
    ["care-weekly", 2],
  ]);
  const tier = maxTier([
    timeTier.get(scope.size) ?? 0,
    cadenceTier.get(scope.complexity) ?? 0,
  ]);
  const slug = ["care-essential", "care-business", "care-priority"][tier]!;
  return packageResult(
    slug,
    "This plan matches the larger of your update-time allowance and support-cadence needs using WDD's published care-plan limits.",
  );
}

function appTier(scope: RecommendationScope) {
  if (
    scope.size === "app-custom" ||
    scope.complexity === "app-advanced"
  ) {
    return custom(
      "The requested mobile scope exceeds the published Growth App limits and needs architecture-led scoping.",
    );
  }
  if (
    scope.size === "app-stage-unsure" ||
    scope.complexity === "app-complexity-unsure"
  ) {
    return unsure(
      "We need the product stage and approximate app complexity before choosing an app package.",
    );
  }

  const stageTier = new Map<string, number>([
    ["app-blueprint", 0],
    ["app-mvp", 1],
    ["app-growth", 2],
  ]);
  const complexityTier = new Map<string, number>([
    ["app-prototype-only", 0],
    ["app-focused", 1],
    ["app-complex", 2],
  ]);
  const tier = maxTier([
    stageTier.get(scope.size) ?? 0,
    complexityTier.get(scope.complexity) ?? 0,
  ]);
  const slug = ["app-blueprint", "app-launch-mvp", "app-growth"][tier]!;
  return packageResult(
    slug,
    "This package matches the larger of your current product stage and app complexity using WDD's published screen, role, and integration limits.",
  );
}

export function recommendPackage(
  input: RecommendationInput,
): PackageRecommendation {
  if (input.primaryType === "not-sure") {
    return unsure(
      "You are not locked into a package. WDD will review the brief and help identify the right starting point.",
    );
  }

  if (!input.scope.size || !input.scope.complexity) {
    return unsure(
      "Complete the two scope questions so WDD can recommend a package against the published limits.",
    );
  }

  switch (input.primaryType) {
    case "website-design":
      return websiteTier(input.scope);
    case "e-commerce":
      return ecommerceTier(input.scope, input.platform);
    case "seo-local":
      return seoTier(input.scope);
    case "social-media":
      return socialTier(input.scope);
    case "website-care":
      return careTier(input.scope);
    case "mobile-apps":
      return appTier(input.scope);
  }
}

export function getRecommendedPackage(
  recommendation: PackageRecommendation,
): Package | undefined {
  return recommendation.packageSlug
    ? packageBySlug.get(recommendation.packageSlug)
    : undefined;
}

export function primaryLabel(primaryType: PrimaryProjectType) {
  return (
    primaryProjectOptions.find((option) => option.value === primaryType)?.label ??
    "Not Sure Yet"
  );
}

export function scopeLabels(
  primaryType: PrimaryProjectType,
  scope: RecommendationScope,
) {
  if (primaryType === "not-sure") return [];

  const config = scopeQuestions[primaryType];
  const size = config.sizeOptions.find((option) => option.value === scope.size);
  const complexity = config.complexityOptions.find(
    (option) => option.value === scope.complexity,
  );

  return [
    ...(size ? [[config.sizeLabel, size.label] as const] : []),
    ...(complexity
      ? [[config.complexityLabel, complexity.label] as const]
      : []),
  ];
}
