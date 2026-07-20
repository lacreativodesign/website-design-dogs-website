"use client";
import Script from "next/script";
import { useEffect } from "react";
import { getGtmId } from "@/lib/site-config";
import type { ConsentPreferences } from "./consent-types";
import { ensureDataLayer, updateConsent } from "./consent-mode";

export function TrackingLoader({ prefs }: { prefs: ConsentPreferences | null }) {
  const id = getGtmId();
  const load = Boolean(id && prefs && (prefs.analytics || prefs.marketing));

  useEffect(() => { if (prefs) updateConsent(prefs); }, [prefs]);
  if (!id || !load) return null;

  return <Script id="wdd-gtm" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtm.js?id=${id}`} onLoad={() => { ensureDataLayer(); window.__wddGtmLoaded = true; window.dataLayer?.push({ event: "gtm.js", "gtm.start": Date.now() }); if (prefs) updateConsent(prefs); }} />;
}
