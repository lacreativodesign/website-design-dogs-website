import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignFaq } from "@/components/campaigns/campaign-faq";
import { CampaignLeadForm } from "@/components/campaigns/campaign-lead-form";
import {
  CampaignFooter,
  CampaignHeader,
  CampaignHero,
  Concept,
  FinalCta,
  MobileCta,
  Offer,
  Problem,
  ProcessWhy,
  Strategy,
} from "@/components/campaigns/campaign-components";
import { JsonLd } from "@/components/seo/json-ld";
import {
  campaigns,
  getCampaign,
  type CampaignSlug,
} from "@/content/campaigns";
import { absoluteUrl } from "@/lib/site-config";

type CampaignPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return campaigns.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);

  if (!campaign) {
    return {};
  }

  return {
    title: campaign.metadata.title,
    description: campaign.metadata.description,
    alternates: { canonical: absoluteUrl(campaign.path) },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: campaign.metadata.title,
      description: campaign.metadata.description,
      url: absoluteUrl(campaign.path),
      images: [
        {
          url: absoluteUrl(campaign.heroDark),
          width: 1200,
          height: 1200,
          alt: campaign.metadata.title,
        },
      ],
    },
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = getCampaign(slug);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="campaign-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: "Campaign Starter Website Offer",
          price: "249",
          priceCurrency: "USD",
          url: absoluteUrl(campaign.path),
          category: "Website design lead request",
          identifier: "WDD-CAMPAIGN-STARTER-249",
        }}
      />
      <CampaignHeader />
      <CampaignHero campaign={campaign} />
      <Problem campaign={campaign} />
      <Offer />
      <Strategy campaign={campaign} />
      <Concept campaign={campaign} />
      <ProcessWhy />
      <CampaignFaq />
      <CampaignLeadForm campaignSlug={campaign.slug as CampaignSlug} />
      <FinalCta />
      <CampaignFooter />
      <MobileCta />
    </div>
  );
}
