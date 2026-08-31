import { expect, test } from "@playwright/test";

test("contact and footer expose hours plus Facebook, Instagram, and WhatsApp", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.locator(".contact-availability")).toContainText("Monday–Friday");
  await expect(page.locator(".contact-availability")).toContainText("8:00 AM–5:00 PM CT");
  await expect(page.locator(".contact-socials").getByLabel("Facebook")).toHaveCount(1);
  await expect(page.locator(".contact-socials").getByLabel("Instagram profile link pending")).toHaveCount(1);
  await expect(page.locator(".contact-socials").getByLabel("WhatsApp")).toHaveAttribute(
    "href",
    /wa\.me\/14159002374/,
  );
  await expect(page.locator("footer").getByLabel("WhatsApp")).toHaveAttribute(
    "href",
    /wa\.me\/14159002374/,
  );
});

test("platform mentions outside the platform directory use category glyphs", async ({ page }) => {
  for (const path of ["/", "/services"]) {
    await page.goto(path);
    const platformLinks = page.locator(".platform-name-grid a");
    await expect(platformLinks.first()).toBeVisible();
    await expect(platformLinks.first().locator("svg.platform-name-grid__icon")).toHaveCount(1);
    await expect(platformLinks.locator("img")).toHaveCount(0);
  }
});

test("about process icons remain centered in their containers", async ({ page }) => {
  await page.goto("/about");
  const icons = page.locator(".about-process-grid .inner-card-icon");
  await expect(icons).toHaveCount(4);

  for (const icon of await icons.all()) {
    await expect(icon).toHaveCSS("display", "inline-flex");
  }
});

test.describe("mobile portfolio browse control", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps the label and two equal toggle options inside one full-width control", async ({ page }) => {
    await page.goto("/portfolio");

    const control = page.locator(".portfolio-browse-switch");
    await expect(control.locator(":scope > span")).toHaveText("Browse by");
    await expect(control.getByRole("button")).toHaveCount(2);

    const [controlBox, industryBox, typeBox] = await Promise.all([
      control.boundingBox(),
      control.getByRole("button", { name: "Industry" }).boundingBox(),
      control.getByRole("button", { name: "Website Type" }).boundingBox(),
    ]);

    expect(controlBox).not.toBeNull();
    expect(industryBox).not.toBeNull();
    expect(typeBox).not.toBeNull();
    expect(controlBox!.width).toBeGreaterThan(280);
    expect(Math.abs(industryBox!.width - typeBox!.width)).toBeLessThan(2);
  });
});
