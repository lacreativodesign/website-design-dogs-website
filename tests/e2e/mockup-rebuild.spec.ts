import { expect, test } from "@playwright/test";

test("mockup page card counts and factual guardrails", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="home-service-card"]')).toHaveCount(5);
  await expect(page.locator('[data-testid="home-capability-tile"]')).toHaveCount(5);
  await expect(page.locator('[data-mockup-hero="integrated-scene"]')).toBeVisible();
  await page.goto("/services");
  await expect(page.locator('[data-testid="service-card"]')).toHaveCount(8);
  await page.goto("/portfolio");
  await expect(page.locator('[data-testid="portfolio-concept-card"]')).toHaveCount(12);
  await expect(page.getByText("DESIGN CONCEPT")).toHaveCount(12);
  await page.goto("/packages");
  await expect(page.locator('[data-testid="pricing-card"]')).toHaveCount(3);
  await page.goto("/about");
  await expect(page.locator('[data-testid="about-checklist-point"]')).toHaveCount(4);
  await expect(page.locator('[data-testid="about-capability-tile"]')).toHaveCount(4);
  await page.goto("/faq");
  await expect(page.locator('[data-testid="faq-accordion-row"]')).toHaveCount(8);
  await page.goto("/privacy-policy");
  await expect(page.locator('[data-testid="privacy-policy-group"]')).toHaveCount(5);
  await page.goto("/terms-and-conditions");
  await expect(page.locator('[data-testid="terms-policy-group"]')).toHaveCount(5);
  await page.goto("/contact");
  await expect(page.getByText("Prompt 5")).toHaveCount(0);
});

test("404 has one primary CTA and no full footer", async ({ page }) => {
  await page.goto("/pixel-perfect-missing-page-test");
  await expect(page.getByRole("link", { name: "Back to Home" })).toHaveCount(1);
  await expect(page.locator('[data-full-footer="compact"], .site-footer')).toHaveCount(0);
});
