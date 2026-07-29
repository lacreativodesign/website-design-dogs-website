import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const responsiveWidths = [320, 768, 1440] as const;

test("homepage directory CTAs keep labels and arrows on one horizontal line", async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    for (const name of [/view full portfolio/i, /view all packages/i]) {
      const cta = page.getByRole("link", { name });
      await expect(cta).toBeVisible();
      await expect(cta.locator(".btn__label")).toHaveCSS("white-space", "nowrap");

      const buttonBox = await cta.boundingBox();
      const arrowBox = await cta.locator("svg").boundingBox();
      expect(buttonBox).not.toBeNull();
      expect(arrowBox).not.toBeNull();
      expect(Math.abs(
        (arrowBox!.y + arrowBox!.height / 2) -
        (buttonBox!.y + buttonBox!.height / 2),
      )).toBeLessThan(4);
      expect(buttonBox!.height).toBeLessThanOrEqual(54);
    }

    await expectNoOverflow(page);
  }
});

test("inner-page families use the polished icon card system", async ({ page }) => {
  const checks = [
    ["/services", ".services-directory-card", ".services-directory-card .inner-card-icon"],
    ["/services/custom-website-design", ".service-detail-steps li", ".service-detail-steps .inner-card-icon"],
    ["/portfolio", ".portfolio-strategy article", ".portfolio-strategy .inner-card-icon"],
    ["/packages/starter", ".package-detail-process li", ".package-detail-process .inner-card-icon"],
    ["/about", ".about-process-tile", ".about-process-tile .inner-card-icon"],
    ["/contact", ".coverage-panel__steps li", ".coverage-panel__steps .inner-card-icon"],
    ["/faq", ".faq-category-grid article", ".faq-category-grid .inner-card-icon"],
  ] as const;

  for (const [route, cardsSelector, iconsSelector] of checks) {
    await page.goto(route);
    const cards = page.locator(cardsSelector);
    const icons = page.locator(iconsSelector);
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(icons).toHaveCount(await cards.count());
    await expectNoOverflow(page);
  }
});

test("shared CTA, footer, consent, legal, and campaign surfaces stay responsive", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });

  for (const route of [
    "/about",
    "/faq",
    "/privacy-policy",
    "/get-started",
  ]) {
    await page.goto(route);
    await expectNoOverflow(page);
    await expect(page.locator(".site-header")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
  }

  await page.goto("/campaigns/cleaning");
  await expect(page.locator(".campaign-header")).toBeVisible();
  await expect(page.locator(".campaign-footer")).toBeVisible();
  await expectNoOverflow(page);

  await page.goto("/not-a-real-page");
  await expect(page.locator(".not-found-page")).toBeVisible();
  await expectNoOverflow(page);

  await page.goto("/privacy-policy");
  const legalGroups = page.locator(".legal-primary-group");
  await expect(page.locator(".legal-primary-group .inner-card-icon")).toHaveCount(
    await legalGroups.count(),
  );

  await page.evaluate(() => {
    document.cookie = "wdd-consent-v2=; Max-Age=0; path=/";
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
  const banner = page.locator(".consent-banner");
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Accept optional" })).toHaveCSS(
    "min-height",
    "44px",
  );
});
