import { expect, test } from "@playwright/test";
import {
  allPackages,
  packageCategories,
  packageFaqs,
  websitePackages,
} from "../../src/content/packages";
import { expectNoOverflow } from "./helpers";

test("all 21 approved packages are reachable from the six category tabs", async ({ page }) => {
  await page.goto("/packages");
  await expect(page.getByRole("link", { name: "Packages" }).first()).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator(".package-tab")).toHaveCount(6);

  for (const category of packageCategories) {
    const tab = page.getByRole("button", {
      name: category.shortTitle,
      exact: true,
    });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-pressed", "true");
    const grid = page.locator(`.packages-card-grid[data-category="${category.slug}"]`);
    await expect(grid.locator(".packages-card")).toHaveCount(category.packages.length);

    for (const item of category.packages) {
      const card = grid.locator(`[data-package="${item.slug}"]`);
      await expect(card).toContainText(item.price);
      await expect(
        card.getByRole("link", { name: `Start with ${item.name}` }),
      ).toHaveAttribute("href", item.quoteHref);
      await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  }
});

test("comparison, FAQ, detail pages, and guided brief paths are usable", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  await page.goto("/packages");
  await page.getByRole("link", { name: "Compare Website Tiers" }).click();
  const comparison = page.locator("#compare");
  await expect(comparison).toBeInViewport();
  const table = comparison.getByRole("table");
  await expect(table).toBeVisible();
  await expect(table.getByRole("columnheader", { name: "Scope", exact: true })).toBeVisible();
  for (const item of websitePackages) {
    await expect(table.getByRole("columnheader", { name: new RegExp(item.name) })).toBeVisible();
  }

  const [question, answer] = packageFaqs[0]!;
  const faq = page.getByRole("button", { name: question });
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(answer)).toBeVisible();

  for (const item of allPackages) {
    const response = await request.get(item.href);
    expect(response.ok(), item.href).toBeTruthy();
  }

  for (const category of packageCategories) {
    const item = category.packages[0]!;
    await page.goto(item.href);
    await expect(page.locator("h1")).toHaveText(item.tagline);
    await expect(page.locator(".package-detail-price")).toContainText(item.price);
    await expect(
      page.getByRole("link", { name: `Start with ${item.name}` }),
    ).toHaveAttribute("href", item.quoteHref);
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const item of allPackages) expect(sitemap).toContain(item.href);
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
