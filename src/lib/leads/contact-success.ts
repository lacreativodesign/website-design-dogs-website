export const CONTACT_SUCCESS_STORAGE_KEY = "wdd-contact-success-v1";

export type ContactSuccessState = {
  eventId: string;
  formType: "contact";
  serviceSlug?: string;
  utmCampaign?: string;
};

export function storeContactSuccess(state: ContactSuccessState) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    CONTACT_SUCCESS_STORAGE_KEY,
    JSON.stringify(state),
  );
}

export function consumeContactSuccess(): ContactSuccessState | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(CONTACT_SUCCESS_STORAGE_KEY);
  if (!raw) return null;

  window.sessionStorage.removeItem(CONTACT_SUCCESS_STORAGE_KEY);

  try {
    const parsed = JSON.parse(raw) as Partial<ContactSuccessState>;
    if (
      parsed.formType !== "contact" ||
      typeof parsed.eventId !== "string" ||
      !parsed.eventId
    ) {
      return null;
    }

    return {
      eventId: parsed.eventId,
      formType: "contact",
      serviceSlug:
        typeof parsed.serviceSlug === "string"
          ? parsed.serviceSlug
          : undefined,
      utmCampaign:
        typeof parsed.utmCampaign === "string"
          ? parsed.utmCampaign
          : undefined,
    };
  } catch {
    return null;
  }
}
