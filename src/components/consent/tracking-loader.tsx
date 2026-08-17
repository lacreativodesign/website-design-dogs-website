"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getGtmId } from "@/lib/site-config";
import { ensureDataLayer, updateConsent } from "./consent-mode";
import type { ConsentPreferences } from "./consent-types";

export function TrackingLoader({
  prefs,
}: {
  prefs: ConsentPreferences | null;
}) {
  const id = getGtmId();
  const load = Boolean(id && prefs && (prefs.analytics || prefs.marketing));
  const initialized = useRef(false);

  useEffect(() => {
    if (prefs) updateConsent(prefs);
  }, [prefs]);

  useEffect(() => {
    if (!load || initialized.current) return;

    ensureDataLayer();
    window.dataLayer?.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
    window.__wddGtmLoaded = true;
    initialized.current = true;
    window.dispatchEvent(new Event("wdd:gtm-ready"));
  }, [load]);

  if (!id || !load) return null;

  return (
    <Script
      id="wdd-gtm"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtm.js?id=${id}`}
      onLoad={() => {
        if (prefs) updateConsent(prefs);
      }}
    />
  );
}
