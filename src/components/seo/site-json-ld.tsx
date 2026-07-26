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

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          legalName: LEGAL_OWNER,
          url: site,
          logo: absoluteUrl(LOGO_PATH),
          description: SITE_DESCRIPTION,
          slogan: SITE_SLOGAN,
          email: siteConfig.contact.email.value,
          telephone: siteConfig.contact.phone.e164,
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
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: site,
          description: SITE_DESCRIPTION,
          publisher: { "@type": "Organization", name: SITE_NAME },
        },
      ]}
    />
  );
}
