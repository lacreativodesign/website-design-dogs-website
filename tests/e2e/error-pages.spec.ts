import { expect, test } from "@playwright/test";

test("404 is branded and safe", async ({ page }) => {
  const response = await page.goto("/definitely-missing-route");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /looks like this page wandered off/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
  await expect(page.getByText(/stack|trace|secret|api key/i)).toHaveCount(0);
});
