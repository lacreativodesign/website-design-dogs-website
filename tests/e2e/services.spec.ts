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
    const serviceHero = page.getByRole("region", { name: service.title });
    const quoteCta = serviceHero.getByRole("link", { name: "Get a Free Quote", exact: true });
    await expect(quoteCta).toHaveAttribute("href", `/get-started?service=${service.slug}`);
    await expect(quoteCta).not.toHaveAttribute("target", "_blank");
    await quoteCta.click();
    await expect(page).toHaveURL(new RegExp(`/get-started\?service=${service.slug}$`));
    await expect(page.getByRole("checkbox", { name: serviceProjectType(service.slug) })).toBeChecked();
  }
  await page.goto("/services");
  for (const service of services) await expect(page.getByRole("link", { name: `Explore ${service.title}` })).toHaveAttribute("href", `/services/${service.slug}`);
  expect((await request.get("/services/not-a-service")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const service of services) expect(sitemap).toContain(`/services/${service.slug}`);
});
function serviceProjectType(slug: string) { return ({"custom-website-design":"Custom Website Design","website-development":"Website Development","e-commerce-solutions":"E-Commerce Website","conversion-optimization":"Conversion Optimization","seo-local-optimization":"SEO & Local Optimization","content-copywriting":"Content & Copywriting","hosting-security":"Hosting & Security","analytics-reporting":"Analytics & Reporting"} as Record<string,string>)[slug]; }
