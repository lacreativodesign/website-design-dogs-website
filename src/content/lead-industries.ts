export const leadIndustryOptions = [
  "Home Services",
  "Construction & Contracting",
  "Roofing",
  "Plumbing",
  "HVAC",
  "Electrical",
  "Landscaping",
  "Real Estate",
  "Legal Services",
  "Healthcare",
  "Dental",
  "Health & Wellness",
  "Financial Services",
  "Accounting & Tax",
  "Insurance",
  "Automotive",
  "Restaurants & Hospitality",
  "Retail & E-Commerce",
  "Professional Services",
  "Technology / SaaS",
  "Marketing / Creative",
  "Education",
  "Nonprofit",
  "Manufacturing",
  "Logistics / Transportation",
  "Fitness / Wellness",
  "Beauty / Personal Care",
  "Creative Businesses",
  "Local Organizations",
  "Other",
] as const;

export type LeadIndustryOption = (typeof leadIndustryOptions)[number];

export function isLeadIndustryOption(value: string): value is LeadIndustryOption {
  return (leadIndustryOptions as readonly string[]).includes(value);
}
