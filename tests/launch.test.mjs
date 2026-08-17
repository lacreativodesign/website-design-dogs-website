import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("sitemap excludes campaigns and api", () => {
  const source = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert.match(source, /privacy-policy/);
  assert.doesNotMatch(source, /campaigns/);
  assert.doesNotMatch(source, /api/);
});

test("robots keeps public pages crawlable and separates AI search from training", () => {
  const source = fs.readFileSync("src/app/robots.ts", "utf8");
  assert.match(source, /"OAI-SearchBot"/);
  assert.match(source, /"Claude-SearchBot"/);
  assert.match(source, /"PerplexityBot"/);
  assert.match(source, /"GPTBot"/);
  assert.match(source, /"ClaudeBot"/);
  assert.match(source, /"Google-Extended"/);
  assert.match(source, /disallow: \["\/api\/"\]/);
  assert.match(source, /disallow: "\/"/);
  assert.doesNotMatch(source, /campaigns/);
});

test("LLM discovery files are factual, generated, and linked", () => {
  const source = fs.readFileSync("src/lib/llms.ts", "utf8");
  const compactRoute = fs.readFileSync(
    "src/app/llms.txt/route.ts",
    "utf8",
  );
  const fullRoute = fs.readFileSync(
    "src/app/llms-full.txt/route.ts",
    "utf8",
  );

  assert.match(source, /# \$\{SITE_NAME\}/);
  assert.match(source, /design concepts/);
  assert.match(source, /not client case studies/);
  assert.match(source, /\/llms-full\.txt/);
  assert.match(compactRoute, /text\/markdown/);
  assert.match(fullRoute, /text\/markdown/);
  assert.match(compactRoute, /force-static/);
  assert.match(fullRoute, /force-static/);
});

test("site entity schema distinguishes the brand from its legal parent", () => {
  const source = fs.readFileSync(
    "src/components/seo/site-json-ld.tsx",
    "utf8",
  );

  assert.match(source, /parentOrganization/);
  assert.match(source, /legalName: LEGAL_OWNER/);
  assert.doesNotMatch(source, /name: SITE_NAME,\s+legalName: LEGAL_OWNER/);
  assert.match(source, /#organization/);
  assert.match(source, /#website/);
});

test("manifest and page metadata expose canonical launch assets", () => {
  const manifest = fs.readFileSync("src/app/manifest.ts", "utf8");
  const metadata = fs.readFileSync("src/lib/metadata.ts", "utf8");
  const pageMetadata = fs.readFileSync("src/lib/seo.ts", "utf8");

  assert.match(manifest, /favicon-192x192\.png/);
  assert.match(manifest, /favicon-512x512\.png/);
  assert.match(metadata, /manifest: "\/manifest\.webmanifest"/);
  assert.match(pageMetadata, /"max-image-preview": "large"/);
  assert.match(pageMetadata, /languages: \{ "en-US": url \}/);
});

test("tracking sanitizer drops forbidden fields", () => {
  const source = fs.readFileSync("src/lib/tracking/events.ts", "utf8");
  assert.match(source, /allowedEventFields/);
  assert.doesNotMatch(source, /email|phone|fullName|referenceId|submissionId/);
});

test("consent cookie does not store pii", () => {
  const source = fs.readFileSync(
    "src/components/consent/consent-types.ts",
    "utf8",
  );
  assert.match(source, /wdd-consent-v2/);
  assert.doesNotMatch(source, /email|phone|name|business/);
});

test("global metadata avoids conflicting robots directives and guards verification", () => {
  const source = fs.readFileSync("src/lib/metadata.ts", "utf8");
  assert.doesNotMatch(source, /robots\s*:\s*\{[^}]*noindex/i);
  assert.doesNotMatch(source, /robots\s*:\s*\{[^}]*index\s*:\s*true/i);
  assert.match(source, /isValidVerification/);
});

test('conversion event contract uses safe names, safe fields, and consent gating', () => {
  const source = fs.readFileSync('src/lib/tracking/events.ts', 'utf8');
  for (const name of ['wdd_view_packages', 'wdd_select_package', 'wdd_quote_start', 'wdd_lead_submit', 'wdd_lead_success', 'wdd_lead_error']) assert.match(source, new RegExp(name));
  assert.match(source, /readConsent/);
  assert.match(source, /packageSlug/);
  assert.match(source, /serviceSlug/);
  assert.match(source, /eventId/);
  assert.equal(/fullName|email|phone|businessName|referenceId|turnstileToken/.test(source), false);
});

test('CSP allows GTM scripts, connections, and measurement images', () => {
  const source = fs.readFileSync('next.config.ts', 'utf8');

  assert.match(source, /script-src[^"]*https:\/\/www\.googletagmanager\.com/);
  assert.match(source, /connect-src[^"]*https:\/\/www\.googletagmanager\.com/);
  assert.match(source, /img-src[^"]*https:\/\/www\.googletagmanager\.com/);
});

test('GTM starts its data layer before loading and remains consent-controlled', () => {
  const source = fs.readFileSync(
    'src/components/consent/tracking-loader.tsx',
    'utf8',
  );

  assert.match(source, /prefs\.analytics \|\| prefs\.marketing/);
  assert.match(source, /"gtm\.start": Date\.now\(\)/);
  assert.match(source, /window\.__wddGtmLoaded = true/);
  assert.match(source, /window\.dispatchEvent\(new Event\("wdd:gtm-ready"\)\)/);
  assert.ok(
    source.indexOf('"gtm.start": Date.now()') <
      source.indexOf('src={`https://www.googletagmanager.com'),
    'dataLayer bootstrap should be declared before the GTM script',
  );
});

test('page views wait for GTM and retry when its queue is ready', () => {
  const source = fs.readFileSync(
    'src/components/consent/page-view-tracker.tsx',
    'utf8',
  );

  assert.match(source, /!window\.__wddGtmLoaded/);
  assert.match(source, /addEventListener\("wdd:gtm-ready", view\)/);
  assert.match(source, /removeEventListener\("wdd:gtm-ready", view\)/);
  assert.ok(
    source.lastIndexOf('trackEvent("wdd_page_view"') <
      source.indexOf('last.current = pathname;'),
    'a page path should only be marked sent after tracking is attempted',
  );
});

test('package and service query preselection is allowlisted', () => {
  const form = fs.readFileSync('src/components/forms/contact-form.tsx', 'utf8');
  assert.match(form, /packageBySlug\.get\(packageSlug\)/);
  assert.match(form, /serviceBySlug\.get\(requestedService\)/);
  assert.match(form, /SERVICES\.includes/);
  assert.match(form, /new URLSearchParams\(search\)/);
  assert.match(form, /useSyncExternalStore/);
  assert.doesNotMatch(form, /useSearchParams/);
});
