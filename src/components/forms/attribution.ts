import type { Attribution } from "@/lib/leads/types";

const storageKey = "wdd-attribution-v1";

function keep(value: string | null) {
  return value ? value.slice(0, 500) : undefined;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const currentPage = keep(
    `${window.location.origin}${window.location.pathname}${window.location.search}`,
  );
  const firstTouch: Attribution = {
    landingPage: currentPage,
    currentPage,
    referrer: keep(document.referrer),
    utmSource: keep(params.get("utm_source")),
    utmMedium: keep(params.get("utm_medium")),
    utmCampaign: keep(params.get("utm_campaign")),
    utmTerm: keep(params.get("utm_term")),
    utmContent: keep(params.get("utm_content")),
    fbclid: keep(params.get("fbclid")),
    gclid: keep(params.get("gclid")),
  };

  try {
    const stored = sessionStorage.getItem(storageKey);
    const first = stored
      ? (JSON.parse(stored) as Attribution)
      : firstTouch;

    if (!stored) {
      sessionStorage.setItem(storageKey, JSON.stringify(firstTouch));
    }

    return { ...first, currentPage };
  } catch {
    return firstTouch;
  }
}
