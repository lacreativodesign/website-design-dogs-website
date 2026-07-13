import type { Metadata } from "next";
import { absoluteUrl, OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";
export function pageMetadata({ title, description, path, noindex = false, image = OG_IMAGE_PATH }: { title: string; description: string; path: string; noindex?: boolean; image?: string }): Metadata {
  const url = absoluteUrl(path); const imageUrl = absoluteUrl(image);
  return { title, description, alternates: { canonical: url }, robots: noindex ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true }, openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url, title, description, images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] }, twitter: { card: "summary_large_image", title, description, images: [imageUrl] } };
}
export const defaultPageDescription = SITE_DESCRIPTION;
