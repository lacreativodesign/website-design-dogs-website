"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandLogo } from "./brand-logo";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header"><div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-width)] items-center justify-between gap-5 px-5 sm:px-6 lg:px-8"><BrandLogo priority /><nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">{siteConfig.primaryNav.map((item) => <Link key={item.href} href={item.href} className="nav-link" aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><div className="hidden items-center gap-3 lg:flex"><ThemeToggle /><Button href={siteConfig.primaryCta.href} size="small">{siteConfig.primaryCta.label}</Button></div><MobileNavigation /></div></header>;
}
