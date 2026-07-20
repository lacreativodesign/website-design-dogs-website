import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("Home route provides the approved conversion sequence", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /WE DESIGN WEBSITES THAT DELIVER RESULTS\./ })).toBeVisible();
  await expect(page.getByText("Custom websites that look incredible, load fast, rank higher, and convert visitors into customers.")).toBeVisible();
  await expect(page.locator(".home-trust-strip article")).toHaveCount(4);
  await expect(page.locator(".home-process__grid article")).toHaveCount(5);
  await expect(page.locator(".home-portfolio-grid .portfolio-thumbnail")).toHaveCount(6);

  const starter = page.locator('[data-package="starter"]');
  const business = page.locator('[data-package="business"]');
  const growth = page.locator('[data-package="growth"]');
  await expect(starter).toContainText("$499");
  await expect(business).toContainText("$899");
  await expect(growth).toContainText("$1,499");
  await expect(business).toHaveClass(/home-package-card--featured/);
  await expect(page.locator(".home-testimonial-placeholder")).toHaveCount(3);
  await expect(page.getByText("Verified client feedback will appear here.")).toHaveCount(3);
  await expect(page.getByLabel("Full name")).toBeVisible();
  await expect(page.getByLabel("Service needed")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Enquiry" })).toBeVisible();
  await expectNoOverflow(page);
});

test("Home route is usable at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /WE DESIGN WEBSITES THAT DELIVER RESULTS\./ })).toBeVisible();
  await expect(page.locator('[data-package="business"]')).toBeVisible();
  await expectNoOverflow(page);
});

test("Footer renders on standard internal routes", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator(".site-footer")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Legal navigation" })).toBeVisible();
});
