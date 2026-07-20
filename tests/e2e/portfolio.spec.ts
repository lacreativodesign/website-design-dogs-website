import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("Portfolio presents twelve explicitly labelled design concepts", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator("[data-concept-id]")).toHaveCount(12);
  await expect(page.locator(".portfolio-concept-card__label")).toHaveCount(12);
  await expect(page.locator(".portfolio-filter__tab--active")).toHaveText("All");
  await expect(page.getByRole("link", { name: "Portfolio" }).first()).toHaveAttribute("aria-current", "page");
  await expectNoOverflow(page);
});

test("Portfolio filter supports clicks and roving keyboard selection", async ({ page }) => {
  await page.goto("/portfolio");
  const tabs = page.getByRole("tablist", { name: "Portfolio concept filters" });
  await tabs.getByRole("tab", { name: "Health & Wellness" }).click();
  await expect(page.locator("[data-concept-id]")).toHaveCount(2);
  await expect(page.locator("#portfolio-panel")).toHaveAttribute("data-active-filter", "Health & Wellness");
  await tabs.getByRole("tab", { name: "Health & Wellness" }).press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "Retail & Hospitality" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-concept-id]")).toHaveCount(3);
  await page.setViewportSize({ width: 320, height: 720 });
  await expectNoOverflow(page);
});
