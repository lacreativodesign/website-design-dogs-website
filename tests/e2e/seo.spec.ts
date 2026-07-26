import { expect, test } from "@playwright/test";
import { campaignRoutes, publicRoutes } from "./helpers";

test("indexable pages have metadata and sitemap behavior is correct", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    expect(titles.has(title)).toBeFalsy();
    titles.add(title);

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
    expect(robots.some((value) => /noindex/i.test(value))).toBeFalsy();
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toMatch(/\/campaigns\//);
  expect(sitemap).not.toMatch(/\/api\//);

  const robotsText = await (await request.get("/robots.txt")).text();
  expect(robotsText).toMatch(/Disallow: \/api\//i);
  expect(robotsText).toMatch(/Sitemap:/i);
});

test("campaigns are noindex and self canonical", async ({ page }) => {
  for (const route of campaignRoutes) {
    await page.goto(route);

    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
    expect(robots.some((value) => /noindex/i.test(value))).toBeTruthy();

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${route}$`),
    );
  }
});

test("structured data parses, exposes verified contacts, and avoids fake local proof", async ({ page }) => {
  await page.goto("/");

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const serializedBlocks: string[] = [];

  for (const block of blocks) {
    const data = JSON.parse(block);
    const serialized = JSON.stringify(data);
    serializedBlocks.push(serialized);
    expect(serialized).not.toMatch(
      /LocalBusiness|aggregateRating|review|sameAs|address/i,
    );
  }

  const structuredData = serializedBlocks.join("");
  expect(structuredData).toContain(
    '"email":"hello@websitedesigndogs.com"',
  );
  expect(structuredData).toContain('"telephone":"+14159002374"');
});
