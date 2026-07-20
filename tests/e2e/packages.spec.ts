import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("packages show approved pricing, distinct choices, and active navigation", async ({ page }) => {
  await page.goto("/packages");
  await expect(page.getByRole("link", { name: "Packages" }).first()).toHaveAttribute("aria-current", "page");

  for (const [slug, price, href] of [["starter", "$499", "/contact?package=starter"], ["business", "$899", "/contact?package=business"], ["growth", "$1,499", "/contact?package=growth"]] as const) {
    const card = page.locator(`[data-package="${slug}"]`);
    await expect(card).toContainText(price);
    await expect(card.getByRole("link", { name: new RegExp(`Choose ${slug}`, "i") })).toHaveAttribute("href", href);
  }
});

test("comparison link, FAQ, package preselection, and form are usable", async ({ page }) => {
  await page.goto("/packages");
  await page.getByRole("link", { name: "Compare Packages" }).click();
  await expect(page.locator("#compare")).toBeInViewport();
  await expect(page.getByRole("columnheader", { name: "Feature" })).toBeVisible();

  const faq = page.getByRole("button", { name: "What is included in the one-time price?" });
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#package-faq-0")).toContainText(/project proposal/i);

  await page.goto("/packages?package=business");
  await page.getByRole("link", { name: "Choose Business" }).click();
  await expect(page).toHaveURL(/contact\?package=business/);
  await expect(page.getByRole("textbox", { name: "Project summary *" })).toHaveValue(/Business — \$899/);
  await expect(page.getByRole("combobox", { name: "Service needed *" })).toHaveValue("New Website");
});

test("packages mobile layout has no horizontal page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/packages");
  await expectNoOverflow(page);
  await expect(page.locator("[data-package='starter'] .btn")).toHaveCSS("min-height", "40px");
});
