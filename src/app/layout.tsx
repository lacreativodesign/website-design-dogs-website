import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { PageViewTracker } from "@/components/consent/page-view-tracker";
import { RouteFooter } from "@/components/layout/route-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { rootMetadata } from "@/lib/metadata";
import { bodyFont, headingFont } from "@/lib/fonts";

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#061529",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <Script id="wdd-consent-default" strategy="beforeInteractive">
          {
            "window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',personalization_storage:'denied'});"
          }
        </Script>
      </head>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <ConsentProvider>
          <PageViewTracker />
          <SiteJsonLd />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <RouteFooter />
        </ConsentProvider>
      </body>
    </html>
  );
}
