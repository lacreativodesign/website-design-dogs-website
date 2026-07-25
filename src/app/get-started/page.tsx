import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/pages/page-hero";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { DEFAULT_SERVICE_SLUG, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Get a Free Website Quote", description: "Tell Website Design Dogs about your business, current website, goals, scope, preferred package, budget, and timeline.", path: "/get-started" });

type SearchParams = Record<string, string | string[] | undefined>;
type PageProps = { searchParams: Promise<SearchParams> };

function toUrlSearchParams(searchParams: SearchParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") params.set(key, value);
    else if (Array.isArray(value)) for (const item of value) params.append(key, item);
  }
  return params;
}

function hasInvalidServiceValue(value: SearchParams["service"]) {
  if (typeof value === "string") return value.length > 0 && !serviceBySlug.has(value);
  return Array.isArray(value) && value.some((item) => item.length > 0);
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  if (hasInvalidServiceValue(params.service)) {
    const canonicalParams = toUrlSearchParams(params);
    canonicalParams.set("service", DEFAULT_SERVICE_SLUG);
    redirect(`/get-started?${canonicalParams.toString()}`);
  }
  const requestedPackage = typeof params.package === "string" ? params.package : "";
  const requestedService = typeof params.service === "string" ? params.service : "";

  return <><PageHero eyebrow="START YOUR PROJECT" title="Tell us what you’re building." body="The more context you provide, the easier it is to understand your goals, recommend the right starting point, and prepare a clear project scope." darkSrc="/brand/scenes/contact-hero-dark.webp" lightSrc="/brand/scenes/contact-hero-light.webp" alt="Website Design Dogs quote request scene"/><Section alternate><Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]"><div><SectionHeading eyebrow="FREE QUOTE" title="Five focused steps.">Share the essentials so the project scope, timing, and next steps can be reviewed clearly.</SectionHeading></div><Card><QuoteForm requestedPackage={requestedPackage} requestedService={requestedService}/></Card></Container></Section></>;
}
