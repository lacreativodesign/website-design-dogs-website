import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 390, height: 844 } });

test("mobile menu opens, closes, and supports links", async ({ page }) => {
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open main menu" });
  await expect(opener).toBeVisible();

  await opener.click();
  await expect(
    page.getByRole("dialog", { name: "Mobile main navigation" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => getComputedStyle(document.body).overflow),
  ).toMatch(/hidden|clip/);

  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();

  await opener.click();
  await page
    .getByRole("navigation", { name: "Mobile primary navigation" })
    .getByRole("link", { name: "Contact Us" })
    .click();
  await expect(page).toHaveURL(/contact/);
});
