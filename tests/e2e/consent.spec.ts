import { expect, test } from "@playwright/test";

test("consent banner rejects, accepts, customizes, and reopens", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Your privacy choices" })).toBeVisible();
  await expect(page.getByRole("button", { name: /accept all/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /reject non-essential/i })).toBeVisible();

  await page.getByRole("button", { name: /reject non-essential/i }).click();

  expect(await page.evaluate(() => document.cookie)).toContain("wdd-consent");
  expect(await page.evaluate(() => window.dataLayer || [])).toEqual(
    expect.not.arrayContaining([expect.objectContaining({ event: "gtm.js" })]),
  );

  const cookieSettingsButton = page.getByRole("button", {
    name: /^cookie settings$/i,
  });
  await expect(cookieSettingsButton).toBeVisible();
  await cookieSettingsButton.click();

  const dialog = page.getByRole("dialog", { name: /cookie settings/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("checkbox", { name: "Enable Analytics Cookies" })).not.toBeChecked();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
