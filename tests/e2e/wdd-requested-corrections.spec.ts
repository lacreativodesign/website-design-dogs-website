import { expect, test } from "@playwright/test";

test("contact and footer expose hours plus Facebook, Instagram, and WhatsApp", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.locator(".contact-availability")).toContainText("Monday–Friday");
  await expect(page.locator(".contact-availability")).toContainText("8:00 AM–5:00 PM CT");
  await expect(page.locator(".contact-socials").getByLabel("Facebook")).toHaveCount(1);
  await expect(page.locator(".contact-socials").getByLabel("Instagram")).toHaveAttribute(
    "href",
    "https://www.instagram.com/websitedesigndogs/",
  );
  await expect(page.locator(".contact-socials").getByLabel("WhatsApp")).toHaveAttribute(
    "href",
    /wa\.me\/15127647834/,
  );
  await expect(page.locator("footer").getByLabel("WhatsApp")).toHaveAttribute(
    "href",
    /wa\.me\/15127647834/,
  );

  const contactWhatsAppIcon = page.locator(
    '.contact-socials [data-social-brand="whatsapp"]',
  );
  const footerWhatsAppIcon = page.locator(
    'footer [data-social-brand="whatsapp"]',
  );
  await expect(contactWhatsAppIcon).toHaveCount(1);
  await expect(footerWhatsAppIcon).toHaveCount(1);
  await expect(contactWhatsAppIcon).toHaveAttribute("fill", "currentColor");
  await expect(contactWhatsAppIcon).toHaveAttribute("stroke", "none");
});

test("platform displays use each platform’s individual brand mark", async ({ page }) => {
  for (const path of ["/", "/services"]) {
    await page.goto(path);
    const platformLinks = page.locator(".platform-name-grid a");
    await expect(platformLinks.first()).toBeVisible();

    const linkCount = await platformLinks.count();
    await expect(platformLinks.locator("svg.platform-logo")).toHaveCount(linkCount);
    await expect(
      platformLinks.first().locator('[data-platform-logo="wordpress"]'),
    ).toHaveCount(1);
    await expect(platformLinks.locator("svg.platform-name-grid__icon")).toHaveCount(0);
    await expect(platformLinks.locator("img")).toHaveCount(0);
  }

  await page.goto("/platforms");
  const platformCards = page.locator(".platform-card-grid article");
  await expect(platformCards).toHaveCount(15);
  await expect(
    platformCards.locator(".platform-card__header svg.platform-logo"),
  ).toHaveCount(15);
  await expect(
    page.locator('#wordpress [data-platform-logo="wordpress"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('#shopify [data-platform-logo="shopify"]'),
  ).toHaveCount(1);
});

test("about process icons remain centered in their containers", async ({ page }) => {
  await page.goto("/about");
  const icons = page.locator(".about-process-grid .inner-card-icon");
  await expect(icons).toHaveCount(4);

  for (const icon of await icons.all()) {
    await expect(icon).toHaveCSS("display", "inline-flex");
  }

  const [processColor, principleColor] = await Promise.all([
    icons.first().evaluate((node) => getComputedStyle(node).color),
    page.locator(".about-principles-grid .inner-card-icon").first()
      .evaluate((node) => getComputedStyle(node).color),
  ]);

  expect(processColor).toBe("rgb(255, 106, 0)");
  expect(processColor).toBe(principleColor);
});

test("original heading fonts remain while spacing improves readability", async ({ page }) => {
  const readTypography = async (selector: string) => {
    const element = page.locator(selector).first();
    await expect(element).toBeVisible();
    return element.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        family: style.fontFamily,
        fontSize: Number.parseFloat(style.fontSize),
        letterSpacing: style.letterSpacing === "normal" ? 0 : Number.parseFloat(style.letterSpacing),
        lineHeight: Number.parseFloat(style.lineHeight),
      };
    });
  };

  await page.goto("/");
  const homeHero = await readTypography(".home-hero__title");
  expect(homeHero.family).toContain("headingFont");
  expect(homeHero.letterSpacing / homeHero.fontSize).toBeCloseTo(-0.01, 2);
  expect(homeHero.lineHeight / homeHero.fontSize).toBeGreaterThanOrEqual(0.99);

  await page.goto("/privacy-policy");
  const legalHero = await readTypography(".visual-page-hero--legal h1");
  expect(legalHero.family).toMatch(/^Impact/i);
  expect(legalHero.letterSpacing / legalHero.fontSize).toBeCloseTo(-0.01, 2);
  expect(legalHero.lineHeight / legalHero.fontSize).toBeGreaterThanOrEqual(0.99);

  await page.goto("/packages");
  const packagePrice = await readTypography(".packages-card__price");
  expect(packagePrice.family).toContain("headingFont");
  expect(packagePrice.letterSpacing).toBe(0);
  expect(packagePrice.lineHeight / packagePrice.fontSize).toBeGreaterThanOrEqual(1.04);

  await page.goto("/about");
  const smallHeading = await readTypography(".about-process-grid h3");
  expect(smallHeading.family).toContain("headingFont");
  expect(smallHeading.letterSpacing / smallHeading.fontSize).toBeCloseTo(0.01, 2);
  expect(smallHeading.lineHeight / smallHeading.fontSize).toBeGreaterThanOrEqual(1.17);
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
