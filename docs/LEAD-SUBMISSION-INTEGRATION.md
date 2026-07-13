# Lead Submission Integration

Website Design Dogs (`lacreativodesign/website-design-dogs-website`) submits contact and quote enquiries from browser forms to the same-origin `POST /api/leads` route. The route validates JSON, checks origin, rate limits, verifies Turnstile when required, normalizes the lead envelope, and forwards server-side to the full `BIZOSTO_API_URL` endpoint.

## Environment variables
Public: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
Server-only: `LEAD_SUBMISSION_ENABLED`, `BIZOSTO_API_URL`, `BIZOSTO_TENANT_ID`, `BIZOSTO_API_KEY`, `BIZOSTO_API_KEY_HEADER`, `BIZOSTO_TENANT_HEADER`, `LEAD_ALLOWED_ORIGINS`, `LEAD_REQUEST_TIMEOUT_MS`, `LEAD_RATE_LIMIT_WINDOW_MS`, `LEAD_RATE_LIMIT_MAX`, `TURNSTILE_REQUIRED`, `TURNSTILE_SECRET_KEY`, `ALLOW_PREVIEW_LEAD_SUBMISSION`.

Production must set `LEAD_SUBMISSION_ENABLED=true`, the Bizosto endpoint and credentials, allowed origins, and Turnstile keys. Preview deployments do not forward leads unless `ALLOW_PREVIEW_LEAD_SUBMISSION=true`.

## Bizosto contract
The adapter sends JSON `LeadSubmissionEnvelope` with `schemaVersion`, `submissionId`, trusted brand fields, contact, business, enquiry/project/package data, attribution, and consent. Headers are `Content-Type`, `Accept`, configured API-key header, configured tenant header, `Idempotency-Key`, and a Website Design Dogs user agent. `BIZOSTO_API_URL` is treated as the complete ingestion endpoint; no path is appended.

Example payload uses fake data only: a contact named `Example Person`, email `person@example.test`, and business `Example Business`.

## Protections and behavior
The API accepts JSON only, rejects bodies over 64 KB, strips unsupported control characters, validates enum selections, rejects invalid URLs and consent failures, and never logs PII. A hidden field and form timing provide spam signals. Turnstile is rendered only when a site key exists and verified server-side when required. The rate limiter is an instance-local in-memory fallback, not distributed across serverless instances.

Responses are normalized and never expose upstream bodies, credentials, tenant IDs, stack traces, or endpoint details. Success is shown only after Bizosto returns 200, 201, or 202. Failure preserves form data. A single retry is attempted for network/timeout and 5xx-style upstream failures using the same idempotency key.

## Attribution and privacy
Session attribution uses `sessionStorage` key `wdd-attribution-v1` for landing page, current page, referrer, selected UTM fields, `fbclid`, and `gclid`. No cookies, fingerprinting, or marketing pixels are added.

## Manual checklist and rollback
Test contact and quote validation, Turnstile, disabled configuration, origin rejection, rate limiting, and mock upstream success/failure before enabling production. Disable immediately with `LEAD_SUBMISSION_ENABLED=false`.
