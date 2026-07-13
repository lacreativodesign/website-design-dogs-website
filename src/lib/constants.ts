import { BRAND_DISCLOSURE, LEGAL_OWNER, SITE_DESCRIPTION, SITE_FALLBACK_URL, SITE_NAME, SITE_SLOGAN, getSiteUrl } from "@/lib/site-config";
export { LEGAL_OWNER, SITE_DESCRIPTION, SITE_NAME, SITE_SLOGAN };
export const SITE_URL = getSiteUrl();
export const BRAND_RELATIONSHIP = BRAND_DISCLOSURE;
export const BRAND_COLORS = { midnightNavy: "#0B1F3A", electricOrange: "#FF6A00", white: "#FFFFFF", cloudGray: "#F4F6F8", slate: "#222831" } as const;
export const DOCUMENTED_PRODUCTION_FALLBACK = SITE_FALLBACK_URL;
