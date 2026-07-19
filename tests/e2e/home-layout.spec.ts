import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const industries = [
  "Home Services",
  "Professional Services",
  "Health & Wellness",
  "Retail",
  "Hospitality",
  "Growing Businesses",
];

const services = [
  "Custom Website Design",
  "Website Development",
  "E-Commerce Solutions",
  "SEO & Local Optimization",
  "Website Care",
];

test("Home route provides the conversion sequence", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /WE DESIGN WEBSITES\s+THAT DELIVER RESULTS\./ })).toBeVisible();
  await expect(page.getByText("Custom websites that look amazing, work flawlessly, and help your business grow online.")).toBeVisible();
  await expect(page.getByRole("link", { name: /Get a Free Quote/i }).first()).toHaveAttribute("href", "/get-started");
  await expect(page.getByRole("link", { name: /View Our Work/i })).toHaveAttribute("href", "/portfolio");

  await expect(page.locator(".home-industry-strip__item")).toHaveCount(6);
  for (const industry of industries) {
    await expect(page.locator(".home-industry-strip__item", { hasText: industry })).toHaveCount(1);
  }

  await expect(page.locator(".home-service-card")).toHaveCount(5);
  for (const service of services) {
    await expect(page.locator(".home-service-card", { hasText: service })).toHaveCount(1);
  }

  await expect(page.locator(".home-portfolio-grid .portfolio-concept-card")).toHaveCount(6);
  await expect(page.locator(".home-portfolio-grid .portfolio-concept-card__label")).toHaveCount(6);
  await expect(page.locator(".home-package-card")).toHaveCount(3);
  await expect(page.locator(".home-package-card", { hasText: "Starter" })).toContainText("$499");
  await expect(page.locator(".home-package-card", { hasText: "Business" })).toContainText("$899");
  await expect(page.locator(".home-package-card", { hasText: "Growth" })).toContainText("$1,499");
  await expect(page.getByRole("heading", { name: "Tell Us What You Need" })).toBeVisible();
  await expect(page.locator(".site-footer")).toBeVisible();

  await expect(page.locator(".home-ending")).toHaveCount(0);
  await expect(page.getByText("READY WHEN YOU ARE")).toHaveCount(0);
  await expect(page.getByText("STARTER WEBSITE FOUNDATION")).toHaveCount(0);
  await expect(page.getByText(/trusted by/i)).toHaveCount(0);
  await expect(page.getByText(/logogipsum/i)).toHaveCount(0);
  await expect(page.getByText(/123 Main/i)).toHaveCount(0);
  await expect(page.getByText(/500\+|1,000\+|98%|24\/7/)).toHaveCount(0);
  await expectNoOverflow(page);
});

test("Footer renders on standard internal routes", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator(".site-footer")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Legal navigation" })).toBeVisible();
});

test("Home theme keeps its CSS-only hero placeholder", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator(".home-hero__scene.theme-scene--placeholder");
  await expect(hero).toBeVisible();
  await expect(hero.locator("img")).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: /Switch to light theme/i }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(hero).toBeVisible();
  await expectNoOverflow(page);
});
