import { expect, type Page } from "@playwright/test";
import { allPackages } from "../../src/content/packages";
import { services } from "../../src/content/services";

export const serviceRoutes = services.map(
  (service) => `/services/${service.slug}`,
);
export const packageRoutes = allPackages.map(
  (item) => `/packages/${item.slug}`,
);
export const publicRoutes = [
  "/",
  "/services",
  ...serviceRoutes,
  "/portfolio",
  "/packages",
  ...packageRoutes,
  "/platforms",
  "/about",
  "/contact",
  "/faq",
  "/get-started",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-cancellation-policy",
  "/cookie-policy",
];
export const campaignRoutes = [
  "/campaigns/cleaning",
  "/campaigns/roofing",
  "/campaigns/landscaping",
  "/campaigns/home-services",
];

export async function noConsoleFailures(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (
      ["error", "warning"].includes(message.type()) &&
      /hydration|failed|error/i.test(message.text())
    ) {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

export async function expectNoOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBeTruthy();
}
