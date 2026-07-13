import type { MetadataRoute } from "next"; import { absoluteUrl, getSiteUrl } from "@/lib/site-config";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: absoluteUrl("/sitemap.xml"), host: getSiteUrl() }; }
