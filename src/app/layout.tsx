import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RouteFooter } from "@/components/layout/route-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { rootMetadata } from "@/lib/metadata";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { PageViewTracker } from "@/components/consent/page-view-tracker";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import Script from "next/script";

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = { themeColor: [ { media: "(prefers-color-scheme: dark)", color: "#061529" }, { media: "(prefers-color-scheme: light)", color: "#F4F6F8" } ] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><ThemeScript /><Script id="wdd-consent-default" strategy="beforeInteractive">{"window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',personalization_storage:'denied'});"}</Script></head><body><ThemeProvider><ConsentProvider><PageViewTracker /><SiteJsonLd /><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content" className="site-main">{children}</main><RouteFooter /></ConsentProvider></ThemeProvider></body></html>;
}
