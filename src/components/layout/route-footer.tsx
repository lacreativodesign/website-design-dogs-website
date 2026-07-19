"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";

export function RouteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/campaigns/")) {
    return null;
  }

  return <SiteFooter compact={pathname === "/services"} />;
}
