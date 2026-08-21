import type { LeadResponseCode, LeadSubmissionResponse } from "./types";
export class LeadError extends Error {
  constructor(
    public code: LeadResponseCode,
    message: string,
    public status: number,
    public fieldErrors?: Record<string, string>,
    public retryAfterSeconds?: number,
    public upstreamStatus?: number,
    public upstreamMessage?: string,
  ) {
    super(message);
  }
}
export function errorResponse(error:LeadError):LeadSubmissionResponse{return {ok:false,code:error.code,message:error.message,fieldErrors:error.fieldErrors,retryAfterSeconds:error.retryAfterSeconds}}
