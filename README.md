# Website Design Dogs

Official marketing website foundation for Website Design Dogs, a service brand of LA CREATIVO GROUP, LLC.

## Purpose

This repository replaces the former temporary static HTML launch page with a production-ready Next.js App Router foundation for `websitedesigndogs.com`. The current homepage is intentionally temporary and will be replaced in later implementation phases.

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

Empty asset directories are retained with `.gitkeep` files until approved assets are supplied.

## Environment variables

Copy `.env.example` to `.env.local` for local development. Placeholder names only are committed.

```bash
NEXT_PUBLIC_SITE_URL=
BIZOSTO_API_URL=
BIZOSTO_TENANT_ID=
BIZOSTO_API_KEY=
```

`BIZOSTO_API_KEY` is server-only and must never use a `NEXT_PUBLIC_` prefix. Secrets must never be committed.

## Vercel deployment

Vercel will recognize this repository as a root-level Next.js project through `package.json` and the Next.js configuration. Production builds should use:

```bash
npm run build
```

Baseline security headers are configured in `next.config.ts`. A final Content Security Policy is intentionally deferred until approved analytics, Meta integrations, and asset domains are known.

## Future implementation phases

- Prompt 2: shared layout, theme architecture, and reusable primitives
- Prompt 3: final homepage sections and approved brand assets
- Later prompts: services, packages, portfolio, server-side Bizosto lead routing, campaign landing pages, analytics, legal pages, and final security hardening

## Security rules

- Never commit secrets or real API keys.
- Never expose server-only integration keys to browser code.
- Future lead submissions must route server-side to the Website Design Dogs tenant in Bizosto.
- Do not implement direct browser-to-Firestore lead writes.
