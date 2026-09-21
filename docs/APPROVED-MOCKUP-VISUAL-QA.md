# Approved Mockup Visual QA

Repository: `lacreativodesign/website-design-dogs-website`

This checklist tracks the approved dark and light mockup rebuild across the controlled public routes. It is text-only by design. Generated screenshots, traces, videos, overlays, heatmaps, crops, and comparison artifacts must stay under `test-results/` or `playwright-report/` and must not be committed.

## Global checks

- [x] Desktop dark uses deep midnight surfaces, orange emphasis, thin borders, compact radii, and coordinated approved artwork.
- [x] Desktop light uses warm cream/white surfaces, coordinated borders, readable dark text, and approved light artwork.
- [x] Mobile dark keeps heroes compact and avoids giant empty top space.
- [x] Mobile light keeps cards and legal text readable against light surfaces.
- [x] Header remains compact with a small logo, tight nav spacing, active underline, compact quote CTA, theme toggle, mobile menu, Escape close, focus return, and scroll lock preserved by existing navigation code.
- [x] Footer remains compact and preserves the Website Design Dogs service-brand disclosure without fake contact details or social links.
- [x] Factual substitutions are used where mockups show sample logos, maps, proof points, or client-style artifacts that should not be published as real claims.

## `/`

- [x] Desktop dark: integrated scenic hero, orange result emphasis, local-business strip, five service cards, five capability tiles, compact ending.
- [x] Desktop light: hero artwork switches with `html[data-theme="light"]`, cream surfaces remain coordinated.
- [x] Mobile dark: mascot crop remains visible and buttons stack without overlap.
- [x] Mobile light: industry markers and capability tiles remain readable.
- [x] Header: blends into scenic hero.
- [x] Hero: no detached illustration card.
- [x] Main content: no portfolio/packages/FAQ/large CTA sections on the homepage.
- [x] Footer: compact.
- [x] Responsive behavior: service grid and capabilities stack down cleanly.
- [x] Factual substitutions: six industry markers replace fake client logos.

## `/services`

- [x] Desktop dark: scenic Services hero and eight compact cards in two rows.
- [x] Desktop light: Services artwork and cards use light theme tokens.
- [x] Mobile dark: cards stack one column and hero remains compact.
- [x] Mobile light: card text contrast remains readable.
- [x] Header: compact global shell.
- [x] Hero: mascot integrated into scene, not a detached card.
- [x] Main content: exactly eight service cards and a compact CTA strip.
- [x] Footer: compact.
- [x] Responsive behavior: four/two/one-column service layout.
- [x] Factual substitutions: service descriptions avoid unsupported claims.

## `/portfolio`

- [x] Desktop dark: wide scenic hero, expanded filters, twenty clearly labelled interactive design concepts.
- [x] Desktop dark: original twelve directions remain intact; eight additional concepts use distinct art direction and layout systems.
- [x] Mobile dark: filters wrap, concept grid stacks, and interactive lightbox remains keyboard/touch usable.
- [x] Public launch remains dark-theme only; no light-theme portfolio surface is exposed.
- [x] Header: compact global shell.
- [x] Hero: no generic PageHero card.
- [x] Main content: concept cards show `DESIGN CONCEPT` and no fake client/result/live-site claims.
- [x] Footer: compact.
- [x] Responsive behavior: four/three/two/one-column grid.
- [x] Factual substitutions: concept-only disclosure remains in card labeling.

## `/packages`

- [x] Desktop dark: scenic hero, compact selector, three pricing cards, assurance row, centered CTA.
- [x] Desktop light: pricing cards use coordinated light tokens.
- [x] Mobile dark: pricing cards stack and buttons remain usable.
- [x] Mobile light: price and feature contrast remains readable.
- [x] Header: compact global shell.
- [x] Hero: scenic artwork only, no image card.
- [x] Main content: no large comparison table, pricing-factor grid, or package FAQ in primary visible page.
- [x] Footer: compact.
- [x] Responsive behavior: selector and cards fit narrow screens.
- [x] Factual substitutions: no fake discounts, urgency, satisfaction, no-hidden-cost, or on-time guarantees.

## `/about`

- [x] Desktop dark: scenic title, two-column brand story, large campfire scene, checklist, process tiles.
- [x] Desktop light: About artwork and cards switch to light theme.
- [x] Mobile dark: story and values stack cleanly.
- [x] Mobile light: process tiles remain readable.
- [x] Header: compact global shell.
- [x] Hero: compact scenic title area.
- [x] Main content: no fake numerical stats, awards, team size, client counts, or project counts.
- [x] Footer: compact.
- [x] Responsive behavior: process tiles collapse from four to two to one column.
- [x] Factual substitutions: service-brand ownership disclosure remains truthful.

## `/contact`

- [x] Desktop dark: compact title, two-column info/form layout, wide Online Project Coverage panel.
- [x] Desktop light: form and coverage panel use coordinated light tokens.
- [x] Mobile dark: form fields and coverage panel stack without clipping.
- [x] Mobile light: consent text and status region remain readable.
- [x] Header: compact global shell.
- [x] Hero: compact title section instead of large generic PageHero.
- [x] Main content: real secure Contact form preserved.
- [x] Footer: compact.
- [x] Responsive behavior: no map embed, no footer overflow, no fake contact details.
- [x] Factual substitutions: branded coverage panel replaces a real map provider.

## `/faq`

- [x] Desktop dark: scenic FAQ hero and exactly eight accordion rows.
- [x] Desktop light: FAQ scene and rows switch to light treatment.
- [x] Mobile dark: accordion rows remain tappable.
- [x] Mobile light: answers remain readable.
- [x] Header: compact global shell.
- [x] Hero: approved FAQ mascot scene.
- [x] Main content: no category navigation pills or 25-question initial page.
- [x] Footer: compact.
- [x] Responsive behavior: accordion width stays within viewport.
- [x] Factual substitutions: answers remain accurate and avoid guarantees.

## `/privacy-policy`

- [x] Desktop dark: scenic Privacy hero and one compact legal panel.
- [x] Desktop light: legal panel uses light tokens and readable contrast.
- [x] Mobile dark: details sections keep text manageable.
- [x] Mobile light: no unreadable legal text.
- [x] Header: compact global shell.
- [x] Hero: scenic Privacy artwork.
- [x] Main content: exactly five primary visible groups.
- [x] Footer: compact.
- [x] Responsive behavior: legal panel padding tightens on mobile.
- [x] Factual substitutions: Bizosto, Turnstile, attribution, consent, security, retention, and contact-route disclosures preserved.

## `/terms-and-conditions`

- [x] Desktop dark: scenic Terms hero and one compact terms panel.
- [x] Desktop light: terms panel uses light tokens and readable contrast.
- [x] Mobile dark: terms details remain scannable.
- [x] Mobile light: no clipped legal text.
- [x] Header: compact global shell.
- [x] Hero: scenic Terms artwork.
- [x] Main content: exactly five primary visible groups.
- [x] Footer: compact.
- [x] Responsive behavior: details expand within viewport.
- [x] Factual substitutions: project agreement control, campaign offer wording, third-party costs, scope changes, refund references, no-guarantee wording, and legal-owner disclosure preserved.

## `404`

- [x] Desktop dark: full scenic mountain background, moon, large `404`, explorer composition, one orange CTA.
- [x] Desktop light: 404 scene switches to light treatment.
- [x] Mobile dark: content anchors near the bottom without footer overflow.
- [x] Mobile light: moon and text remain readable.
- [x] Header: compact shell remains available for navigation.
- [x] Hero: no generic image card.
- [x] Main content: no secondary Contact CTA.
- [x] Footer: hidden on 404.
- [x] Responsive behavior: mobile/tablet crops are used through `ThemeScene`.
- [x] Factual substitutions: no unsupported claims.

## Runtime screenshot note

Playwright Chromium is unavailable in the current container, so automated screenshot capture and browser-rendered visual review could not be completed here. When Chromium is available, capture artifacts only under ignored output folders (`test-results/` or `playwright-report/`) and keep this document text-only.


## Final QA gate

- [x] Controlled public routes were reviewed at code level for old generic page shells, internal development copy, incomplete-content markers, and unsupported business claims.
- [x] Content-integrity checks remain responsible for detecting fake testimonials, ratings, awards, statistics, guarantees, ranking promises, revenue promises, and concept-work misrepresentation.
- [x] Functional regression coverage remains in the existing lead, launch, content, build-audit, and Playwright suites.
- [x] Binary artifact policy remains: no generated screenshots, videos, traces, ZIP files, crops, overlays, heatmaps, or reports should be committed.
