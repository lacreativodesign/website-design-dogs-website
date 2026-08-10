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

## Environment variables

Copy `.env.example` to `.env.local` for local development. Placeholder names only are committed.

```bash
NEXT_PUBLIC_SITE_URL=https://www.websitedesigndogs.com
LEAD_SUBMISSION_ENABLED=
BIZOSTO_API_URL=
BIZOSTO_TENANT_ID=
BIZOSTO_API_KEY=
TURNSTILE_REQUIRED=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_ENABLE_GTM=
NEXT_PUBLIC_GTM_ID=
```

`BIZOSTO_API_KEY` is server-only and must never use a `NEXT_PUBLIC_` prefix. Secrets must never be committed.

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
