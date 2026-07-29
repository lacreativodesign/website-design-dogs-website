import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("shared header and transparent logo system stay consistent", async ({ page }) => {
  for (const route of ["/", "/services", "/portfolio", "/packages"]) {
    await page.goto(route);
    const header = page.locator(".site-header");
    await expect(header).toBeVisible();
    await expect(header).not.toHaveClass(/site-header--home/);
    await expect(header.locator(".brand-logo img")).toHaveAttribute("src", /wdd-logo-dark\.svg/);
  }

  await page.goto("/campaigns/cleaning");
  await expect(page.locator(".campaign-header")).toBeVisible();
  await expect(page.locator(".campaign-header .brand-logo img")).toHaveAttribute("src", /wdd-logo-dark\.svg/);
});

test("home conversion polish uses icons, stable numerals, and complete package actions", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".home-trust-strip article > svg")).toHaveCount(4);
  await expect(page.locator(".home-process__grid article > svg")).toHaveCount(5);
  await expect(page.locator(".home-industries-grid .home-industry-card > svg")).toHaveCount(8);

  const sectionNumbers = page.locator(".home-section__heading--numbered > span");
  await expect(sectionNumbers).toHaveCount(5);
  for (const number of await sectionNumbers.all()) {
    await expect(number).toHaveCSS("white-space", "nowrap");
    const box = await number.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(box?.height ?? Infinity);
  }

  const portfolioCta = page.locator(".home-section__cta");
  await expect(portfolioCta.getByRole("link", { name: /view full portfolio/i })).toBeVisible();
  await expect(portfolioCta).toHaveCSS("justify-content", "center");

  for (const slug of ["starter", "business", "growth"]) {
    const card = page.locator(`[data-package="${slug}"]`);
    await expect(card.getByRole("link", { name: "Order Now" })).toHaveAttribute("href", `/get-started?package=${slug}`);
    await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute("href", `/packages/${slug}`);
  }

  await expect(page.locator(".home-value-rail .value-benefit-tile")).toHaveCount(5);
  await expect(page.getByRole("link", { name: /view all packages/i })).toHaveAttribute("href", "/packages");
  await expectNoOverflow(page);
});

test("package directory exposes order and detail paths for every package", async ({ page }) => {
  await page.goto("/packages");

  for (const slug of ["starter", "business", "growth"]) {
    const card = page.locator(`[data-package="${slug}"]`);
    await expect(card.getByRole("link", { name: "Order Now" })).toHaveAttribute("href", `/get-started?package=${slug}`);
    await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute("href", `/packages/${slug}`);
  }

  await expect(page.locator(".packages-value-rail .value-benefit-tile")).toHaveCount(5);
  await expect(page.locator(".packages-section-heading > span").first()).toHaveCSS("white-space", "nowrap");
  await expectNoOverflow(page);
});
