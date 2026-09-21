import { services } from "@/content/services";

export const SERVICES = [
  ...services.map((service) => service.title),
  "New Website",
  "Website Redesign",
  "Campaign Landing Page",
  "AI or Workflow Integration",
  "Not Sure Yet",
] as const;

export const PROJECT_TYPES = [
  "New Website",
  "Website Redesign",
  "Campaign Landing Page",
  "Website Care",
  "AI or Workflow Integration",
  ...services.map((service) => service.title),
  "Not Sure Yet",
] as const;

export const FEATURES = [
  "Contact or quote form",
  "Online booking",
  "E-commerce",
  "Blog",
  "Portfolio",
  "Location pages",
  "CRM integration",
  "Email automation",
  "Analytics",
  "Payment integration",
  "Customer portal",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "Under $500",
  "$500–$999",
  "$1,000–$1,499",
  "$1,500–$2,499",
  "$2,500–$4,999",
  "$5,000–$12,499",
  "$12,500–$24,999",
  "$25,000+",
  "Monthly service budget",
  "Not Sure Yet",
] as const;

export const TIMINGS = ["As soon as practical", "Within 30 days", "Within 60 days", "Within 90 days", "Researching options"] as const;
export const PAGES = ["1–5 pages", "6–10 pages", "11–15 pages", "More than 15 pages", "Not sure yet"] as const;
export const CONTENT_STATUSES = ["Ready", "Needs organization", "Needs copywriting", "Not sure yet"] as const;
export const BRANDING_STATUSES = ["Brand materials ready", "Some materials ready", "Needs brand direction", "Not sure yet"] as const;
export const MAX_BODY_BYTES = 64 * 1024;
export const MIN_FORM_AGE_MS = 2500;
export const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

