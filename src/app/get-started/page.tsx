import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuoteForm } from "@/components/forms/quote-form";
import { ProofStrip, TopLevelHero, type ProofItem } from "@/components/pages/top-level-hero";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { industryBySlug } from "@/content/industries";
import { illustrationScenes } from "@/content/illustrations";
import { DEFAULT_SERVICE_SLUG, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Get a Free Project Quote", description: "Tell Website Design Dogs about your business, project needs, budget, timing, and goals.", path: "/get-started" });

const projectBriefProof: ProofItem[] = [
  { title: "Four focused steps", body: "Business, project type, practical project details, and final context.", icon: "clipboard-check" },
  { title: "Nothing sent early", body: "Your details stay in the form until you explicitly submit the brief.", icon: "shield-check" },
  { title: "Preferences preserved", body: "Selected service, industry, and campaign context follow you here.", icon: "mouse-pointer-click" },
  { title: "Reviewed by our team", body: "Your request is reviewed before any scope, price, or commitment is confirmed.", icon: "heart-handshake" },
];

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
  const requestedService = typeof params.service === "string" ? params.service : "";
  const requestedIndustry =
    typeof params.industry === "string"
      ? industryBySlug.get(params.industry)?.title ?? ""
      : "";

  return (
    <>
      <WebPageJsonLd
        name="Get a Free Project Quote"
        description="Tell Website Design Dogs about your business, project needs, budget, timing, and goals."
        path="/get-started"
      />
      <TopLevelHero
        id="get-started-title"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Started" }]}
        eyebrow="START YOUR PROJECT"
        title={<>Build your <em>project brief.</em></>}
        body="Four simple steps collect the essentials we need to understand your request and prepare the right follow-up."
        scene={illustrationScenes.getStarted}
        alt="Border collie designer mapping a digital project at a studio planning board"
        primaryCta={{ label: "Start the Brief", href: "#project-brief" }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
      />
      <ProofStrip label="Project brief expectations" items={projectBriefProof} />
      <Section alternate className="get-started-section" id="project-brief">
        <Container>
          <div className="get-started-intro">
            <p className="home-eyebrow">Free project review</p>
            <h2>Simple, clear, and easy to complete.</h2>
            <p>
              Tell us what you need, what you already have, your timing, and your
              budget. Nothing is submitted until you explicitly send the request.
            </p>
          </div>
          <QuoteForm
            requestedService={requestedService}
            requestedIndustry={requestedIndustry}
          />
        </Container>
      </Section>
    </>
  );
}
