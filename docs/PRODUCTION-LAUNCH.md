# Website Design Dogs production launch

This checklist is the source of truth for activating the public Website Design Dogs lead, measurement, search, and domain infrastructure. Do not commit credentials. Configure secrets only in the production environment.

## Launch invariants

- Canonical site: `https://websitedesigndogs.com`
- Accepted public origins: apex and `www`
- Preview lead submission: disabled after testing
- Starter package: $499 one-time starting project fee
- Website Design Dogs remains a service brand of LA CREATIVO GROUP, LLC
- No fabricated clients, testimonials, reviews, performance claims, or guarantees

## 1. Lead delivery

Configure the production environment from `.env.example`:

- Enable `LEAD_SUBMISSION_ENABLED`.
- Supply the HTTPS Bizosto endpoint, tenant ID, API key, and the approved header names.
- Keep the Bizosto API key server-only.
- Keep `ALLOW_PREVIEW_LEAD_SUBMISSION=false` for the final launch.
- Include both public origins in `LEAD_ALLOWED_ORIGINS`.

The website sends one idempotent request per submission to Bizosto. A browser receives success only after Bizosto returns HTTP 200, 201, or 202.

## 2. Spam protection

### Cloudflare Turnstile

Create a current Cloudflare Turnstile managed widget for:

- `websitedesigndogs.com`
- `www.websitedesigndogs.com`

Configure the public site key and server-only secret. Keep `TURNSTILE_REQUIRED=true`. The server validates:

- token success and five-minute lifetime;
- approved hostname;
- the exact Contact, Quote, or Campaign action;
- submission-bound `cData`;
- single-use Siteverify behavior with an idempotency key.

### Vercel Firewall rate limit

Create a Vercel Firewall rate-limit rule with ID:

`wdd-lead-submission`

Apply it to `POST /api/leads` at five requests per ten minutes per source IP. Keep `LEAD_DISTRIBUTED_RATE_LIMIT_REQUIRED=true`. The API also retains a short-lived instance-level fallback and fails closed when the required distributed rule is missing.

## 3. Consent-aware measurement

Configure a legitimate Website Design Dogs GTM container and set:

- `NEXT_PUBLIC_ENABLE_GTM=true`
- `NEXT_PUBLIC_GTM_ID=GTM-...`
- `NEXT_PUBLIC_CONSENT_BANNER_ENABLED=true`

Configure GA4 inside GTM. Do not add a second direct GA4 loader. The site emits these sanitized events:

- `wdd_page_view`
- `wdd_view_packages`
- `wdd_select_package`
- `wdd_quote_start`
- `wdd_lead_submit`
- `wdd_lead_success`
- `wdd_lead_error`

The data layer excludes contact details, business names, notes, reference IDs, API values, and Turnstile tokens. Optional tags do not load until the corresponding visitor choice is present.

## 4. Meta Pixel and Conversions API

Use only the legitimate Website Design Dogs Business Portfolio and dataset.

In GTM, trigger the Meta browser `Lead` event from `wdd_lead_success` after marketing consent. Map data-layer `eventId` to Meta `event_id`.

Configure the server-only CAPI values:

- `META_CAPI_ENABLED=true`
- `META_DATASET_ID`
- `META_CAPI_ACCESS_TOKEN`
- `META_GRAPH_API_VERSION` set to the current version selected in Events Manager

For initial validation only, set `META_CAPI_TEST_EVENT_CODE`. Submit a real authorized test enquiry and confirm:

- one browser Lead event;
- one server Lead event;
- the same event ID on both;
- deduplication into one conversion;
- hashed email and optional phone;
- no event without marketing consent;
- no event when Bizosto delivery fails.

Remove `META_CAPI_TEST_EVENT_CODE` before launch.

## 5. Search and AI discovery

Configure issued verification values for Google Search Console, Bing Webmaster Tools, and Meta domain verification.

Verify after deployment:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/llms.txt`
- `/llms-full.txt`
- page canonicals and social preview image
- Organization, WebSite, WebPage, Service, Offer, Breadcrumb, and visible FAQ structured data

The robots policy allows normal search engines and named AI search/user agents while blocking named model-training crawlers. Campaign pages remain `noindex` and stay out of the sitemap.

## 6. Domain cutover

Attach both:

- `websitedesigndogs.com`
- `www.websitedesigndogs.com`

Choose the apex as canonical and redirect `www` to it. Reduce DNS TTL before cutover when practical. Keep the existing WordPress site available for rollback until all launch tests pass.

Do not send paid traffic until:

1. the production environment audit passes;
2. a Contact enquiry reaches Bizosto;
3. a guided Quote enquiry reaches Bizosto;
4. a Campaign enquiry reaches Bizosto;
5. Turnstile and the distributed rate limit are confirmed;
6. consent-default, GA4, Pixel, and CAPI behavior are verified;
7. apex/`www` redirects, sitemap, robots, and Search Console ownership are verified.

## 7. Verification commands

Run:

```bash
npm run env:check -- --production
npm run assets:verify
npm run lint
npm run typecheck
npm run leads:test
npm run launch:test
npm run content:test
npm run build
npm run build:audit
npm run test:e2e
```

The environment audit prints configuration status only. It must never print secret values.

## Rollback

If lead delivery or critical public routes fail after DNS cutover:

1. stop paid traffic;
2. restore the prior DNS target;
3. keep the failed deployment available for diagnosis;
4. do not disable Turnstile, origin validation, consent, or rate limiting as a workaround;
5. correct the integration and repeat the full launch checklist before another cutover.
