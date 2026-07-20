"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking/events";

type Props = { onAccept: () => void; onReject: () => void; onSettings: () => void };

export function ConsentBanner({ onAccept, onReject, onSettings }: Props) {
  useEffect(() => trackEvent("wdd_consent_banner_viewed", {}), []);

  return <section className="consent-banner" role="region" aria-labelledby="privacy-choices-title">
    <div>
      <h2 id="privacy-choices-title">Privacy choices</h2>
      <p>We use necessary technologies to keep the site working. With your permission, we also use analytics and advertising technologies to measure performance and improve our marketing.</p>
    </div>
    <div className="consent-banner__actions">
      <button type="button" className="consent-button consent-button--neutral" onClick={onReject}>Reject optional</button>
      <button type="button" className="consent-button consent-button--neutral" onClick={onSettings}>Settings</button>
      <button type="button" className="consent-button consent-button--accent" onClick={onAccept}>Accept optional</button>
    </div>
  </section>;
}
