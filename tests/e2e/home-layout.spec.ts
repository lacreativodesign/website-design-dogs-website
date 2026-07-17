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

const capabilities = [
  "Core Pages",
  "Responsive Layout",
  "Contact or Quote Form",
  "Foundation Setup",
  "Launch Support",
];

test("Home route matches locked content structure", async ({ page }) => {
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

  await expect(page.locator(".home-capability-tile")).toHaveCount(5);
  for (const capability of capabilities) {
    await expect(page.locator(".home-capability-tile", { hasText: capability })).toHaveCount(1);
  }

  await expect(page.locator(".home-ending")).toHaveCount(0);
  await expect(page.getByText("READY WHEN YOU ARE")).toHaveCount(0);
  await expect(page.getByText("STARTER WEBSITE FOUNDATION")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(0);
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

test("Home theme switches coordinated hero scene", async ({ page }) => {
  await page.goto("/");
  const darkHero = page.locator(".home-hero__scene .theme-scene__image-dark.theme-scene__desktop");
  const lightHero = page.locator(".home-hero__scene .theme-scene__image-light.theme-scene__desktop");
  await expect(darkHero).toHaveAttribute("src", /home-hero-dark/);
  await expect(lightHero).toHaveAttribute("src", /home-hero-light/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(darkHero).toBeVisible();

  await page.getByRole("button", { name: /Switch to light theme/i }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(lightHero).toBeVisible();
  await expectNoOverflow(page);
});
