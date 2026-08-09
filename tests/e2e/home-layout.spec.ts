import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const homeHeading = /WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESS\./i;

test("Home route provides the approved services-first conversion sequence", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: homeHeading })).toBeVisible();
  await expect(
    page.getByText(
      "Websites, commerce, search, social, apps, and ongoing support—organized around clear scope, practical ownership, and useful next steps.",
    ),
  ).toBeVisible();
  await expect(page.locator(".home-trust-strip article")).toHaveCount(4);
  await expect(page.locator(".home-services-final__grid .home-service-final-card")).toHaveCount(10);
  await expect(page.locator(".home-process__grid article")).toHaveCount(5);
  await expect(page.locator(".home-industries-grid .home-industry-card")).toHaveCount(8);
  await expect(page.locator(".home-portfolio-grid .portfolio-thumbnail")).toHaveCount(6);
  await expect(page.locator(".home-packages .package-tab")).toHaveCount(6);

  const featured = [
    ["starter", "$499"],
    ["business", "$1,099"],
    ["premium", "$2,499"],
  ] as const;
  for (const [slug, price] of featured) {
    await expect(page.locator(`[data-package="${slug}"]`)).toContainText(price);
  }
  await expect(page.locator('[data-package="business"]')).toHaveClass(/packages-card--recommended/);

  await expect(page.locator(".home-testimonial-placeholder")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /what our clients say/i })).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: /^Full name/ })).toBeVisible();
  await expect(page.getByRole("combobox", { name: /^Service needed/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Enquiry" })).toBeVisible();
  await expectNoOverflow(page);
});

test("Home route is usable at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: homeHeading })).toBeVisible();
  await expect(page.locator('[data-package="business"]')).toBeVisible();
  await expectNoOverflow(page);
});

test("Footer renders on standard internal routes", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator(".site-footer")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Legal navigation" })).toBeVisible();
});
