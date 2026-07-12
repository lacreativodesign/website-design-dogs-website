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
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Website Design Dogs | Professional Website Design",
    description: SITE_DESCRIPTION,
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
