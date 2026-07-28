import {
  absoluteUrl,
  getSiteUrl,
  OG_IMAGE_PATH,
  SITE_NAME,
} from "@/lib/site-config";
import { JsonLd } from "./json-ld";

type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage";

type Props = {
  type?: WebPageType;
  name: string;
  description: string;
  path: string;
};

export function WebPageJsonLd({
  type = "WebPage",
  name,
  description,
  path,
}: Props) {
  const site = getSiteUrl();
  const url = absoluteUrl(path);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(OG_IMAGE_PATH),
          caption: SITE_NAME,
        },
      }}
    />
  );
}
