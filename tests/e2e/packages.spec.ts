import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("packages show approved pricing, distinct choices, and active navigation", async ({ page }) => {
  await page.goto("/packages");
  await expect(page.getByRole("link", { name: "Packages" }).first()).toHaveAttribute("aria-current", "page");

  for (const [slug, price] of [["starter", "$499"], ["business", "$899"], ["growth", "$1,499"]] as const) {
    const card = page.locator(`[data-package="${slug}"]`);
    await expect(card).toContainText(price);
    await expect(card.getByRole("link", { name: "Order Now" })).toHaveAttribute("href", `/get-started?package=${slug}`);
    await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute("href", `/packages/${slug}`);
  }
});

test("comparison link, FAQ, package details, and form path are usable", async ({ page, request }) => {
  await page.goto("/packages");
  await page.getByRole("link", { name: "Compare Packages" }).click();
  const comparison = page.locator("#compare");
  await expect(comparison).toBeInViewport();
  const table = comparison.getByRole("table");
  await expect(table).toBeVisible();
  await expect(table.getByRole("columnheader", { name: "Feature", exact: true })).toBeVisible();

  const faq = page.getByRole("button", { name: "What is included in the one-time price?" });
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#package-faq-0")).toContainText(/project proposal/i);

  for (const [slug, price] of [["starter", "$499"], ["business", "$899"], ["growth", "$1,499"]] as const) {
    const response = await request.get(`/packages/${slug}`);
    expect(response.ok()).toBeTruthy();
    await page.goto(`/packages/${slug}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".package-detail-price")).toContainText(price);
    await expect(page.getByRole("link", { name: `Start with ${slug[0].toUpperCase()}${slug.slice(1)}` })).toHaveAttribute("href", `/get-started?package=${slug}`);
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const slug of ["starter", "business", "growth"]) {
    expect(sitemap).toContain(`/packages/${slug}`);
  }
});

test("packages mobile layout has no horizontal page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/packages");
  await expectNoOverflow(page);

  const packageButtons = page.locator("[data-package='starter'] .btn");
  await expect(packageButtons).toHaveCount(2);
  for (const button of await packageButtons.all()) {
    await expect(button).toHaveCSS("min-height", "44px");
  }
});
