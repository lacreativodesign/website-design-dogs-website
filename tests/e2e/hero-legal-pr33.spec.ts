import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

const viewports = [
  { width: 320, height: 900 },
  { width: 768, height: 1000 },
  { width: 1440, height: 1000 },
] as const;

test("shared public heroes keep full-width containers with left-aligned copy", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of [
      "/services",
      "/portfolio",
      "/packages",
      "/about",
      "/contact",
      "/get-started",
    ]) {
      await page.goto(route);
      const container = page.locator(".top-level-hero__content");
      const copy = container.locator(".top-level-hero__copy");
      const containerBox = await container.boundingBox();
      const copyBox = await copy.boundingBox();

      expect(containerBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      expect(containerBox!.width).toBeGreaterThan(viewport.width * 0.75);
      expect(copyBox!.x).toBeGreaterThanOrEqual(containerBox!.x);
      await expect(copy).toHaveCSS("text-align", "start");
      await expectNoOverflow(page);
    }
  }
});

test("public hero headings use the restored condensed typography", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const homeTypography = await page.locator(".home-hero__title").evaluate((element) => {
    const style = getComputedStyle(element);
    return { family: style.fontFamily, transform: style.textTransform };
  });

  expect(homeTypography.family).toMatch(/^Impact/i);
  expect(homeTypography.transform).toBe("uppercase");

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
  ]) {
    await page.goto(route);
    const typography = await page.locator("h1").first().evaluate((element) => {
      const style = getComputedStyle(element);
      return { family: style.fontFamily, transform: style.textTransform };
    });

    expect(typography.family).toBe(homeTypography.family);
    expect(typography.transform).toBe("uppercase");
  }
});

test("service hub and detail artwork remain responsive", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const [route, selector] of [
      ["/services", ".top-level-hero__scene .theme-scene__image"],
      [
        "/services/custom-website-design",
        ".service-detail-hero__scene .theme-scene__image",
      ],
    ] as const) {
      await page.goto(route);
      await expect(page.locator(selector)).toBeVisible();
      await expectNoOverflow(page);
    }
  }
});

test("each legal policy keeps its unique responsive art and readable expanded sections", async ({ page }) => {
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
