# Production Launch Checklist

1. Domain: connect `websitedesigndogs.com`, confirm HTTPS, preferred hostname and redirects, set `NEXT_PUBLIC_SITE_URL`.
2. Bizosto: set ingestion URL, tenant ID, API key, configured headers, enable production submission, confirm allowed origins, keep preview forwarding disabled, test contact/quote/campaign leads, confirm tenant delivery and no duplicates.
3. Turnstile: create production widget, set site key and secret, confirm hostname, test valid and invalid submissions, confirm no secret exposure.
4. GTM: create Website Design Dogs web container, set `NEXT_PUBLIC_ENABLE_GTM=true` and `NEXT_PUBLIC_GTM_ID`, configure consent initialization, GA4 and Meta tags, avoid duplicate page views/conversions, publish after testing.
5. Consent: test Accept All, Reject Optional, analytics only, marketing only, preference changes, cleared cookie, mobile, no optional tracker before consent, and denied remains denied.
6. GA4: create/select property, configure stream, map `wdd_page_view` and `generate_lead`, verify DebugView, confirm no PII and one event per action.
7. Meta: verify domain, configure Pixel through GTM, map Lead, test Events Manager, require marketing consent, confirm no PII and campaign attribution.
8. Search Engines: set Google/Bing verification, deploy, verify ownership, submit sitemap, inspect robots/canonicals, confirm campaign noindex, request indexing.
9. Legal: review legal pages, obtain attorney review when appropriate, confirm proposal alignment, campaign offer wording, refund language, and consent language.
10. Final QA: desktop, tablet, mobile, dark, light, all forms, links, 404, campaigns, sitemap, robots, structured data, Lighthouse, accessibility, console and hydration errors.
11. Rollback: set `LEAD_SUBMISSION_ENABLED=false`, set `NEXT_PUBLIC_ENABLE_GTM=false`, redeploy previous Vercel production deployment, remove optional verification values, preserve received lead records.

## Final Launch Gate Addendum

Before connecting the production domain or enabling external integrations, run `npm run env:check -- --production`, `npm run build:audit`, and `npm run test:e2e`. Pull requests and pushes to `main` are covered by the GitHub Actions quality gate in `.github/workflows/quality-gate.yml`.

Verify preview and development deployments include `X-Robots-Tag: noindex, nofollow, noarchive`, while production deployments do not receive a global noindex header. Complete the sign-off template in `docs/GO-LIVE-ACCEPTANCE.md` and preserve all existing manual external configuration steps for Vercel, Bizosto, Turnstile, GTM, GA4, Meta, Google Search Console, and Bing Webmaster Tools.
