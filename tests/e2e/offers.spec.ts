import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("Offers presents featured concepts as image thumbnails with a lightbox", async ({ page }) => {
  await page.goto("/offers");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("NO TRICKS.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("JUST 40% OFF.");

  const gallery = page.locator('[data-gallery-variant="thumbnail"]');
  await expect(gallery).toBeVisible();
  await expect(gallery.locator(".portfolio-thumbnail")).toHaveCount(4);
  await expect(gallery.locator(".portfolio-thumbnail__image")).toHaveCount(4);
  await expect(gallery.locator(".portfolio-thumbnail__preview-frame")).toHaveCount(0);
  await expect(gallery.locator(".portfolio-thumbnail__label")).toHaveCount(4);
  await expect(gallery.locator(".portfolio-thumbnail__label").first()).toHaveText(
    "Concept Design",
  );

  const first = gallery.locator(".portfolio-thumbnail").first();
  await first.click();

  const dialog = page.locator(".portfolio-lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".portfolio-lightbox__status")).toContainText("1 of 4");
  await expect(dialog.locator(".portfolio-lightbox__site")).toHaveAttribute(
    "src",
    /\/portfolio\/live\?concept=roofing/,
  );

  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".portfolio-lightbox__status")).toContainText("2 of 4");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(first).toBeFocused();

  await expectNoOverflow(page);
});

test("Offers keeps truthful pricing and campaign attribution", async ({ page }) => {
  await page.goto("/offers");

  await expect(page.locator(".offer-package-card")).toHaveCount(4);
  await expect(page.getByText("$299.40", { exact: true }).first()).toBeVisible();

  const offerLinks = page.locator('a[href*="utm_campaign=october-2026-40-off"]');
  await expect(offerLinks.first()).toBeVisible();
  expect(await offerLinks.count()).toBeGreaterThanOrEqual(4);
});


test("Offers captures an October lead on-page with attribution and friendly website entry", async ({ page }) => {
  let submitted:
    | {
        formType: string;
        campaignSlug: string;
        consent: boolean;
        business: { website?: string };
        project: { type: string };
        attribution: {
          utmSource?: string;
          utmMedium?: string;
          utmCampaign?: string;
          utmContent?: string;
          fbclid?: string;
        };
      }
    | undefined;

  await page.route("**/api/leads", (route) => {
    submitted = route.request().postDataJSON() as typeof submitted;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Thanks — your request was received successfully.",
        referenceId: "WDD-OCTOBER-TEST",
        confirmationEmailSent: true,
      }),
    });
  });

  await page.goto(
    "/offers?utm_source=facebook&utm_medium=paid_social&utm_campaign=october-2026-40-off&utm_content=creative-a&fbclid=meta-click",
  );

  await expect(page.locator("[data-offer-lead-form]")).toHaveCount(3);

  const form = page.locator('[data-offer-lead-form="mid"]');
  await form.getByLabel("Full name").fill("Jane Smith");
  await form.getByLabel("Business name").fill("Acme Services");
  await form.getByLabel("Email").fill("jane@example.com");
  await form.getByPlaceholder("(415) 900-2374").fill("(415) 900-2374");
  await form.getByLabel("Current website").fill("bizosto.com");
  await form.getByLabel("Project type").selectOption("E-Commerce Solutions");
  await form
    .getByLabel("What do you want the website to accomplish?")
    .fill("Sell products online and turn more visitors into customers.");
  await form.getByRole("checkbox", { name: /I consent/i }).check();
  await form.getByRole("button", { name: "Get My 40% Off Quote" }).click();

  await expect(form.getByText("Offer request received")).toBeVisible();
  await expect(form.getByText(/WDD-OCTOBER-TEST/)).toBeVisible();

  expect(submitted).toMatchObject({
    formType: "campaign",
    campaignSlug: "october-offer",
    consent: true,
    business: { website: "https://bizosto.com/" },
    project: { type: "E-Commerce Solutions" },
    attribution: {
      utmSource: "facebook",
      utmMedium: "paid_social",
      utmCampaign: "october-2026-40-off",
      utmContent: "creative-a",
      fbclid: "meta-click",
    },
  });
});

test("Offers remains conversion-ready without horizontal overflow at paid-social widths", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 820, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/offers");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("40% OFF");
    await expect(page.locator('[data-offer-lead-form="hero"]')).toBeVisible();
    await expect(page.locator("[data-offer-lead-form]")).toHaveCount(3);
    await expect(page.getByRole("heading", { name: "New Website", exact: true }).first()).toBeVisible();
    await expectNoOverflow(page);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 1);
  }
});
