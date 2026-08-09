import type { MetadataRoute } from "next";
import { allPackages } from "@/content/packages";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/site-config";

const lastModified = "2026-08-09";

const routes = [
  ["/", "weekly", 1],
  ["/services", "monthly", 0.8],
  ["/platforms", "monthly", 0.7],
  ["/portfolio", "monthly", 0.7],
  ["/packages", "monthly", 0.8],
  ["/about", "monthly", 0.6],
  ["/contact", "yearly", 0.6],
  ["/faq", "monthly", 0.6],
  ["/get-started", "monthly", 0.7],
  ["/privacy-policy", "yearly", 0.3],
  ["/terms-and-conditions", "yearly", 0.3],
  ["/refund-cancellation-policy", "yearly", 0.3],
  ["/cookie-policy", "yearly", 0.3],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map(([path, changeFrequency, priority]) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...services.map(({ slug }) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...allPackages.map(({ href }) => ({
      url: absoluteUrl(href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
