import { siteConfig } from "@/content/site";
import {
  absoluteUrl,
  getSiteUrl,
  LEGAL_OWNER,
  LOGO_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SLOGAN,
} from "@/lib/site-config";
import { JsonLd } from "./json-ld";

export function SiteJsonLd() {
  const site = getSiteUrl();
  const organizationId = `${site}/#organization`;
  const websiteId = `${site}/#website`;
  const socialProfiles = [
    siteConfig.social.facebook.href,
    siteConfig.social.instagram.href,
  ].filter((href): href is string => Boolean(href));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: SITE_NAME,
            url: site,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(LOGO_PATH),
            },
            description: SITE_DESCRIPTION,
            slogan: SITE_SLOGAN,
            email: siteConfig.contact.email.value,
            telephone: siteConfig.contact.phone.e164,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Austin",
              addressRegion: "TX",
              postalCode: "78731",
              addressCountry: "US",
            },
            sameAs: socialProfiles,
            parentOrganization: {
              "@type": "Organization",
              name: LEGAL_OWNER,
              legalName: LEGAL_OWNER,
            },
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
            knowsAbout: [
              "Website design",
              "Website development",
              "E-commerce websites",
              "On-page SEO",
              "Website content",
              "Conversion optimization",
              "Website analytics",
              "Mobile app development",
              "Social media marketing",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales and project enquiries",
              email: siteConfig.contact.email.value,
              telephone: siteConfig.contact.phone.e164,
              areaServed: "US",
              availableLanguage: ["English"],
            },
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: SITE_NAME,
            url: site,
            description: SITE_DESCRIPTION,
            inLanguage: "en-US",
            publisher: { "@id": organizationId },
          },
        ],
      }}
    />
  );
}
