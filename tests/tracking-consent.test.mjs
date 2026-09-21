import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

function loadModule(path, dependencies, globals = {}) {
  const source = fs.readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: path,
  }).outputText;
  const moduleShim = { exports: {} };
  vm.runInNewContext(compiled, {
    module: moduleShim,
    exports: moduleShim.exports,
    require: (name) => {
      if (!(name in dependencies)) throw new Error(`Unexpected import: ${name}`);
      return dependencies[name];
    },
    ...globals,
  }, { filename: path });
  return moduleShim.exports;
}

function makeWindow() {
  const listeners = new Map();
  return {
    dataLayer: [],
    __wddGtmLoaded: true,
    addEventListener(name, handler) {
      const handlers = listeners.get(name) || new Set();
      handlers.add(handler);
      listeners.set(name, handlers);
    },
    removeEventListener(name, handler) { listeners.get(name)?.delete(handler); },
    dispatchEvent(event) {
      for (const handler of listeners.get(event.type) || []) handler(event);
    },
  };
}

for (const [name, prefs, allowed] of [
  ["no optional consent", { analytics: false, marketing: false }, false],
  ["analytics only", { analytics: true, marketing: false }, true],
  ["marketing only", { analytics: false, marketing: true }, true],
  ["both optional categories", { analytics: true, marketing: true }, true],
]) {
  test(`PageView and Lead event consent: ${name}`, () => {
    const window = makeWindow();
    const events = loadModule("src/lib/tracking/events.ts", {
      "@/components/consent/consent-storage": { readConsent: () => prefs },
    }, {
      window,
      CustomEvent: class {
        constructor(type, options) { this.type = type; this.detail = options.detail; }
      },
    });
    const eventId = "123e4567-e89b-42d3-a456-426614174000";
    events.trackEvent("wdd_page_view", { pagePath: "/contact" });
    events.trackEvent("wdd_lead_success", { eventId, email: "private@example.com" });
    assert.equal(window.dataLayer.length, allowed ? 2 : 0);
    if (allowed) {
      assert.equal(window.dataLayer[0].event, "wdd_page_view");
      assert.equal(window.dataLayer[1].event, "wdd_lead_success");
      assert.equal(window.dataLayer[1].eventId, eventId);
      assert.equal("email" in window.dataLayer[1], false);
    }
    // Analytics-only visitors must not accidentally gain marketing consent.
    assert.equal(prefs.marketing, name === "marketing only" || name === "both optional categories");
  });
}

test("successful lead queues while GTM readiness is still pending", () => {
  const window = makeWindow();
  window.dataLayer = undefined;
  window.__wddGtmLoaded = false;
  const events = loadModule("src/lib/tracking/events.ts", {
    "@/components/consent/consent-storage": {
      readConsent: () => ({ analytics: false, marketing: true }),
    },
  }, {
    window,
    CustomEvent: class {
      constructor(type, options) { this.type = type; this.detail = options.detail; }
    },
  });

  const eventId = "123e4567-e89b-42d3-a456-426614174000";
  events.trackEvent("wdd_lead_success", { eventId, email: "private@example.com" });

  assert.equal(Array.isArray(window.dataLayer), true);
  assert.equal(window.dataLayer.length, 1);
  assert.equal(window.dataLayer[0].event, "wdd_lead_success");
  assert.equal(window.dataLayer[0].eventId, eventId);
  assert.equal("email" in window.dataLayer[0], false);
});

test("PageView waits for consent and GTM, then emits once per route", () => {
  let prefs = { analytics: false, marketing: false };
  let pathname = "/";
  const window = makeWindow();
  window.__wddGtmLoaded = false;
  const sent = [];
  const refs = [];
  let refIndex = 0;
  let cleanup;
  const tracker = loadModule("src/components/consent/page-view-tracker.tsx", {
    react: {
      useRef(initial) {
        const index = refIndex++;
        return refs[index] || (refs[index] = { current: initial });
      },
      useEffect(callback) { cleanup = callback(); },
    },
    "next/navigation": { usePathname: () => pathname },
    "@/lib/tracking/events": { trackEvent: (name, payload) => sent.push({ name, ...payload }) },
    "./consent-storage": { readConsent: () => prefs },
  }, {
    window,
    process: { env: { NEXT_PUBLIC_ENABLE_GTM: "true" } },
  });
  const render = () => {
    cleanup?.();
    refIndex = 0;
    tracker.PageViewTracker();
  };
  const dispatch = (type) => window.dispatchEvent({ type });

  render();
  assert.equal(sent.length, 0);
  prefs = { analytics: false, marketing: true };
  dispatch("wdd:consent-updated");
  assert.equal(sent.length, 0, "GTM must be ready before queuing a page view");
  window.__wddGtmLoaded = true;
  dispatch("wdd:gtm-ready");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].pagePath, "/");
  dispatch("wdd:gtm-ready");
  dispatch("wdd:consent-updated");
  assert.equal(sent.length, 1, "repeated readiness and consent updates must not duplicate the route");

  pathname = "/campaigns/example";
  render();
  assert.equal(sent.length, 2);
  assert.equal(sent[1].pageType, "campaign");
  assert.equal(sent[1].campaignSlug, "example");

  prefs = { analytics: false, marketing: false };
  pathname = "/contact";
  render();
  assert.equal(sent.length, 2, "revoked consent must stop new page views");
  prefs = { analytics: true, marketing: false };
  dispatch("wdd:consent-updated");
  assert.equal(sent.length, 3);
  assert.equal(sent[2].pagePath, "/contact");
});
