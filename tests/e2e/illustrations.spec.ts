import { expect, test } from "@playwright/test";

const scenes = [
  { name: "home", route: "/", selector: ".home-hero__scene", slug: "home" },
  {
    name: "services",
    route: "/services",
    selector: ".services-hero__scene",
    slug: "services",
  },
  {
    name: "portfolio",
    route: "/portfolio",
    selector: ".portfolio-hero__scene",
    slug: "portfolio",
  },
  {
    name: "about",
    route: "/about",
    selector: ".visual-page-hero__scene",
    slug: "about",
  },
  {
    name: "contact",
    route: "/contact",
    selector: ".contact-hero__scene",
    slug: "contact",
  },
  {
    name: "get started",
    route: "/get-started",
    selector: ".guided-hero__scene",
    slug: "get-started",
  },
  {
    name: "not found",
    route: "/missing-illustration-route",
    selector: ".not-found-page__scene",
    slug: "404",
  },
] as const;

for (const scene of scenes) {
  test(`${scene.name} uses its final responsive illustration`, async ({ page }) => {
    await page.goto(scene.route);

    const picture = page.locator(scene.selector);
    const image = picture.locator("img");
    await expect(picture).toBeVisible();
    await expect(image).toBeVisible();
    await expect(picture.locator('source[type="image/avif"]')).toHaveCount(3);
    await expect(picture.locator('source[type="image/webp"]')).toHaveCount(2);

    const desktopSource = await image.evaluate(
      (element) => (element as HTMLImageElement).currentSrc,
    );
    expect(desktopSource).toContain(`${scene.slug}-desktop.avif`);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await expect(image).toBeVisible();

    const mobileSource = await image.evaluate(
      (element) => (element as HTMLImageElement).currentSrc,
    );
    expect(mobileSource).toContain(`${scene.slug}-mobile.avif`);
  });
}
