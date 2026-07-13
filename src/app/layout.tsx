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

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = { themeColor: [ { media: "(prefers-color-scheme: dark)", color: "#061529" }, { media: "(prefers-color-scheme: light)", color: "#F4F6F8" } ] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><ThemeScript /></head><body><ThemeProvider><ConsentProvider><PageViewTracker /><SiteJsonLd /><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content" className="site-main">{children}</main><RouteFooter /></ConsentProvider></ThemeProvider></body></html>;
}
