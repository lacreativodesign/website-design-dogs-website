import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  type ConsentDecision,
  type ConsentPreferences,
} from "./consent-types";

export function makeConsent(
  analytics: boolean,
  marketing: boolean,
  decision: ConsentDecision = analytics && marketing ? "accepted" : !analytics && !marketing ? "rejected" : "customized",
): ConsentPreferences {
  return { version: CONSENT_VERSION, decision, necessary: true, analytics, marketing, updatedAt: new Date().toISOString() };
}

export function parseConsent(value: string | null | undefined): ConsentPreferences | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<ConsentPreferences>;
    const validDecision = parsed.decision === "accepted" || parsed.decision === "rejected" || parsed.decision === "customized";
    if (parsed.version !== CONSENT_VERSION || parsed.necessary !== true || typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean" || !validDecision || typeof parsed.updatedAt !== "string") return null;
    return { version: CONSENT_VERSION, decision: parsed.decision as ConsentDecision, necessary: true, analytics: parsed.analytics, marketing: parsed.marketing, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentPreferences | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_COOKIE_NAME}=`));
  return parseConsent(cookie?.slice(CONSENT_COOKIE_NAME.length + 1));
}

export function writeConsent(preferences: ConsentPreferences) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(preferences))}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}${secure}`;
}
