import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const viewports = [
  { width: 320, height: 900 },
  { width: 768, height: 1000 },
  { width: 1440, height: 1000 },
] as const;

test("About and FAQ heroes keep full-width containers with left-aligned copy", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of ["/about", "/faq"]) {
      await page.goto(route);
      const container = page.locator(".visual-page-hero__content");
      const copy = container.locator(".visual-page-hero__copy");
      const containerBox = await container.boundingBox();
      const copyBox = await copy.boundingBox();

      expect(containerBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      expect(containerBox!.width).toBeGreaterThan(viewport.width * 0.75);
      expect(copyBox!.x).toBeGreaterThanOrEqual(containerBox!.x);
      // The responsive Container gutter reaches 48px at tablet/desktop widths.
      expect(copyBox!.x - containerBox!.x).toBeLessThanOrEqual(64);
      await expect(copy).toHaveCSS("text-align", "left");
      await expectNoOverflow(page);
    }
  }
});

test("standard public heroes inherit the homepage typography contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const homeTypography = await page.locator(".home-hero__title").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      family: style.fontFamily,
      size: Number.parseFloat(style.fontSize),
      lineHeight: Number.parseFloat(style.lineHeight),
      transform: style.textTransform,
    };
  });

  for (const route of [
    "/services",
    "/portfolio",
    "/packages",
    "/about",
    "/contact",
    "/faq",
    "/get-started",
    "/services/custom-website-design",
    "/packages/starter",
    "/privacy-policy",
  ]) {
    await page.goto(route);
    const heading = page.locator("h1").first();
    const typography = await heading.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        family: style.fontFamily,
        size: Number.parseFloat(style.fontSize),
        lineHeight: Number.parseFloat(style.lineHeight),
        transform: style.textTransform,
      };
    });

    expect(typography.family).toContain("Impact");
    expect(typography.transform).toBe("uppercase");
    expect(Math.abs(typography.size - homeTypography.size)).toBeLessThan(2);
    expect(Math.abs(typography.lineHeight - homeTypography.lineHeight)).toBeLessThan(2);
  }
});

test("service hub and detail artwork stay anchored to the top", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const [route, selector] of [
      ["/services", ".services-hero__scene .theme-scene__image"],
      ["/services/custom-website-design", ".service-detail-hero__scene .theme-scene__image"],
    ] as const) {
      await page.goto(route);
      const image = page.locator(selector);
      await expect(image).toBeVisible();
      await expect(image).toHaveCSS("object-position", "50% 0%");
      await expectNoOverflow(page);
    }
  }
});

test("each legal policy uses unique responsive art and readable expanded sections", async ({ page }) => {
  const policies = [
    ["/privacy-policy", "privacy"],
    ["/terms-and-conditions", "terms"],
    ["/refund-cancellation-policy", "refund"],
    ["/cookie-policy", "cookie"],
  ] as const;

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const [route, scene] of policies) {
      await page.goto(route);
      await expect(page.locator(`.visual-page-hero source[srcset*='${scene}-']`)).toHaveCount(5);
      await expect(page.locator(".legal-primary-group")).not.toHaveCount(0);
      await expect(page.locator(".legal-primary-group details")).toHaveCount(0);
      await expect(page.locator(".legal-primary-group__body").first()).toBeVisible();
      await expect(page.locator(".legal-policy-nav a[aria-current='page']")).toHaveCount(1);
      await expectNoOverflow(page);
    }
  }
});
