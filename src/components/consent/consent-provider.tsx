"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/tracking/events";
import { updateConsent } from "./consent-mode";
import { ConsentBanner } from "./consent-banner";
import { ConsentPreferencesDialog } from "./consent-preferences-dialog";
import { makeConsent, readConsent, writeConsent } from "./consent-storage";
import type { ConsentPreferences } from "./consent-types";
import { TrackingLoader } from "./tracking-loader";

export const ConsentContext = createContext<{ prefs: ConsentPreferences | null; setPrefs: (prefs: ConsentPreferences) => void }>({ prefs: null, setPrefs: () => undefined });

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const enabled = process.env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED !== "false";
  const [prefs, setPrefsState] = useState<ConsentPreferences | null>(null);
  const [dialog, setDialog] = useState(false);
  const [globalPrivacyControl] = useState(() => typeof navigator !== "undefined" && navigator.globalPrivacyControl === true);

  const setPrefs = useCallback((next: ConsentPreferences) => {
    writeConsent(next); setPrefsState(next); updateConsent(next);
    window.dispatchEvent(new CustomEvent("wdd:consent-updated", { detail: { analytics: next.analytics, marketing: next.marketing } }));
    trackEvent("wdd_consent_updated", { consentAnalytics: next.analytics, consentMarketing: next.marketing });
  }, []);

  useEffect(() => {
    const saved = readConsent();
    const gpc = navigator.globalPrivacyControl === true;
    if (saved) { queueMicrotask(() => setPrefsState(saved)); updateConsent(saved); return; }
    if (gpc) queueMicrotask(() => setPrefs(makeConsent(false, false, "rejected")));
  }, [setPrefs]);

  useEffect(() => { const open = () => setDialog(true); window.addEventListener("wdd:open-consent-preferences", open); return () => window.removeEventListener("wdd:open-consent-preferences", open); }, []);

  const context = useMemo(() => ({ prefs, setPrefs }), [prefs, setPrefs]);
  return <ConsentContext.Provider value={context}>{children}<TrackingLoader prefs={prefs} />{enabled && !prefs ? <ConsentBanner onAccept={() => setPrefs(makeConsent(true, true, "accepted"))} onReject={() => setPrefs(makeConsent(false, false, "rejected"))} onSettings={() => setDialog(true)} /> : null}<ConsentPreferencesDialog open={dialog} prefs={prefs} globalPrivacyControl={globalPrivacyControl} onClose={() => setDialog(false)} onSave={(analytics, marketing) => { setPrefs(makeConsent(analytics, marketing, "customized")); setDialog(false); }} /></ConsentContext.Provider>;
}
