import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("Portfolio presents twelve borderless portrait design concepts", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator("[data-concept-id]")).toHaveCount(12);
  await expect(page.locator(".portfolio-thumbnail")).toHaveCount(12);
  await expect(page.locator(".portfolio-thumbnail").first()).toHaveCSS("border-top-width", "0px");
  await expect(page.locator(".portfolio-filter__tab--active")).toHaveText("All");
  await expect(page.getByRole("link", { name: "Portfolio" }).first()).toHaveAttribute("aria-current", "page");
  await expectNoOverflow(page);
});

test("Portfolio gallery supports keyboard controls, wrapping, and focus restoration", async ({ page }) => {
  await page.goto("/portfolio");
  const first = page.locator(".portfolio-thumbnail").first();
  await first.focus();
  await first.press("Enter");
  const dialog = page.locator(".portfolio-lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("1 of 12")).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("12 of 12")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("1 of 12")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(first).toBeFocused();
});

test("Portfolio filter supports clicks and roving keyboard selection", async ({ page }) => {
  await page.goto("/portfolio");
  const tabs = page.getByRole("tablist", { name: "Portfolio concept filters" });
  const healthAndWellness = tabs.getByRole("tab", { name: "Health & Wellness", exact: true });
  await healthAndWellness.click();
  await expect(healthAndWellness).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-concept-id]")).toHaveCount(2);
  await expect(page.locator("#portfolio-panel")).toHaveAttribute("data-active-filter", "Health & Wellness");
  await healthAndWellness.press("ArrowRight");
  const retailAndHospitality = tabs.getByRole("tab", { name: "Retail & Hospitality", exact: true });
  await expect(retailAndHospitality).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-concept-id]")).toHaveCount(3);
  await page.setViewportSize({ width: 320, height: 720 });
  await expectNoOverflow(page);
});
