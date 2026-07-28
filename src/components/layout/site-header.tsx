"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isActive = (href: string) =>
    pathname === href ||
    (href === "/services" && pathname.startsWith("/services/")) ||
    (href === "/packages" && pathname.startsWith("/packages/"));

  return (
    <header className={isHome ? "site-header site-header--home" : "site-header"}>
      <div className="site-header__inner">
        <BrandLogo priority />
        <nav className="site-header__nav" aria-label="Primary navigation">
          {siteConfig.primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Button href={siteConfig.primaryCta.href} size="small">
            {siteConfig.primaryCta.label}
          </Button>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
