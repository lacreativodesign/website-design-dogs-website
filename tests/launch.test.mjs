import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("sitemap excludes campaigns and api", () => {
  const source = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert.match(source, /privacy-policy/);
  assert.doesNotMatch(source, /campaigns/);
  assert.doesNotMatch(source, /api/);
});

test("robots disallows api only", () => {
  const source = fs.readFileSync("src/app/robots.ts", "utf8");
  assert.match(source, /disallow: "\/api\/"/);
  assert.doesNotMatch(source, /campaigns/);
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
  assert.match(source, /wdd-consent-v1/);
  assert.doesNotMatch(source, /email|phone|name|business/);
});

test("global metadata avoids conflicting robots directives and guards verification", () => {
  const source = fs.readFileSync("src/lib/metadata.ts", "utf8");
  assert.doesNotMatch(source, /robots\s*:\s*\{[^}]*noindex/i);
  assert.doesNotMatch(source, /robots\s*:\s*\{[^}]*index\s*:\s*true/i);
  assert.match(source, /isValidVerification/);
});
