# Website Design Dogs

Official services-first marketing website for Website Design Dogs, a service brand of LA CREATIVO GROUP, LLC.

## Purpose

This repository contains the production Next.js website for `www.websitedesigndogs.com`, including the service catalog, package catalog, portfolio concepts, guided project brief, campaign pages, consent controls, and server-side lead delivery.

## Stack

- Next.js App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- ESLint
- npm
- Vercel deployment

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run assets:verify
npm run content:test
npm run leads:test
npm run launch:test
npm run test:e2e
npm run build:audit
npm run env:check -- --production
```

## Directory structure

```text
src/app        App Router routes, layout, and global styles
src/components Reusable layout, UI, theme, section, form, and SEO components
src/content    Structured content for services, packages, portfolio, industries, testimonials, and FAQs
src/lib        Constants, metadata helpers, validation, and utilities
src/types      Shared TypeScript types
public/brand   Approved brand logos, mascot files, scenes, and icons
public/portfolio Approved portfolio assets
public/campaigns Approved campaign assets
public/og      Approved Open Graph assets
scripts        Maintenance and automation scripts
```

## Brand identity assets

The approved black-sunglasses identity system is stored under `public/brand`:

- `identity/` contains web-optimized transparent shield and complete horizontal logo exports derived from the approved high-resolution masters.
- `social/` contains the optimized 1200 x 630 Open Graph image.
- `favicons/` contains the matching browser, Apple touch, and PWA icon family.

The header and footer use the optimized shield mark while structured organization metadata uses the complete horizontal logo. Full-resolution social, print, transparent PNG, and guideline files are maintained in the controlled brand handoff package rather than shipped as public website payloads. Do not redraw, recolor, or restore the previous orange eyewear; the approved sunglasses frame is black.

## Environment variables

Copy `.env.example` to `.env.local` for local development. Placeholder names only are committed.

```bash
NEXT_PUBLIC_SITE_URL=https://www.websitedesigndogs.com
LEAD_SUBMISSION_ENABLED=
BIZOSTO_API_URL=https://app.bizosto.com/api/ingest/leads
BIZOSTO_INGEST_KEY=
TURNSTILE_REQUIRED=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_ENABLE_GTM=
NEXT_PUBLIC_GTM_ID=
```

`BIZOSTO_INGEST_KEY` is a server-only secret and must never use a `NEXT_PUBLIC_` prefix. Configure its real value in Vercel environment variables or an ignored `.env.local` file; never commit it.

## Bizosto CRM lead integration

Contact, guided-quote, and campaign enquiries submit to the website's `/api/leads` route. The server validates the request, applies the existing anti-spam controls, and forwards it to `https://app.bizosto.com/api/ingest/leads` using `BIZOSTO_INGEST_KEY`. The API key is never included in browser JavaScript or browser requests.

Set `BIZOSTO_INGEST_KEY` and `LEAD_SUBMISSION_ENABLED=true` in the Vercel deployment, together with the existing allowed-origin, Turnstile, and distributed-rate-limit settings documented in `.env.example`. `BIZOSTO_API_URL` defaults to the production ingest endpoint and can be overridden for an isolated test server.

To verify the integration:

1. Run `npm run leads:test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
2. Open a page with `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, or `fbclid` query parameters, then navigate to an enquiry form.
3. Enter a valid name and email, check the Privacy Policy consent box, and submit.
4. Confirm the normal success message and verify that Bizosto received the lead, original landing attribution, checked consent timestamp, and submission ID. A duplicate response must show the same success message; a failed request must leave the entered information available for retry.

## Vercel deployment

Vercel will recognize this repository as a root-level Next.js project through `package.json` and the Next.js configuration. Production builds should use:

```bash
npm run build
```

Baseline security headers are configured in `next.config.ts`. Consent-controlled browser tracking is enabled only when a valid GTM container is supplied through production environment variables.

## Production release gates

- Run the complete quality gate and `npm run env:check -- --production` against the intended Vercel production configuration.
- Confirm the apex domain redirects to the `www` canonical host and that sitemap, Open Graph, and structured-data URLs use the same origin.
- Submit one approved production lead and confirm its reference, tenant, attribution fields, consent state, and delivery in Bizosto. Keep lead submission disabled until this succeeds.
- Verify Turnstile on every form family and confirm distributed rate limiting is active.
- Supply the legitimate GTM container ID, test default-denied consent behavior, and remove any Meta test-event code before launch.
- Verify the email provider's DKIM selector records, a published DMARC record, and From-domain alignment with a real delivery test.
- Complete manual desktop/mobile review, keyboard review, and counsel-approved legal consistency review before merging or promoting to production.

## Security rules

- Never commit secrets or real API keys.
- Never expose server-only integration keys to browser code.
- Lead submissions route server-side to the Website Design Dogs tenant in Bizosto.
- Do not implement direct browser-to-Firestore lead writes.
