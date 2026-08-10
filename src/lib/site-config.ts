export const SITE_FALLBACK_URL = "https://www.websitedesigndogs.com";
export const SITE_NAME = "Website Design Dogs";
export const SITE_SLOGAN = "Loyal to the game.";
export const LEGAL_OWNER = "LA CREATIVO GROUP, LLC";
export const SITE_DESCRIPTION = "Website Design Dogs creates professional, mobile-ready websites for local and growing businesses, with clear packages, conversion-focused design, and dependable ongoing support.";
export const SITE_CATEGORY = "Website Design and Development";
export const BRAND_DISCLOSURE = `${SITE_NAME} is a service brand of ${LEGAL_OWNER}.`;
export const OG_IMAGE_PATH = "/brand/og/website-design-dogs-dark.webp";
export const LOGO_PATH = "/brand/logos/wdd-logo-mark.svg";
export function getSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  const raw = (value || SITE_FALLBACK_URL).trim().replace(/\/+$/, "");
  try { const url = new URL(raw); if (url.protocol !== "http:" && url.protocol !== "https:") return SITE_FALLBACK_URL; return url.toString().replace(/\/+$/, ""); } catch { return SITE_FALLBACK_URL; }
}
export function absoluteUrl(path = "/", base = getSiteUrl()): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath === "/" ? "" : cleanPath}`;
}
export function isValidVerification(value?: string): value is string { return Boolean(value && value.trim() && !value.includes("placeholder") && !value.includes("TODO")); }
export function isGtmEnabled(): boolean { return process.env.NEXT_PUBLIC_ENABLE_GTM === "true" && /^GTM-[A-Z0-9]{6,}$/.test(process.env.NEXT_PUBLIC_GTM_ID || ""); }
export function getGtmId(): string | null { return isGtmEnabled() ? process.env.NEXT_PUBLIC_GTM_ID || null : null; }
