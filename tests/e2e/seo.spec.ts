import { expect, test } from "@playwright/test";
import { campaignRoutes, publicRoutes } from "./helpers";

test("indexable pages have metadata and sitemap behavior is correct", async ({
  page,
  request,
}) => {
  test.setTimeout(60_000);
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
  expect(robotsText).toMatch(/User-agent: OAI-SearchBot[\s\S]*Allow: \//i);
  expect(robotsText).toMatch(/User-agent: GPTBot[\s\S]*Disallow: \//i);

  const llmsResponse = await request.get("/llms.txt");
  expect(llmsResponse.ok()).toBeTruthy();
  expect(llmsResponse.headers()["content-type"]).toMatch(/text\/markdown/i);
  const llms = await llmsResponse.text();
  expect(llms).toContain("# Website Design Dogs");
  expect(llms).toContain("/llms-full.txt");
  expect(llms).toMatch(/concepts, not client case studies/i);

  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBeTruthy();
  expect(manifestResponse.headers()["content-type"]).toMatch(
    /application\/manifest\+json/i,
  );
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
  const graph: Array<Record<string, unknown>> = [];

  for (const block of blocks) {
    const data = JSON.parse(block) as Record<string, unknown>;
    const serialized = JSON.stringify(data);
    serializedBlocks.push(serialized);
    expect(serialized).not.toMatch(/"@type":"LocalBusiness"|"aggregateRating"|"review"/i);
    const nodes = data["@graph"];
    if (Array.isArray(nodes)) graph.push(...(nodes as Array<Record<string, unknown>>));
    else graph.push(data);
  }

  const structuredData = serializedBlocks.join("");
  expect(structuredData).toContain(
    '"email":"hello@websitedesigndogs.com"',
  );
  expect(structuredData).toContain('"telephone":"+15127647834"');
  expect(structuredData).toContain('"parentOrganization"');
  expect(structuredData).toContain('"legalName":"LA CREATIVO GROUP, LLC"');

  const organization = graph.find((node) => node["@type"] === "Organization");
  expect(organization).toBeDefined();
  expect(organization?.sameAs).toEqual([
    "https://www.facebook.com/WebsiteDesignDogs",
    "https://www.instagram.com/websitedesigndogs/",
  ]);
  expect(organization?.address).toEqual({
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78731",
    addressCountry: "US",
  });
});

test("service and package schema matches visible content", async ({ page }) => {
  await page.goto("/services/custom-website-design");
  await expect(
    page.getByRole("heading", { name: "Custom Website Design", exact: true }),
  ).toBeVisible();
  const serviceSchema = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).join("");
  expect(serviceSchema).toContain('"@type":"Service"');
  expect(serviceSchema).toContain('"name":"Custom Website Design"');

  await page.goto("/packages/starter");
  await expect(page.getByText("Helpful answers before you choose.")).toBeVisible();
  const packageSchema = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).join("");
  expect(packageSchema).toContain('"price":499');
  expect(packageSchema).toContain('"@type":"FAQPage"');
});
