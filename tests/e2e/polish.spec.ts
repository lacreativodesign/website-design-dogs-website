import { expect, test } from "@playwright/test";
import { packageCategories } from "../../src/content/packages";
import { expectNoOverflow } from "./helpers";

const approvedShieldSource =
  /(?:\/|%2F)brand(?:\/|%2F)identity(?:\/|%2F)wdd-shield-black-glasses-512\.webp(?:[?&]|$)/i;

test("shared header uses the rebuilt mark with a live wordmark", async ({ page }) => {
  for (const route of ["/", "/services", "/portfolio", "/packages"]) {
    await page.goto(route);
    const header = page.locator(".site-header");
    await expect(header).toBeVisible();
    await expect(header).not.toHaveClass(/site-header--home/);
    await expect(header.locator(".brand-logo__mark")).toHaveAttribute(
      "src",
      approvedShieldSource,
    );
    await expect(header.locator(".brand-logo__wordmark")).toContainText(
      /Website Design\s*Dogs/,
    );
  }

  await page.goto("/campaigns/cleaning");
  await expect(page.locator(".campaign-header")).toBeVisible();
  await expect(page.locator(".campaign-header .brand-logo__mark")).toHaveAttribute(
    "src",
    approvedShieldSource,
  );
});

test("home conversion system uses stable numerals, service icons, and complete actions", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".home-trust-strip article > svg")).toHaveCount(4);
  await expect(page.locator(".home-services-final__grid .home-service-final-card > img")).toHaveCount(10);
  await expect(page.locator(".home-process__grid article > svg")).toHaveCount(5);
  await expect(page.locator(".home-industries-grid .home-industry-card > svg")).toHaveCount(8);

  const sectionNumbers = page.locator(".home-section__heading--numbered > span");
  await expect(sectionNumbers).toHaveCount(7);
  for (const number of await sectionNumbers.all()) {
    await expect(number).toHaveCSS("white-space", "nowrap");
    const box = await number.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(box?.height ?? Infinity);
  }

  await expect(page.getByRole("link", { name: /browse the portfolio/i })).toBeVisible();
  for (const slug of ["starter", "business", "premium"]) {
    const item = packageCategories[0]!.packages.find((pkg) => pkg.slug === slug)!;
    const card = page.locator(`[data-package="${slug}"]`);
    await expect(
      card.getByRole("link", { name: "Order Now" }),
    ).toHaveAttribute("href", item.quoteHref);
    await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute(
      "href",
      item.href,
    );
  }

  await expect(
    page.getByRole("link", { name: /view all packages/i }),
  ).toHaveAttribute("href", "/packages#package-options");
  await expectNoOverflow(page);
});

test("package directory exposes actions and detail paths for every category", async ({ page }) => {
  await page.goto("/packages");

  for (const category of packageCategories) {
    await page.getByRole("button", { name: category.shortTitle, exact: true }).click();
    for (const item of category.packages) {
      const card = page.locator(`[data-package="${item.slug}"]`);
      await expect(
        card.getByRole("link", { name: "Order Now" }),
      ).toHaveAttribute("href", item.quoteHref);
      await expect(card.getByRole("link", { name: "View Details" })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  }

  await expect(page.locator(".packages-value-rail .value-benefit-tile")).toHaveCount(5);
  await expect(page.locator(".packages-directory .home-section__heading--numbered")).toBeVisible();
  await expectNoOverflow(page);
});
