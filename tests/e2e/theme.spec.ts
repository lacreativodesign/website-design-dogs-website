import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/contact",
  "/campaigns/cleaning",
  "/privacy-policy",
];

for (const route of routes) {
  test(`dark launch theme is locked on ${route}`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("wdd-theme", "light");
    });

    await page.goto(route);

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(
      page.getByRole("button", { name: /switch to (light|dark) theme/i }),
    ).toHaveCount(0);
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme),
    ).toBe("dark");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
}
