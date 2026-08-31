import { expect, test } from "@playwright/test";
import { packageCategories } from "../../src/content/packages";
import { platforms } from "../../src/content/platforms";
import { expectNoOverflow } from "./helpers";

test("homepage restores the package, process, business-context, and footer details", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(page.locator(".home-process__body")).toHaveCount(5);
  for (const body of await page.locator(".home-process__body").all()) {
    const box = await body.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(80);
  }

  await expect(page.locator(".home-packages .package-tabs")).toHaveCSS("justify-content", "center");
  await expect(page.locator(".home-packages .packages-card")).toHaveCount(3);
  await expect(page.locator(".home-packages .value-benefit-tile")).toHaveCount(5);
  await expect(page.locator(".home-packages .packages-card__actions").first().getByRole("link")).toHaveCount(2);
  await expect(page.getByRole("link", { name: /view all packages/i })).toBeVisible();
  const processCard = page.locator(".home-process__grid article").last();
  await processCard.scrollIntoViewIfNeeded();
  await expect(processCard).toHaveClass(/is-revealed/);
  const packageCard = page.locator('[data-package="business"]');
  await packageCard.hover();
  await page.waitForTimeout(250);
  expect(await packageCard.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  const footer = page.locator(".site-footer");
  await expect(footer.getByRole("heading", { name: "Support" })).toHaveCount(0);
  await expect(footer.getByRole("link", { name: "FAQ", exact: true })).toHaveCount(1);
  await expect(footer.locator(".footer-socials svg")).toHaveCount(3);
  await expect(footer.getByRole("heading", { name: "Contact" }).locator("xpath=../ul/li")).toHaveCount(3);
  await expectNoOverflow(page);
});

test("rapid scrolling cannot leave motion-managed content transparent", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);

  const unrevealedAfterJump = page.locator('[data-reveal="true"]:not(.is-revealed)');
  await expect(unrevealedAfterJump).toHaveCount(0);

  await page.goto("/services");
  await page.waitForTimeout(3_200);
  await expect(page.locator('[data-reveal="true"]:not(.is-revealed)')).toHaveCount(0);
});

test("the supplied GTM container remains blocked until optional consent", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[src*="GTM-N625DJ7Z"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Accept optional" }).click();
  const expectedScripts = process.env.NEXT_PUBLIC_ENABLE_GTM === "true" ? 1 : 0;
  await expect(page.locator('script[src*="GTM-N625DJ7Z"]')).toHaveCount(expectedScripts);
});

test("services and platforms use polished artwork, unique scenes, icons, and numbered sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/services");
  const firstServiceCard = page.locator(".service-showcase-card").first();
  const firstServiceMedia = firstServiceCard.locator(".service-showcase-card__media");
  await expect(firstServiceMedia.locator("img")).toHaveCSS("object-fit", "contain");
  const serviceCardBox = await firstServiceCard.boundingBox();
  const serviceMediaBox = await firstServiceMedia.boundingBox();
  expect(serviceMediaBox?.width ?? 0).toBeGreaterThan((serviceCardBox?.width ?? 0) * .9);
  expect((serviceMediaBox?.width ?? 0) / (serviceMediaBox?.height ?? 1)).toBeCloseTo(1.5, 1);
  await expect(page.locator(".decision-cta__panel")).toBeVisible();
  expect((await page.locator(".compact-cta-strip .decision-cta__panel").boundingBox())?.height ?? 0).toBeGreaterThan(190);
  const platformLink = page.locator(".platform-name-grid a").first();
  await expect(platformLink).toHaveAttribute("href", /\/platforms#/);
  await platformLink.hover();
  expect(await platformLink.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  await expect(page.locator(".top-level-hero__scene .theme-scene__image")).toHaveCSS("object-position", "50% 0%");

  await page.goto("/platforms");
  await expect(page.locator(".top-level-hero source[srcset*='platforms-']")).toHaveCount(5);
  await expect(page.locator(".platform-card-grid article")).toHaveCount(platforms.length);
  await expect(page.locator(".platform-card__header .inner-card-icon")).toHaveCount(platforms.length);
  await expect(page.locator(".home-section__heading--numbered > span")).toHaveText(["01", "02", "03", "04"]);
  await expect(page.locator("#godaddy-websites-marketing")).toBeVisible();
  await expectNoOverflow(page);
});

test("package comparison follows the selected category and social packages are visible", async ({ page }) => {
  await page.goto("/packages");
  const social = packageCategories.find((category) => category.slug === "social-media")!;
  await page.getByRole("button", { name: social.shortTitle, exact: true }).click();

  await expect(page.locator('[data-category="social-media"] .packages-card')).toHaveCount(social.packages.length);
  const table = page.locator("#compare table");
  for (const pkg of social.packages) {
    await expect(table.getByRole("columnheader", { name: new RegExp(pkg.name) })).toBeVisible();
  }
  await expect(page.locator("#compare")).toContainText("Social Media comparison");
  await expect(page.locator(".packages-value-rail .value-benefit-tile")).toHaveCount(5);
});

test("portfolio controls align with the heading and duplicate contact blocks stay removed", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/portfolio");
  await expect(page.locator(".portfolio-filter-studio")).toBeVisible();
  await expect(page.locator(".portfolio-filter-studio__count")).toHaveCount(0);
  await expect(page.getByText("Browse the concept studio", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Find a direction that fits.", { exact: true })).toHaveCount(0);
  await expect(page.locator(".portfolio-browse-switch").getByRole("button")).toHaveCount(2);
  const headingBox = await page.locator(".portfolio-filter-studio__header .home-section__heading").boundingBox();
  const switchBox = await page.locator(".portfolio-browse-control").boundingBox();
  expect(switchBox?.y ?? 0).toBeLessThan((headingBox?.y ?? 0) + (headingBox?.height ?? 0));
  await expect(page.locator(".portfolio-filter-studio .portfolio-filter__tabs")).toHaveCSS("justify-content", "center");
  await expect(page.locator(".portfolio-filter-studio")).toHaveCSS("border-top-width", "0px");
  await expect(page.locator(".portfolio-filter-studio")).toHaveCSS("border-bottom-width", "0px");
  await page.getByRole("button", { name: "Website Type", exact: true }).click();
  await expect(page.locator('[data-browse-mode="type"]')).toBeVisible();
  await expect(page.locator(".portfolio-filter__tab--active")).toHaveCSS("background-color", "rgb(255, 106, 0)");
  await expect(page.locator(".portfolio-directory .numbered-section-description")).toContainText("Explore layout direction");
  await expect(page.locator(".portfolio-process article")).toHaveCount(3);

  await page.goto("/contact");
  await expect(page.locator(".contact-disclosure")).toHaveCount(0);
  await expect(page.locator(".contact-quick-links")).toHaveCount(0);
  await expect(page.locator(".contact-method-card")).toHaveCount(3);
  await expect(page.locator(".site-footer")).toContainText("Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.");

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/contact");
  await expectNoOverflow(page);
});
