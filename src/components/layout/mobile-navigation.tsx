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
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) =>
    pathname === href ||
    (href === "/services" && pathname.startsWith("/services/")) ||
    (href === "/packages" && pathname.startsWith("/packages/"));

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
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("nav-open");
    closeButtonRef.current?.focus();

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
          <button
            type="button"
            className="mobile-nav__overlay"
            aria-label="Close main menu"
            onClick={closeAndReturnFocus}
          />
          <aside
            ref={panelRef}
            id="mobile-navigation"
            className="mobile-nav__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile main navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <BrandLogo />
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-button"
                aria-label="Close main menu"
                onClick={closeAndReturnFocus}
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="mt-8 grid gap-2" aria-label="Mobile primary navigation">
              {siteConfig.primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav__link"
                  aria-current={isActive(item.href) ? "page" : undefined}
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
