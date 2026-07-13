import { expect, test } from "@playwright/test";
import { campaignRoutes } from "./helpers";

for (const route of campaignRoutes) {
  test(`${route} campaign content and pricing`, async ({ page }) => {
    const response = await page.goto(
      `${route}?price=1&offer=free&savings=9999`,
    );

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("#main-content h1")).toHaveCount(1);
    await expect(page.locator("#main-content h1")).toBeVisible();
    await expect(page.locator("body")).toContainText("$499");
    await expect(page.locator("body")).toContainText("$249");
    await expect(page.locator("body")).toContainText("$250");
    await expect(page.locator(".badge", { hasText: "DESIGN CONCEPT" })).toHaveCount(1);
    await expect(page.locator("body")).toContainText(
      /not presented as a completed client project/i,
    );
    await expect(page.locator("#campaign-form")).toHaveCount(1);
    await expect(page.locator("#offer-details")).toHaveCount(1);
    await expect(page.locator("[data-countdown]")).toHaveCount(0);
    await expect(page.getByText(/only\s+\d+\s+(spots|places)\s+left/i)).toHaveCount(0);
    await expect(page.getByText(/offer expires/i)).toHaveCount(0);

    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
    expect(robots.some((value) => /noindex/i.test(value))).toBeTruthy();
  });
}

test("unknown campaign returns 404", async ({ page }) => {
  const response = await page.goto("/campaigns/not-real");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /looks like this page wandered off/i,
    }),
  ).toBeVisible();
});
