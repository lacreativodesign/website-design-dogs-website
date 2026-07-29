import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const viewports = [
  { width: 320, height: 900 },
  { width: 768, height: 1000 },
  { width: 1440, height: 1000 },
] as const;

test("standard heroes and breadcrumbs share stable responsive geometry", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const [route, hero] of [
      ["/services", ".services-hero"],
      ["/about", ".visual-page-hero--about"],
      ["/contact", ".compact-title-section"],
      ["/faq", ".visual-page-hero--faq"],
    ] as const) {
      await page.goto(route);
      const heroBox = await page.locator(hero).boundingBox();
      const breadcrumbBox = await page.locator(".hero-breadcrumb").boundingBox();
      expect(heroBox).not.toBeNull();
      expect(breadcrumbBox).not.toBeNull();
      expect(heroBox!.height).toBeGreaterThanOrEqual(viewport.width <= 760 ? 690 : 550);
      expect(breadcrumbBox!.width).toBeLessThan(viewport.width - 24);
      await expectNoOverflow(page);
    }
  }
});

test("portfolio removes the rejected section and keeps sequential numbering", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByText("More Than a Pretty Homepage.")).toHaveCount(0);
  await expect(page.locator(".portfolio-breakdowns")).toHaveCount(0);
  await expect(page.locator(".home-section__heading--numbered > span")).toHaveText([
    "02",
    "03",
    "04",
    "05",
  ]);
});

test("packages use primary order actions, icon journey, balanced recommendation, and final art", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/packages");
    await expect(page.locator(".packages-card .btn-primary")).toHaveCount(3);
    await expect(page.locator(".packages-process .inner-card-icon")).toHaveCount(5);
    await expect(page.locator(".packages-process li > b")).toHaveCount(0);
    await expect(page.locator(".packages-contact-copy__content")).toBeVisible();
    await expect(page.locator(".packages-contact-form")).toBeVisible();
    await expect(page.locator(".packages-hero source[srcset*='packages-']")).toHaveCount(5);
    await expectNoOverflow(page);
  }
});

test("about, contact, and get-started replace the broken structural layouts", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".about-experience-cards article")).toHaveCount(4);
  await expect(page.locator(".about-experience-grid dl")).toHaveCount(0);

  await page.goto("/contact");
  await expect(page.locator(".contact-method-card")).toHaveCount(3);
  await expect(page.locator(".coverage-panel__steps li")).toHaveCount(4);
  for (const card of await page.locator(".contact-method-card").all()) {
    const iconBox = await card.locator(".inner-card-icon").boundingBox();
    const copyBox = await card.locator("div").boundingBox();
    expect(iconBox).not.toBeNull();
    expect(copyBox).not.toBeNull();
    expect(iconBox!.x + iconBox!.width).toBeLessThanOrEqual(copyBox!.x);
  }

  await page.goto("/get-started");
  await expect(page.locator(".guided-hero > .guided-hero__scene")).toBeVisible();
  await expect(page.locator(".page-hero__scene")).toHaveCount(0);
  await expect(page.locator(".quote-summary__guide-art")).toBeVisible();
  await expect(page.locator(".quote-summary__guide-copy")).toBeVisible();
  await expectNoOverflow(page);
});

test("package and service detail families use dedicated final illustrations", async ({ page }) => {
  await page.goto("/packages/starter");
  await expect(page.locator(".package-detail-hero source[srcset*='package-detail-']")).toHaveCount(5);
  await expect(page.locator(".package-detail-hero__copy")).toBeVisible();
  await expect(page.getByRole("link", { name: /order starter/i })).toHaveClass(/btn-primary/);

  await page.goto("/services/custom-website-design");
  await expect(page.locator(".service-detail-hero source[srcset*='service-detail-']")).toHaveCount(5);
  await expect(page.locator(".service-detail-hero__proof li")).toHaveCount(3);
  await expect(page.locator(".service-detail-steps .inner-card-icon")).toHaveCount(4);
  await expectNoOverflow(page);
});
