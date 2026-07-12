import type { Metadata } from "next";
import { LEGAL_OWNER, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Website Design Dogs | Professional Website Design",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: LEGAL_OWNER }],
  creator: LEGAL_OWNER,
  publisher: LEGAL_OWNER,
  icons: {
    icon: [
      { url: "/brand/favicons/favicon.ico" },
      { url: "/brand/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicons/favicon-180x180.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/brand/favicons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/brand/favicons/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Website Design Dogs | Professional Website Design",
    description: SITE_DESCRIPTION,
    images: [{ url: "/brand/og/website-design-dogs-dark.webp", width: 1200, height: 630, alt: SITE_NAME }],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  // TODO(seo): Enable indexing during the SEO launch prompt after final content,
  // legal pages, analytics, and production metadata are approved.
};
