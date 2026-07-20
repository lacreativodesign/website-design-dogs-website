"use client";

import { useEffect, useRef, useState } from "react";
import type { ConsentPreferences } from "./consent-types";

const focusable = 'button:not([disabled]), input:not([disabled])';

type Props = { open: boolean; prefs: ConsentPreferences | null; globalPrivacyControl: boolean; onClose: () => void; onSave: (analytics: boolean, marketing: boolean) => void };

export function ConsentPreferencesDialog({ open, prefs, globalPrivacyControl, onClose, onSave }: Props) {
  if (!open) return null;
  return <OpenDialog key={prefs?.updatedAt ?? "unset"} prefs={prefs} globalPrivacyControl={globalPrivacyControl} onClose={onClose} onSave={onSave} />;
}

function OpenDialog({ prefs, globalPrivacyControl, onClose, onSave }: Omit<Props, "open">) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [analytics, setAnalytics] = useState(Boolean(prefs?.analytics));
  const [marketing, setMarketing] = useState(Boolean(prefs?.marketing));

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>(focusable)?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab") return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusable) ?? []);
      if (!items.length) return;
      const first = items[0]; const last = items.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKeyDown); restoreFocusRef.current?.focus(); };
  }, [onClose]);
  return <div className="consent-dialog-backdrop" role="presentation">
    <div ref={dialogRef} className="consent-dialog" role="dialog" aria-modal="true" aria-labelledby="privacy-settings-title" aria-describedby="privacy-settings-description">
      <div className="consent-dialog__header"><div><h2 id="privacy-settings-title">Privacy choices</h2><p id="privacy-settings-description">Necessary technologies are always enabled. Choose whether optional categories may be used.</p></div><button type="button" className="consent-close" onClick={onClose} aria-label="Close privacy choices">×</button></div>
      {globalPrivacyControl ? <p className="consent-gpc-status" role="status">Global Privacy Control is enabled in your browser. Optional categories are currently denied.</p> : null}
      <div className="consent-categories">
        <label><span><strong>Necessary</strong><small>Required for security, forms, theme, and saving this preference.</small></span><input type="checkbox" checked readOnly aria-label="Necessary technologies always enabled" /></label>
        <label><span><strong>Analytics</strong><small>Measure site performance when you allow it.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} aria-label="Allow analytics" /></label>
        <label><span><strong>Advertising</strong><small>Allow advertising and remarketing technologies, including configured Meta tags.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-label="Allow advertising" /></label>
      </div>
      <div className="consent-dialog__actions"><button type="button" className="consent-button consent-button--neutral" onClick={onClose}>Close</button><button type="button" className="consent-button consent-button--accent" onClick={() => onSave(analytics, marketing)}>Save preferences</button></div>
    </div>
  </div>;
}
