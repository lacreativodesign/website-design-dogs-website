export const CONSENT_VERSION = "2.0" as const;
export const CONSENT_COOKIE_NAME = "wdd-consent-v2";

export type ConsentDecision = "accepted" | "rejected" | "customized";

export type ConsentPreferences = {
  version: typeof CONSENT_VERSION;
  decision: ConsentDecision;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};
