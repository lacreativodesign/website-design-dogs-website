import { expect, test } from "@playwright/test";
import { campaignRoutes } from "./helpers";

const retiredPrice = [2, 4, 9].join("");

for (const route of campaignRoutes) {
  test(`${route} campaign content and pricing`, async ({ page }) => {
    const response = await page.goto(
      `${route}?price=1&offer=free&savings=9999`,
    );

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("#main-content h1")).toHaveCount(1);
    await expect(page.locator("#main-content h1")).toBeVisible();
    await expect(page.locator("body")).toContainText("$499");
    await expect(page.locator("body")).not.toContainText(`$${retiredPrice}`);
    await expect(page.locator("body")).not.toContainText("$250");
    await expect(page.locator("body")).not.toContainText(/promotional|you save/i);
    await expect(page.locator(".badge", { hasText: "DESIGN CONCEPT" })).toHaveCount(1);
    await expect(page.locator("body")).toContainText(
      /not presented as a completed client project/i,
    );
    await expect(page.locator("#campaign-form")).toHaveCount(1);
    await expect(page.locator("#offer-details")).toHaveCount(1);
    await expect(page.locator("[data-countdown]")).toHaveCount(0);
    await expect(page.getByText(/only\s+\d+\s+(spots|places)\s+left/i)).toHaveCount(0);
    await expect(page.getByText(/offer expires/i)).toHaveCount(0);

    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
    expect(robots.some((value) => /noindex/i.test(value))).toBeTruthy();

    const title = await page.title();
    expect(title.match(/Website Design Dogs/g)?.length ?? 0).toBe(1);
  });
}

test("unknown campaign returns 404", async ({ page }) => {
  const response = await page.goto("/campaigns/not-real");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /^page not found$/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /^back to home$/i }),
  ).toBeVisible();
});

test("campaign form submits checked consent and first-touch attribution", async ({
  page,
}) => {
  await page.goto("/services?utm_source=linkedin&utm_campaign=agency-beta");
  await expect
    .poll(() =>
      page.evaluate(() => sessionStorage.getItem("wdd-attribution-v1")),
    )
    .not.toBeNull();
  await page.goto("/campaigns/cleaning");

  let submitted:
    | {
        formType: string;
        campaignSlug: string;
        consent: boolean;
        attribution: { utmSource: string; utmCampaign: string };
      }
    | undefined;

  await page.route("**/api/leads", (route) => {
    submitted = route.request().postDataJSON() as typeof submitted;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        duplicate: true,
        message: "Thanks — your request was received successfully.",
        referenceId: "BIZOSTO-CAMPAIGN-TEST",
      }),
    });
  });

  const form = page.locator("#campaign-form");
  await form.getByLabel("Full name").fill("Jane Smith");
  await form.getByLabel("Business name").fill("Acme Cleaning");
  await form.getByLabel("Email address").fill("jane@example.com");
  await form.getByLabel("Phone number").fill("(415) 900-2374");
  await form.getByRole("checkbox", { name: /I consent/i }).check();
  await form
    .getByRole("button", { name: "Request a Starter Website Quote" })
    .click();

  await expect(form).toContainText("BIZOSTO-CAMPAIGN-TEST");
  expect(submitted).toMatchObject({
    formType: "campaign",
    campaignSlug: "cleaning",
    consent: true,
    attribution: {
      utmSource: "linkedin",
      utmCampaign: "agency-beta",
    },
  });
});
