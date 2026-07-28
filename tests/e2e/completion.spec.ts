import { expect, test } from "@playwright/test";

test("approved scene artwork and corrected shared navigation render", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".home-hero__background")).toHaveAttribute(
    "src",
    /home-hero-dark/,
  );

  await page.goto("/services");
  await expect(page.locator(".services-hero .theme-scene__image")).toHaveAttribute(
    "src",
    /services-hero-dark/,
  );
  await expect(page.locator(".theme-scene--placeholder")).toHaveCount(0);

  const footer = page.locator(".site-footer");
  await expect(footer.getByRole("link", { name: "Custom Website Design" })).toHaveAttribute(
    "href",
    "/services/custom-website-design",
  );
  await expect(footer.getByRole("link", { name: "Website Development" })).toHaveAttribute(
    "href",
    "/services/website-development",
  );
});

test("contact and consent controls avoid setup-facing or obstructive copy", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(".contact-hero__scene .theme-scene__image")).toBeVisible();
  await expect(
    page.getByText(/anti-spam verification is not configured/i),
  ).toHaveCount(0);

  const banner = page.locator(".consent-banner");
  if (await banner.isVisible()) {
    const width = await banner.evaluate((element) =>
      element.getBoundingClientRect().width,
    );
    expect(width).toBeLessThanOrEqual(500);
  }
});
