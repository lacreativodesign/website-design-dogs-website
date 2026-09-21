import { expect, test, type Page } from "@playwright/test";
import { services } from "../../src/content/services";
import {
  additionalNeedOptions,
  primaryLabel,
} from "../../src/lib/leads/package-recommendation";
import { packageCategoryBySlug } from "../../src/content/packages";

test("service routes, links, metadata, schema, and quote preselection", async ({ page, request }) => {
  test.setTimeout(120_000);

  for (const service of services) {
    const route = `/services/${service.slug}`;
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(service.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route}$`));
    await expect(page.getByRole("link", { name: `Explore ${service.title}` })).toHaveCount(0);
    const quoteCta = page.getByTestId("service-primary-quote");
    const expectedHref = `/get-started?service=${service.slug}`;
    await expect(quoteCta).toHaveAttribute("href", expectedHref);
    await expect(quoteCta).not.toHaveAttribute("target", "_blank");
    await Promise.all([
      page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === service.slug),
      quoteCta.click(),
    ]);
    const quoteUrl = new URL(page.url());
    expect(quoteUrl.pathname).toBe("/get-started");
    expect(quoteUrl.searchParams.get("service")).toBe(service.slug);
    await openProjectTypeStep(page);
    await expect(
      page.getByRole("radio", {
        name: new RegExp(primaryLabel(service.packageCategory), "i"),
      }),
    ).toBeChecked();

    const coreServiceSlug = packageCategoryBySlug.get(service.packageCategory)?.serviceSlug;
    if (
      service.slug !== coreServiceSlug &&
      additionalNeedOptions.includes(
        service.title as (typeof additionalNeedOptions)[number],
      )
    ) {
      await expect(
        page.getByRole("checkbox", { name: service.title }),
      ).toBeChecked();
    }
  }

  await page.goto("/get-started?service=unknown-service");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  await expect(page).toHaveURL(/\/get-started\?service=custom-website-design$/);
  await openProjectTypeStep(page);
  await expect(
    page.getByRole("radio", { name: /Website Design & Development/i }),
  ).toBeChecked();

  await page.goto("/get-started?service=unknown-service&utm_source=search&utm_medium=cpc&utm_campaign=summer&gclid=test-gclid&fbclid=test-fbclid");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  const canonicalUrl = new URL(page.url());
  expect(canonicalUrl.searchParams.get("utm_source")).toBe("search");
  expect(canonicalUrl.searchParams.get("utm_medium")).toBe("cpc");
  expect(canonicalUrl.searchParams.get("utm_campaign")).toBe("summer");
  expect(canonicalUrl.searchParams.get("gclid")).toBe("test-gclid");
  expect(canonicalUrl.searchParams.get("fbclid")).toBe("test-fbclid");
  await openProjectTypeStep(page);
  await expect(
    page.getByRole("radio", { name: /Website Design & Development/i }),
  ).toBeChecked();

  await page.goto("/get-started?service=");
  await openProjectTypeStep(page);
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);

  await page.goto("/get-started?service=%F0");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  await openProjectTypeStep(page);
  await expect(
    page.getByRole("radio", { name: /Website Design & Development/i }),
  ).toBeChecked();

  await page.goto("/get-started");
  await openProjectTypeStep(page);
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);

  await page.goto("/services");
  for (const service of services) await expect(page.getByRole("link", { name: `Explore ${service.title}` })).toHaveAttribute("href", `/services/${service.slug}`);
  expect((await request.get("/services/not-a-service")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const service of services) expect(sitemap).toContain(`/services/${service.slug}`);
});

async function openProjectTypeStep(page: Page) {
  await page.getByRole("textbox", { name: /^Full name/ }).fill("Website Design Dogs QA");
  await page.getByRole("textbox", { name: /^Business name/ }).fill("QA Business");
  await page.getByRole("textbox", { name: /^Email/ }).fill("qa@example.com");
  await page.getByRole("textbox", { name: /^Phone number/ }).fill("(415) 900-2374");
  await page.getByRole("combobox", { name: /^Industry/ }).selectOption({
    label: "Professional Services",
  });
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Primary Service" })).toBeVisible();
}
