import type { ServiceDetail } from "@/content/services";
import { absoluteUrl, getSiteUrl } from "@/lib/site-config";
import { JsonLd } from "./json-ld";

export function ServiceJsonLd({ service }: { service: ServiceDetail }) {
  const site = getSiteUrl();
  const url = absoluteUrl(`/services/${service.slug}`);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: service.title,
        serviceType: service.title,
        description: service.valueProposition,
        provider: { "@id": `${site}/#organization` },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        audience: service.forWho.map((audienceType) => ({
          "@type": "Audience",
          audienceType,
        })),
      }}
    />
  );
}
