"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandLogo } from "./brand-logo";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); buttonRef.current?.focus(); };
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); }; document.addEventListener("keydown", onKey); document.body.classList.add("nav-open"); return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("nav-open"); }; }, [open]);
  useEffect(() => setOpen(false), [pathname]);
  return <div className="mobile-nav lg:hidden"><button ref={buttonRef} type="button" className="icon-button" aria-label="Open main menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><MenuIcon /></button>{open ? <><button className="mobile-nav__overlay" aria-label="Close main menu" onClick={close} /><aside id="mobile-navigation" className="mobile-nav__panel" aria-label="Mobile main navigation"><div className="flex items-center justify-between gap-4"><BrandLogo /><button type="button" className="icon-button" aria-label="Close main menu" onClick={close}><CloseIcon /></button></div><nav className="mt-8 grid gap-2" aria-label="Mobile primary navigation">{siteConfig.primaryNav.map((item) => <Link key={item.href} href={item.href} className="mobile-nav__link" aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3"><span className="text-sm font-bold">Theme</span><ThemeToggle /></div><Button href={siteConfig.primaryCta.href} className="mt-6" fullWidthMobile>{siteConfig.primaryCta.label}</Button></aside></> : null}</div>;
}
