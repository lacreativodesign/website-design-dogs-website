import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/pages/page-hero";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { industryBySlug } from "@/content/industries";
import { illustrationScenes } from "@/content/illustrations";
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
  const requestedIndustry =
    typeof params.industry === "string"
      ? industryBySlug.get(params.industry)?.title ?? ""
      : "";

  return (
    <>
      <WebPageJsonLd
        name="Get a Free Website Quote"
        description="Tell Website Design Dogs about your business, current website, goals, scope, preferred package, budget, and timeline."
        path="/get-started"
      />
      <PageHero
        eyebrow="START YOUR PROJECT"
        title="Build your project brief."
        body="Five focused steps turn the essentials into a useful starting point—without pretending the scope is final before we review it."
        darkSrc={illustrationScenes.getStarted.desktop.webp}
        darkAvifSrc={illustrationScenes.getStarted.desktop.avif}
        tabletDarkSrc={illustrationScenes.getStarted.tablet.webp}
        tabletDarkAvifSrc={illustrationScenes.getStarted.tablet.avif}
        mobileDarkSrc={illustrationScenes.getStarted.mobile.webp}
        mobileDarkAvifSrc={illustrationScenes.getStarted.mobile.avif}
        alt="Border collie designer mapping a new website project at a studio planning board"
      />
      <Section alternate className="get-started-section">
        <Container>
          <div className="get-started-intro">
            <p className="home-eyebrow">Free project review</p>
            <h2>One clear decision at a time.</h2>
            <p>
              Add only what you know. Your answers remain visible as you go, and no
              details are submitted until you explicitly send the brief.
            </p>
          </div>
          <QuoteForm
            requestedPackage={requestedPackage}
            requestedService={requestedService}
            requestedIndustry={requestedIndustry}
          />
        </Container>
      </Section>
    </>
  );
}
