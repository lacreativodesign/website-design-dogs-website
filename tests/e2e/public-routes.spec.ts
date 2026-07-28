import { expect, test } from "@playwright/test";
import {
  campaignRoutes,
  expectNoOverflow,
  noConsoleFailures,
  publicRoutes,
} from "./helpers";

for (const route of [...publicRoutes, ...campaignRoutes]) {
  test(`${route} renders`, async ({ page }) => {
    const errors = await noConsoleFailures(page);
    const response = await page.goto(route);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("#main-content h1")).toHaveCount(1);
    await expectNoOverflow(page);
    expect(errors).toEqual([]);
  });
}

test("machine-readable discovery resources render", async ({ page }) => {
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.webmanifest",
    "/llms.txt",
    "/llms-full.txt",
  ]) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    expect(await page.textContent("body")).toBeTruthy();
  }
});
