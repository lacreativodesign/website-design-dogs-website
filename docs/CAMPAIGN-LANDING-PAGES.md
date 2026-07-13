# Campaign Landing Pages

Repository: `lacreativodesign/website-design-dogs-website`.

## Routes and slugs
- `/campaigns/cleaning` — `cleaning`
- `/campaigns/roofing` — `roofing`
- `/campaigns/landscaping` — `landscaping`
- `/campaigns/home-services` — `home-services`

## Offer
- Offer: Website Design Dogs Campaign Starter Offer
- Offer code: `WDD-CAMPAIGN-STARTER-249`
- Regular Website Package: `$499`
- Campaign Offer: `$249`
- Savings: `$250`
- Qualifying scope: Campaign Starter, up to five core pages, responsive design, contact or quote form, SEO foundations, performance preparation, and launch support.

Final scope, content requirements, integrations, third-party costs, revisions, and project timing are confirmed before work begins. The promotional price does not automatically include domain registration, hosting, premium software, full copywriting, e-commerce, complex integrations, custom applications, ongoing marketing, or services outside the confirmed project scope.

## Server-owned mapping
Campaign labels and offer pricing are constructed server-side. Browser-supplied pricing is ignored because the payload schema has no pricing fields.

- `cleaning` → Cleaning Companies
- `roofing` → Roofing Contractors
- `landscaping` → Landscaping Businesses
- `home-services` → Home-Service Businesses

## Campaign form schema
Campaign submissions use `formType: "campaign"`, a UUID submission ID, allowlisted campaign slug, contact details, business name and optional website, project type, optional note, consent, attribution, optional Turnstile token, and honeypot/timing security fields.

## Bizosto envelope extension
Trusted lead envelopes may include `campaign` with server-owned slug, industry, offer code, prices, savings, currency, and qualifying scope. Existing origin validation, request-size limits, honeypot, timing checks, Turnstile verification, rate limiting, idempotency, PII-free logging, safe response normalization, failure preservation, attribution, and no-store behavior remain in place.

## Attribution
Attribution remains first-party session storage only and includes UTM fields, `fbclid`, `gclid`, landing page, current page, and referrer. Campaign route and slug are included in the trusted envelope. No advertising cookies or fingerprinting are added.

## Analytics-ready events
No Meta Pixel, GA4, GTM, or external tracker is installed. The site dispatches no-PII `CustomEvent`s and only pushes to `dataLayer` if it already exists:
- `wdd_campaign_page_view`
- `wdd_campaign_cta_click`
- `wdd_campaign_form_started`
- `wdd_campaign_form_submit_started`
- `wdd_campaign_form_submit_success`
- `wdd_campaign_form_submit_failed`

Allowed fields are campaign slug, offer code, page path, placement, project type, failure category, and selected UTM values.

## Indexing
Campaign pages set page-level `robots` metadata to `index: false` and `follow: false`.

## Approved assets
- `/campaigns/cleaning/hero-dark.webp` and `/campaigns/cleaning/hero-light.webp`
- `/campaigns/roofing/hero-dark.webp` and `/campaigns/roofing/hero-light.webp`
- `/campaigns/landscaping/hero-dark.webp` and `/campaigns/landscaping/hero-light.webp`
- `/campaigns/home-services/hero-dark.webp` and `/campaigns/home-services/hero-light.webp`
- `/portfolio/concepts/cleaning-concept.webp`
- `/portfolio/concepts/roofing-concept.webp`
- `/portfolio/concepts/landscaping-concept.webp`
- `/portfolio/concepts/home-services-concept.webp`

## Testing checklist
Run `npm ci`, `npm run assets:verify`, `npm run lint`, `npm run typecheck`, `npm run leads:test`, `npm run build`, and `git diff --check` before release.

## Production readiness checklist
- Configure lead submission environment variables on Vercel.
- Verify Turnstile client rendering and server verification in the target environment.
- Submit a safe real campaign lead only after credentials and permission are available.
- Confirm the request reaches the configured Bizosto endpoint.
- Confirm no secrets or tenant IDs are exposed in client bundles.

## Changing or disabling the offer
Change offer details only in `src/content/campaigns.ts` and the server-owned mapping in `src/lib/leads/validation.ts` in the same PR. To disable online submissions, use the existing lead submission environment controls; do not remove validation or security protections.

## Before Meta ads launch
Prompt 7 should cover tracking/consent decisions, production lead-routing verification, final campaign QA, and any approved ad-platform integrations. Landing pages building successfully does not mean the Meta campaign is ready to launch.
