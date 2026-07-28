import type { Metadata } from "next";
import {
  absoluteUrl,
  getSiteUrl,
  isValidVerification,
  LEGAL_OWNER,
  OG_IMAGE_PATH,
  SITE_CATEGORY,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site-config";

const verification: NonNullable<Metadata["verification"]> = {};

if (isValidVerification(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)) {
  verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
}

if (isValidVerification(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION)) {
  verification.other = {
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  };
}

const other: Record<string, string> = { category: SITE_CATEGORY };

if (isValidVerification(process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION)) {
  other["facebook-domain-verification"] =
    process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION;
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "Website Design Dogs | Professional Website Design for Growing Businesses",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: getSiteUrl(),
    languages: { "en-US": getSiteUrl() },
  },
  authors: [{ name: LEGAL_OWNER }],
  creator: LEGAL_OWNER,
  publisher: LEGAL_OWNER,
  category: SITE_CATEGORY,
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  verification,
  other,
  icons: {
    icon: [
      { url: "/brand/favicons/favicon.ico" },
      {
        url: "/brand/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/brand/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/brand/favicons/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/brand/favicons/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/brand/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/brand/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Website Design Dogs | Professional Website Design for Growing Businesses",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Website Design Dogs | Professional Website Design for Growing Businesses",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(OG_IMAGE_PATH)],
  },
};
