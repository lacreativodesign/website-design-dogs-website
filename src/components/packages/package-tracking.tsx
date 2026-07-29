"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking/events";

type Props = { href: string; children: React.ReactNode; slug: string; featured?: boolean };

export function PackagesViewTracker() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent("wdd_view_packages", { pagePath: "/packages", pageType: "packages" });
  }, []);
  return null;
}

export function PackageLeadButton({ href, children, slug }: Props) {
  return <Button href={href} variant="primary" className="pricing-card__button" onClick={() => trackEvent("wdd_select_package", { pagePath: "/packages", packageSlug: slug })}>{children}</Button>;
}
