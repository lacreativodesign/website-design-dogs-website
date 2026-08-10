import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const viewports = [
  { width: 320, height: 900 },
  { width: 768, height: 1000 },
  { width: 1440, height: 1000 },
] as const;

test("shared top-level heroes and breadcrumbs stay responsive", async ({ page }) => {
  test.setTimeout(60_000);
  const routes = [
    "/services",
    "/about",
    "/portfolio",
    "/packages",
    "/contact",
    "/get-started",
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      const hero = page.locator(".top-level-hero");
      const breadcrumb = hero.locator(".hero-breadcrumb");
      await expect(hero).toBeVisible();
      await expect(breadcrumb).toBeVisible();
      const breadcrumbBox = await breadcrumb.boundingBox();
      expect(breadcrumbBox).not.toBeNull();
      expect(breadcrumbBox!.width).toBeLessThan(viewport.width - 24);
      await expectNoOverflow(page);
    }
  }
});

test("portfolio keeps a focused sequence after the concept directory", async ({ page }) => {
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

test("packages expose six website tiers, six categories, and a five-step journey", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/packages");
    await expect(page.locator(".package-tabs .package-tab")).toHaveCount(6);
    await expect(page.locator(".packages-card .btn-primary")).toHaveCount(6);
    await expect(page.locator(".packages-process .inner-card-icon")).toHaveCount(5);
    await expect(page.locator(".packages-process li > b")).toHaveCount(0);
    await expect(page.locator(".packages-connect .home-lead__image")).toBeVisible();
    await expect(page.locator(".packages-connect .home-lead-form")).toBeVisible();
    await expect(page.locator(".top-level-hero source[srcset*='packages-']")).toHaveCount(5);
    await expectNoOverflow(page);
  }
});

test("about, contact, and get-started retain their substantive body layouts", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".top-level-hero")).toBeVisible();
  await expect(page.locator(".about-experience-cards article")).toHaveCount(4);
  await expect(page.locator(".about-experience-grid dl")).toHaveCount(0);

  await page.goto("/contact");
  await expect(page.locator(".top-level-hero")).toBeVisible();
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
  await expect(page.locator(".top-level-hero")).toBeVisible();
  await expect(page.locator(".get-started-section")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your Business" })).toBeVisible();
  await expectNoOverflow(page);
});

test("package and service detail families retain rich artwork and scoped actions", async ({ page }) => {
  await page.goto("/packages/starter");
  await expect(page.locator(".package-detail-hero source[srcset*='package-detail-']")).toHaveCount(5);
  await expect(page.locator(".package-detail-hero__copy")).toBeVisible();
  await expect(page.getByRole("link", { name: "Start with Starter" })).toHaveClass(/btn-primary/);

  await page.goto("/services/custom-website-design");
  await expect(page.locator(".service-detail-hero source[srcset*='service-detail-']")).toHaveCount(5);
  await expect(page.locator(".service-story__art source[type='image/avif']")).toHaveCount(1);
  await expect(page.locator(".service-detail-hero__proof li")).toHaveCount(3);
  await expect(page.locator(".service-process__grid .inner-card-icon")).toHaveCount(4);
  await expectNoOverflow(page);
});
