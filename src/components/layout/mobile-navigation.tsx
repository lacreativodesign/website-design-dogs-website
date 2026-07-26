"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icon";
import { siteConfig } from "@/content/site";
import { BrandLogo } from "./brand-logo";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeAndReturnFocus = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const closeWithoutFocusReturn = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAndReturnFocus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("nav-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  return (
    <div className="mobile-nav lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="icon-button"
        aria-label="Open main menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      {open ? (
        <>
          <button className="mobile-nav__overlay" aria-label="Close main menu" onClick={closeAndReturnFocus} />
          <aside id="mobile-navigation" className="mobile-nav__panel" aria-label="Mobile main navigation">
            <div className="flex items-center justify-between gap-4">
              <BrandLogo />
              <button type="button" className="icon-button" aria-label="Close main menu" onClick={closeAndReturnFocus}>
                <CloseIcon />
              </button>
            </div>
            <nav className="mt-8 grid gap-2" aria-label="Mobile primary navigation">
              {siteConfig.primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav__link"
                  aria-current={pathname === item.href || (item.href === "/services" && pathname.startsWith("/services/")) ? "page" : undefined}
                  onClick={closeWithoutFocusReturn}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button href={siteConfig.primaryCta.href} className="mt-6" fullWidthMobile onClick={closeWithoutFocusReturn}>
              {siteConfig.primaryCta.label}
            </Button>
          </aside>
        </>
      ) : null}
    </div>
  );
}
