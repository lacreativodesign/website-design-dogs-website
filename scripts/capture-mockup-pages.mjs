import { chromium } from "playwright";
import fs from "node:fs/promises";

const routes = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  packages: "/packages",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  "404": "/pixel-perfect-missing-page-test",
};
const base = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";

await fs.rm("test-results/visual/current", { recursive: true, force: true });
const browser = await chromium.launch();
try {
  for (const theme of ["dark", "light"]) {
    await fs.mkdir(`test-results/visual/current/${theme}`, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
    await page.addInitScript((selectedTheme) => {
      document.documentElement.dataset.theme = selectedTheme;
      localStorage.setItem("wdd-theme", selectedTheme);
      localStorage.setItem("wdd-consent-v1", JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString() }));
      window.__WDD_DISABLE_LEAD_SUBMISSION__ = true;
    }, theme);
    for (const [name, route] of Object.entries(routes)) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}" });
      await page.evaluate(async () => {
        await document.fonts?.ready;
        await Promise.all(Array.from(document.images).map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); })));
      });
      await page.screenshot({ path: `test-results/visual/current/${theme}/${name}.png`, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("Mockup page screenshots captured to test-results/visual/current.");
