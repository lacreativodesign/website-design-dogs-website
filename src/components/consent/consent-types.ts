export type ConsentPreferences = { version: "1.0"; necessary: true; analytics: boolean; marketing: boolean; updatedAt: string };
export const CONSENT_VERSION = "1.0" as const; export const CONSENT_COOKIE_NAME = "wdd-consent-v1";
