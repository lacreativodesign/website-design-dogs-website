import { expect, test } from "@playwright/test";

const consentCookie = "wdd-consent-v2";
const optionalRequest = /googletagmanager|google-analytics|analytics\.google|connect\.facebook|facebook\.com\/tr/;

test("first visit shows a compact non-blocking banner and makes no optional request", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => { if (optionalRequest.test(request.url())) requests.push(request.url()); });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const banner = page.getByRole("region", { name: /privacy choices/i });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Reject optional" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Settings" })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Accept optional" })).toBeVisible();
  const [bannerBox, heroCtaBox] = await Promise.all([banner.boundingBox(), page.getByRole("link", { name: /get started|free quote/i }).first().boundingBox()]);
  expect(bannerBox).not.toBeNull(); expect(heroCtaBox).not.toBeNull();
  expect((bannerBox?.y ?? 0) + (bannerBox?.height ?? 0)).toBeGreaterThan((heroCtaBox?.y ?? 0) + (heroCtaBox?.height ?? 0));
  expect(requests).toEqual([]);
});

test("reject persists across navigation and reload while optional tags stay denied", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => { if (optionalRequest.test(request.url())) requests.push(request.url()); });
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await expect(page.getByRole("region", { name: /privacy choices/i })).toHaveCount(0);
  expect(await page.evaluate(() => document.cookie)).toContain(consentCookie);
  await page.goto("/services"); await page.reload();
  await expect(page.getByRole("region", { name: /privacy choices/i })).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("accept persists and grants analytics and advertising consent", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Accept optional" }).click();
  await expect(page.getByRole("region", { name: /privacy choices/i })).toHaveCount(0);
  const saved = await page.evaluate(() => decodeURIComponent(document.cookie.split("; ").find((item) => item.startsWith("wdd-consent-v2="))?.split("=")[1] ?? ""));
  expect(saved).toContain('"decision":"accepted"'); expect(saved).toContain('"analytics":true'); expect(saved).toContain('"marketing":true');
  await page.reload();
  await expect(page.getByRole("region", { name: /privacy choices/i })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.dataLayer?.some((entry) => Array.from(entry as unknown as ArrayLike<unknown>).some((value) => typeof value === "object" && value !== null && (value as { analytics_storage?: string }).analytics_storage === "granted" && (value as { ad_storage?: string }).ad_storage === "granted")) ?? false)).toBe(true);
});

test("settings saves a customized category selection and footer reopens the dialog", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Privacy choices", exact: true });
  await expect(banner).toBeVisible();
  const settingsButton = banner.getByRole("button", { name: "Settings", exact: true });
  await settingsButton.click();
  const dialog = page.getByRole("dialog", { name: /privacy choices/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("checkbox", { name: "Allow analytics" }).check();
  await dialog.getByRole("checkbox", { name: "Allow advertising" }).uncheck();
  await dialog.getByRole("button", { name: "Save preferences" }).click();
  await expect(dialog).toHaveCount(0);
  expect(await page.evaluate(() => decodeURIComponent(document.cookie))).toContain('"decision":"customized"');
  await page.getByRole("button", { name: "Cookie Settings" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("checkbox", { name: "Allow analytics" })).toBeChecked();
  await expect(dialog.getByRole("checkbox", { name: "Allow advertising" })).not.toBeChecked();
});

test("Global Privacy Control persists a denied choice and is disclosed in settings", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "globalPrivacyControl", { configurable: true, value: true }));
  await page.goto("/");
  await expect(page.getByRole("region", { name: /privacy choices/i })).toHaveCount(0);
  expect(await page.evaluate(() => decodeURIComponent(document.cookie))).toContain('"decision":"rejected"');
  await page.getByRole("button", { name: "Cookie Settings" }).click();
  await expect(page.getByRole("status")).toContainText(/Global Privacy Control/i);
});

for (const width of [1440, 390, 320]) test(`privacy choices remain keyboard-operable at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 }); await page.goto("/");
  const banner = page.getByRole("region", { name: "Privacy choices", exact: true });
  await expect(banner).toBeVisible();
  const settingsButton = banner.getByRole("button", { name: "Settings", exact: true });
  await settingsButton.focus(); await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: /privacy choices/i });
  await expect(dialog).toBeVisible(); await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0); await expect(settingsButton).toBeFocused();
});
