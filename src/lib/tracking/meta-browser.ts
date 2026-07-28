"use client";

import { readConsent } from "@/components/consent/consent-storage";
import type { MetaTrackingContext } from "@/lib/leads/types";

function readCookie(name: string) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));

  if (!cookie) return undefined;

  const value = cookie.slice(prefix.length);
  try {
    return decodeURIComponent(value).slice(0, 255);
  } catch {
    return value.slice(0, 255);
  }
}

export function getMetaTrackingContext(): MetaTrackingContext {
  if (typeof window === "undefined") {
    return { marketingConsent: false };
  }

  const marketingConsent = Boolean(readConsent()?.marketing);
  if (!marketingConsent) {
    return { marketingConsent: false };
  }

  return {
    marketingConsent: true,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    eventSourceUrl: `${window.location.origin}${window.location.pathname}`,
  };
}
