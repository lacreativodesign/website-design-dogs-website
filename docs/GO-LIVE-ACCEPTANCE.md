# Website Design Dogs Go-Live Acceptance

## A. Automated Code Gate
- `npm ci`
- `npm run assets:verify`
- `npm run lint`
- `npm run typecheck`
- `npm run leads:test`
- `npm run campaigns:test` when available
- `npm run launch:test`
- `npm run build`
- `npm run build:audit`
- `npm run test:e2e`
- `git diff --check`

## B. Domain Gate
- [ ] Production domain connected
- [ ] HTTPS valid
- [ ] Preferred hostname selected
- [ ] Redirect works
- [ ] Canonical origin correct
- [ ] Sitemap origin correct
- [ ] Robots origin correct

## C. Lead Gate
- [ ] Production environment checker has no blockers
- [ ] Real contact lead reaches Website Design Dogs tenant
- [ ] Real quote lead reaches tenant
- [ ] Real campaign lead reaches tenant
- [ ] No duplicates
- [ ] Correct attribution
- [ ] Correct campaign offer code
- [ ] Correct source
- [ ] Failure preserves data
- [ ] Turnstile valid-token test
- [ ] Turnstile invalid-token test

## D. Analytics Gate
- [ ] Consent defaults denied
- [ ] Reject Optional blocks tracking
- [ ] Analytics-only works
- [ ] Marketing-only works
- [ ] Accept All works
- [ ] GTM loads once
- [ ] GA4 page view once
- [ ] GA4 generate_lead once
- [ ] Meta Lead once
- [ ] No PII
- [ ] No purchase event
- [ ] No revenue for lead form

## E. Search Gate
- [ ] Google verification complete
- [ ] Bing verification complete
- [ ] Sitemap submitted
- [ ] Main pages indexable
- [ ] Campaigns noindex
- [ ] Structured data validated
- [ ] Canonicals correct

## F. Legal Gate
- [ ] Privacy reviewed
- [ ] Terms reviewed
- [ ] Refund policy reviewed
- [ ] Cookie policy reviewed
- [ ] Campaign wording reviewed
- [ ] Proposal language aligned
- [ ] Attorney review status recorded where applicable

## G. Visual Gate
- [ ] Desktop dark
- [ ] Desktop light
- [ ] Tablet dark
- [ ] Tablet light
- [ ] Mobile dark
- [ ] Mobile light
- [ ] Campaign pages
- [ ] Legal pages
- [ ] Forms
- [ ] Consent
- [ ] 404

## H. Security Gate
- [ ] No secrets in client bundle
- [ ] CSP reviewed
- [ ] Headers reviewed
- [ ] Origin verification tested
- [ ] Rate-limit limitation acknowledged
- [ ] Preview deployments noindex
- [ ] Preview lead forwarding disabled
- [ ] No permissive CORS

## I. Final Decision
Select one: `GO` / `GO WITH CONDITIONS` / `NO-GO`

- Reviewer:
- Date:
- Production deployment:
- Conditions:
- Outstanding blockers:
- Approval:
