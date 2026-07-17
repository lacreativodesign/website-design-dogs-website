import { expect, test } from "@playwright/test";

test("consent banner rejects, accepts, customizes, and reopens", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/cookie|consent/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /accept all/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /reject optional/i })).toBeVisible();

  await page.getByRole("button", { name: /reject optional/i }).click();

  expect(await page.evaluate(() => document.cookie)).toContain("wdd-consent");
  expect(await page.evaluate(() => window.dataLayer || [])).toEqual(
    expect.not.arrayContaining([expect.objectContaining({ event: "gtm.js" })]),
  );

  // The approved Home layout intentionally has no standard footer. Navigate to a
  // normal route where the footer exposes the persistent Cookie Settings control.
  await page.goto("/services");
  const cookieSettingsButton = page.getByRole("button", {
    name: /^cookie settings$/i,
  });
  await expect(cookieSettingsButton).toBeVisible();
  await cookieSettingsButton.click();

  const dialog = page.getByRole("dialog", { name: /cookie settings/i });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
