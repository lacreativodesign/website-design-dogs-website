"use client";
import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";

export function RouteFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/pixel-perfect-missing-page-test") return null;
  return <SiteFooter />;
}
