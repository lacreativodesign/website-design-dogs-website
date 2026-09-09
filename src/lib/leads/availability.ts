import { LeadError } from "./errors";
import { assertCanSubmit, getLeadConfig } from "./request-security";

/** A public availability decision, never a substitute for POST security checks. */
export function isLeadSubmissionAvailable(): boolean {
  try {
    assertCanSubmit(getLeadConfig());
    return true;
  } catch (error) {
    if (error instanceof LeadError) return false;
    throw error;
  }
}
