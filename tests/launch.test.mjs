import assert from 'node:assert/strict'; import fs from 'node:fs'; import test from 'node:test';
test('sitemap excludes campaigns and api',()=>{const s=fs.readFileSync('src/app/sitemap.ts','utf8'); assert.match(s,/privacy-policy/); assert.doesNotMatch(s,/campaigns/); assert.doesNotMatch(s,/api/);});
test('robots disallows api only',()=>{const s=fs.readFileSync('src/app/robots.ts','utf8'); assert.match(s,/disallow: "\/api\/"/); assert.doesNotMatch(s,/campaigns/);});
test('tracking sanitizer drops forbidden fields',()=>{const s=fs.readFileSync('src/lib/tracking/events.ts','utf8'); assert.match(s,/allowedEventFields/); assert.doesNotMatch(s,/email|phone|fullName|referenceId|submissionId/);});
test('consent cookie does not store pii',()=>{const s=fs.readFileSync('src/components/consent/consent-types.ts','utf8'); assert.match(s,/wdd-consent-v1/); assert.doesNotMatch(s,/email|phone|name|business/);});
test('metadata has indexing enabled globally and verification guarded',()=>{const s=fs.readFileSync('src/lib/metadata.ts','utf8'); assert.match(s,/robots: \{ index: true, follow: true \}/); assert.match(s,/isValidVerification/);});
