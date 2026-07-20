import { expect, test } from "@playwright/test";
import { services } from "../../src/content/services";

test("service routes, links, metadata, schema, and quote preselection", async ({ page, request }) => {
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
    await expect(page.getByRole("checkbox", { name: serviceProjectType(service.slug) })).toBeChecked();
  }
  await page.goto("/get-started?service=unknown-service");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  await expect(page).toHaveURL(/\/get-started\?service=custom-website-design$/);
  await expect(page.getByRole("checkbox", { name: serviceProjectType("custom-website-design") })).toBeChecked();

  await page.goto("/get-started?service=unknown-service&utm_source=search&utm_medium=cpc&utm_campaign=summer&gclid=test-gclid&fbclid=test-fbclid");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  const canonicalUrl = new URL(page.url());
  expect(canonicalUrl.searchParams.get("utm_source")).toBe("search");
  expect(canonicalUrl.searchParams.get("utm_medium")).toBe("cpc");
  expect(canonicalUrl.searchParams.get("utm_campaign")).toBe("summer");
  expect(canonicalUrl.searchParams.get("gclid")).toBe("test-gclid");
  expect(canonicalUrl.searchParams.get("fbclid")).toBe("test-fbclid");
  await expect(page.getByRole("checkbox", { name: serviceProjectType("custom-website-design") })).toBeChecked();

  await page.goto("/get-started?service=");
  await expect(page.getByRole("checkbox", { checked: true })).toHaveCount(0);
  await page.goto("/get-started?service=%F0");
  await page.waitForURL((url) => url.pathname === "/get-started" && url.searchParams.get("service") === "custom-website-design");
  await expect(page.getByRole("checkbox", { name: serviceProjectType("custom-website-design") })).toBeChecked();
  await page.goto("/get-started");
  await expect(page.getByRole("checkbox", { checked: true })).toHaveCount(0);

  await page.goto("/services");
  for (const service of services) await expect(page.getByRole("link", { name: `Explore ${service.title}` })).toHaveAttribute("href", `/services/${service.slug}`);
  expect((await request.get("/services/not-a-service")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const service of services) expect(sitemap).toContain(`/services/${service.slug}`);
});
function serviceProjectType(slug: string) { return ({"custom-website-design":"Custom Website Design","website-development":"Website Development","e-commerce-solutions":"E-Commerce Website","conversion-optimization":"Conversion Optimization","seo-local-optimization":"SEO & Local Optimization","content-copywriting":"Content & Copywriting","hosting-security":"Hosting & Security","analytics-reporting":"Analytics & Reporting"} as Record<string,string>)[slug]; }
