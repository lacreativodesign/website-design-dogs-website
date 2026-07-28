import type { Metadata } from "next";
import {
  absoluteUrl,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site-config";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  image = OG_IMAGE_PATH,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const robots: Metadata["robots"] = noindex
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
    robots,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const defaultPageDescription = SITE_DESCRIPTION;
