import type { MetadataRoute } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SLOGAN,
} from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "WDD",
    description: `${SITE_DESCRIPTION} ${SITE_SLOGAN}`,
    start_url: "/",
    display: "standalone",
    background_color: "#061529",
    theme_color: "#f97316",
    lang: "en-US",
    categories: ["business", "design", "productivity"],
    icons: [
      {
        src: "/brand/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
