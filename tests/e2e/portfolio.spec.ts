import { expect, test } from "@playwright/test";
import { expectNoOverflow } from "./helpers";

test("Portfolio presents twelve live, labelled design concepts", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator("[data-concept-id]")).toHaveCount(12);
  await expect(page.locator(".portfolio-thumbnail")).toHaveCount(12);
  await expect(page.locator(".portfolio-thumbnail__label")).toHaveCount(12);
  await expect(page.locator(".portfolio-thumbnail__label").first()).toHaveText(
    "Concept Design",
  );
  await expect(page.locator(".portfolio-thumbnail__preview-frame").first()).toHaveAttribute(
    "src",
    /\/portfolio\/live\?concept=roofing/,
  );
  await expect(page.locator(".portfolio-thumbnail").first()).toHaveCSS(
    "border-top-width",
    "0px",
  );
  await expect(page.locator(".portfolio-filter__tab--active")).toHaveText("All");
  await expect(page.getByRole("link", { name: "Portfolio" }).first()).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expectNoOverflow(page);
});

test("Portfolio opens a full interactive website without a caption box", async ({
  page,
}) => {
  await page.goto("/portfolio");
  const first = page.locator(".portfolio-thumbnail").first();
  await first.focus();
  await first.press("Enter");

  const dialog = page.locator(".portfolio-lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("figcaption")).toHaveCount(0);
  await expect(dialog.locator(".portfolio-lightbox__status")).toContainText("1 of 12");

  const conceptFrame = page.frameLocator(".portfolio-lightbox__site");
  await expect(conceptFrame.locator("#top")).toBeVisible();
  await expect
    .poll(() =>
      conceptFrame
        .locator("body")
        .evaluate((body) => body.scrollHeight > window.innerHeight),
    )
    .toBe(true);

  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator(".portfolio-lightbox__status")).toContainText("12 of 12");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".portfolio-lightbox__status")).toContainText("1 of 12");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(first).toBeFocused();
});

test("Portfolio supports keyboard-operable industry and website-type filtering", async ({
  page,
}) => {
  await page.goto("/portfolio");
  const browseByIndustry = page.getByRole("button", {
    name: "Industry",
    exact: true,
  });
  const browseByType = page.getByRole("button", {
    name: "Website Type",
    exact: true,
  });
  await expect(browseByIndustry).toHaveAttribute("aria-pressed", "true");

  const healthAndWellness = page.getByRole("button", {
    name: "Health, Wellness & Beauty",
    exact: true,
  });
  await healthAndWellness.click();
  await expect(healthAndWellness).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-concept-id]")).toHaveCount(3);
  await expect(page.locator("[data-browse-mode='industry']")).toHaveAttribute(
    "data-active-filter",
    "Health, Wellness & Beauty",
  );

  await browseByType.click();
  await expect(browseByType).toHaveAttribute("aria-pressed", "true");
  const ecommerce = page.getByRole("button", {
    name: "E-Commerce & Online Ordering",
    exact: true,
  });
  await ecommerce.focus();
  await ecommerce.press("Enter");
  await expect(ecommerce).toBeFocused();
  await expect(ecommerce).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-concept-id]")).toHaveCount(2);
  await expect(page.locator("[data-browse-mode='type']")).toHaveAttribute(
    "data-active-filter",
    "E-Commerce & Online Ordering",
  );

  await page.setViewportSize({ width: 320, height: 720 });
  await expectNoOverflow(page);
});
