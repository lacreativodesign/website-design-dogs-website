import type { Metadata } from "next";
import { TopLevelHero, ProofStrip, type ProofItem } from "@/components/pages/top-level-hero";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { WebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon, type BrandIconName } from "@/components/ui/icon";
import { NumberedSectionHeading } from "@/components/ui/numbered-section-heading";
import { illustrationScenes } from "@/content/illustrations";
import { platformPrinciples, platforms } from "@/content/platforms";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Website & E-Commerce Platforms",
  description: "Compare website, CMS, commerce, and custom platforms—including WordPress, GoDaddy, Duda, Framer, HubSpot, Shopify, and Next.js—by business fit.",
  path: "/platforms",
});

const proofItems: ProofItem[] = [
  { title: platformPrinciples[0][0], body: platformPrinciples[0][1], icon: "shield-check" },
  { title: platformPrinciples[1][0], body: platformPrinciples[1][1], icon: "search-check" },
  { title: platformPrinciples[2][0], body: platformPrinciples[2][1], icon: "clipboard-check" },
  { title: platformPrinciples[3][0], body: platformPrinciples[3][1], icon: "trending-up" },
];

const categories = ["Website & CMS", "E-Commerce", "Custom"] as const;
const categoryIcons: Record<(typeof categories)[number], BrandIconName> = {
  "Website & CMS": "globe-2",
  "E-Commerce": "shopping-cart",
  Custom: "blocks",
};

export default function PlatformsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Platforms", path: "/platforms" }]} />
      <WebPageJsonLd type="CollectionPage" name="Website & E-Commerce Platforms" description="A platform-fit guide covering managed websites, content systems, online stores, and justified custom builds." path="/platforms" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Supported website and commerce platforms",
        itemListElement: platforms.map((platform, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${absoluteUrl("/platforms")}#${platform.slug}`,
          name: platform.name,
          description: platform.bestFor,
        })),
      }} />

      <TopLevelHero
        id="platforms-page-title"
        eyebrow="Platform decision guide"
        title={<>Choose technology around the <em>business.</em></>}
        body="Editing, ownership, content, commerce, integrations, operating cost, and growth requirements should drive the platform—not familiarity alone."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Platforms" }]}
        scene={illustrationScenes.platforms}
        alt="Border collie digital strategist comparing website, commerce, and custom technology options"
        primaryCta={{ label: "Get a Platform Recommendation", href: "/get-started" }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
      />
      <ProofStrip label="Platform selection principles" items={proofItems} />

      {categories.map((category, categoryIndex) => (
        <section key={category} className={`platform-directory final-section${categoryIndex % 2 ? " final-section--alt" : ""}`} aria-labelledby={`platform-category-${categoryIndex}`}>
          <Container>
            <NumberedSectionHeading
              number={`0${categoryIndex + 1}`}
              eyebrow={category}
              id={`platform-category-${categoryIndex}`}
              title={category === "Website & CMS" ? "Managed and flexible website foundations." : category === "E-Commerce" ? "Store platforms for different operating realities." : "Custom technology when the requirements justify it."}
            />
            <div className="platform-card-grid">
              {platforms.filter((platform) => platform.category === category).map((platform) => (
                <article key={platform.slug} id={platform.slug}>
                  <div className="platform-card__header">
                    <span className="inner-card-icon"><BrandIcon name={categoryIcons[category]} /></span>
                    <div><p className="home-eyebrow">{platform.category}</p><h3>{platform.name}</h3></div>
                  </div>
                  <p>{platform.bestFor}</p>
                  <div>
                    <h4>Strengths</h4>
                    <ul>{platform.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <h4>Plan for</h4>
                    <ul>{platform.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="platform-decision-cta final-section decision-cta" aria-labelledby="platform-decision-title">
        <Container className="platform-decision-cta__panel decision-cta__panel">
          <div>
            <NumberedSectionHeading
              number="04"
              eyebrow="No forced platform"
              id="platform-decision-title"
              title="Bring the requirements. We’ll help evaluate the tradeoffs."
              description="Website Design Dogs does not claim platform partnerships or force every project into the same system. Final recommendations follow a requirements review."
            />
          </div>
          <Button href="/get-started" icon={<ArrowRightIcon />}>Build Your Project Brief</Button>
        </Container>
      </section>
    </>
  );
}
