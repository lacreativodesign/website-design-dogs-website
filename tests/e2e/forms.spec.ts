import { expect, test } from "@playwright/test";

const failedResponse = {
  ok: false,
  code: "SUBMISSION_DISABLED",
  message:
    "Secure online submission is temporarily unavailable. Your information has not been sent.",
};

const successfulResponse = {
  ok: true,
  message: "Thanks — your request was received successfully.",
  referenceId: "WDD-20260713-TEST",
};

test("contact form validation, failure preservation, and mocked success", async ({
  page,
}) => {
  await page.goto("/contact");

  const submit = page.getByRole("button", { name: "Send Enquiry" });
  const fullName = page.getByRole("textbox", { name: /^Full name/ });
  const businessName = page.getByRole("textbox", {
    name: /^Business name/,
  });
  const email = page.getByRole("textbox", { name: /^Email address/ });
  const phone = page.getByRole("textbox", { name: /^Phone number/ });
  const summary = page.getByRole("textbox", { name: /^Project summary/ });
  const service = page.getByRole("combobox", { name: /^Service needed/ });
  const consent = page.getByRole("checkbox", { name: /I consent/i });
  const status = page.locator("#contact-status");
  const submissionIds: string[] = [];

  await expect(status).toHaveClass("sr-only");
  await expect(page.getByText(/loading secure enquiry/i)).toHaveCount(0);

  await submit.click();
  await expect(status).toContainText(/review the highlighted fields/i);
  await expect(status).not.toHaveClass("sr-only");

  await email.fill("bad");
  await submit.click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  await page.route("**/api/leads", (route) => {
    const body = route.request().postDataJSON() as { submissionId: string };
    submissionIds.push(body.submissionId);
    return route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify(failedResponse),
    });
  });

  await fullName.fill("Example Person");
  await businessName.fill("Example Business");
  await email.fill("person@example.test");
  await phone.fill("(415) 900-2374");
  await service.selectOption({ label: "New Website" });
  await summary.fill(
    "We need a professional website for our growing service business.",
  );
  await consent.check();
  await submit.click();

  await expect(fullName).toHaveValue("Example Person");
  await expect(status).toContainText(/temporarily unavailable/i);
  await expect(status).not.toContainText(/thanks/i);

  await page.unroute("**/api/leads");
  await page.route("**/api/leads", (route) => {
    const body = route.request().postDataJSON() as { submissionId: string };
    submissionIds.push(body.submissionId);
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successfulResponse),
    });
  });

  await submit.click();
  await expect(status).toContainText(/thanks/i);
  await expect(status).toContainText("WDD-20260713-TEST");
  await expect(fullName).toHaveValue("");
  expect(submissionIds).toHaveLength(2);
  expect(submissionIds[1]).toBe(submissionIds[0]);
});

test("contact form retains first-landing attribution across navigation", async ({
  page,
}) => {
  const query =
    "utm_source=google&utm_medium=cpc&utm_campaign=spring&gclid=google-click&fbclid=facebook-click";

  await page.goto(`/services?${query}`);
  await expect
    .poll(() =>
      page.evaluate(() => sessionStorage.getItem("wdd-attribution-v1")),
    )
    .not.toBeNull();
  await page.goto("/contact");

  let submitted:
    | {
        consent: boolean;
        attribution: {
          landingPage: string;
          currentPage: string;
          utmSource: string;
          utmMedium: string;
          utmCampaign: string;
          gclid: string;
          fbclid: string;
        };
      }
    | undefined;

  await page.route("**/api/leads", (route) => {
    submitted = route.request().postDataJSON() as typeof submitted;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ...successfulResponse, duplicate: true }),
    });
  });

  await page.getByRole("textbox", { name: /^Full name/ }).fill("Jane Smith");
  await page
    .getByRole("textbox", { name: /^Business name/ })
    .fill("Acme Ltd");
  await page
    .getByRole("textbox", { name: /^Email address/ })
    .fill("jane@example.com");
  await page
    .getByRole("textbox", { name: /^Phone number/ })
    .fill("(415) 900-2374");
  await page
    .getByRole("combobox", { name: /^Service needed/ })
    .selectOption({ label: "New Website" });
  await page
    .getByRole("textbox", { name: /^Project summary/ })
    .fill("We need a professional website for our growing service business.");
  await page.getByRole("checkbox", { name: /I consent/i }).check();
  await page.getByRole("button", { name: "Send Enquiry" }).click();

  await expect(page.locator("#contact-status")).toContainText(/thanks/i);
  expect(submitted?.consent).toBe(true);
  expect(submitted?.attribution).toMatchObject({
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "spring",
    gclid: "google-click",
    fbclid: "facebook-click",
  });
  expect(submitted?.attribution.landingPage).toContain(`/services?${query}`);
  expect(submitted?.attribution.currentPage).toMatch(/\/contact$/);
});

test("guided quote submits the project brief with checked consent", async ({
  page,
}) => {
  await page.goto("/get-started");

  let submitted:
    | {
        formType: string;
        consent: boolean;
        contact: { email: string };
        business: { website?: string };
        project: { goal: string };
      }
    | undefined;

  await page.route("**/api/leads", (route) => {
    submitted = route.request().postDataJSON() as typeof submitted;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ...successfulResponse,
        referenceId: "BIZOSTO-QUOTE-TEST",
        confirmationEmailSent: true,
      }),
    });
  });

  await page.getByLabel("Full name").fill("Jane Smith");
  await page.getByLabel("Business name").fill("Acme Ltd");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("Phone number").fill("(415) 900-2374");
  await page.getByLabel("Current website").fill("bizosto.com");
  await page.getByLabel("Industry").selectOption({ label: "Home Services" });
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("New Website").check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Estimated number of pages").selectOption("1–5 pages");
  await page.getByLabel("Main business goal").fill("Generate qualified leads");
  await page.getByLabel("Contact or quote form").check();
  await page.getByLabel("Content status").selectOption("Ready");
  await page.getByLabel("Branding status").selectOption("Brand materials ready");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Budget range").selectOption("$500–$999");
  await page.getByLabel("Preferred start timing").selectOption("Within 30 days");
  await page
    .getByLabel("What is not working today?")
    .fill("Our website is not generating qualified enquiries.");
  await page
    .getByLabel("What should this project help accomplish?")
    .fill("Convert visitors into qualified sales opportunities.");
  await page.getByRole("checkbox", { name: /I consent/i }).check();
  await page.getByRole("button", { name: "Send Quote Request" }).click();

  await expect(page.getByText(/BIZOSTO-QUOTE-TEST/)).toBeVisible();
  await expect(page.getByText("Confirmation sent")).toBeVisible();
  await expect(
    page.getByAltText(
      "Website Design Dogs project specialist ready to review the submitted brief",
    ),
  ).toBeVisible();
  expect(submitted).toMatchObject({
    formType: "quote",
    consent: true,
    contact: { email: "jane@example.com" },
    business: { website: "https://bizosto.com/" },
    project: { goal: "Generate qualified leads" },
  });
});

test("package query does not complicate the quote request and privacy link works", async ({ page }) => {
  test.setTimeout(120_000);

  for (const packageName of [
    "starter",
    "business",
    "commerce-launch",
    "seo-growth",
    "social-foundation",
    "care-business",
    "app-launch-mvp",
    "invalid",
  ]) {
    await page.goto(`/get-started?package=${packageName}`);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByText(/loading quote form/i)).toHaveCount(0);
    await expect(page.getByText("Recommended starting point")).toHaveCount(0);
    await expect(page.getByText("Preferred package")).toHaveCount(0);
    await expect(page.getByRole("radio")).toHaveCount(0);
  }

  await page.goto("/get-started");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Business name").fill("Test Business");
  await page.getByLabel("Email").fill("test@example.test");
  await page.getByLabel("Phone number").fill("(415) 900-2374");
  await page.getByLabel("Industry").selectOption({ label: "Home Services" });
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("New Website").check();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Estimated number of pages").selectOption("1–5 pages");
  await page.getByLabel("Main business goal").fill("Generate qualified enquiries");
  await page.getByLabel("Contact or quote form").check();
  await page.getByLabel("Content status").selectOption("Ready");
  await page.getByLabel("Branding status").selectOption("Brand materials ready");
  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", { name: "Final Details" })).toBeVisible();
  await page.getByLabel("Budget range").selectOption("$500–$999");
  await page.getByLabel("Preferred start timing").selectOption("Within 30 days");
  await page
    .getByLabel("What is not working today?")
    .fill("The current website is not generating enough qualified enquiries.");
  await page
    .getByLabel("What should this project help accomplish?")
    .fill("Generate qualified enquiries and make the business easier to understand.");

  await expect(
    page.getByText("Please review the highlighted fields and try again."),
  ).toHaveCount(0);

  await page
    .locator("#main-content")
    .getByRole("link", { name: /privacy policy/i })
    .click();
  await expect(page).toHaveURL(/privacy-policy/);
});

test("quote project-type cards stay compact and usable across responsive widths", async ({ page }) => {
  test.setTimeout(120_000);

  const viewports = [
    { width: 1440, height: 1000 },
    { width: 820, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/get-started");

    await page.getByLabel("Full name").fill("Responsive Test");
    await page.getByLabel("Business name").fill("WDD QA");
    await page.getByLabel("Email").fill("responsive@example.test");
    await page.getByLabel("Phone number").fill("(415) 900-2374");
    await page.getByLabel("Industry").selectOption({ label: "Home Services" });
    await page.getByRole("button", { name: "Next" }).click();

    await expect(page.getByRole("heading", { name: "Project Type" })).toBeVisible();
    const cards = page.locator(".quote-choice-card");
    await expect(cards).toHaveCount(16);

    const layout = await page.evaluate(() => {
      const cardMetrics = [...document.querySelectorAll<HTMLElement>(".quote-choice-card")].map((card) => {
        const label = card.querySelector<HTMLElement>("strong");
        const rect = card.getBoundingClientRect();
        const labelRect = label?.getBoundingClientRect();
        const labelStyle = label ? getComputedStyle(label) : null;
        return {
          width: rect.width,
          height: rect.height,
          labelWidth: labelRect?.width ?? 0,
          wordBreak: labelStyle?.wordBreak ?? "",
        };
      });
      const progress = document.querySelector<HTMLElement>(".quote-progress__steps");
      const builder = document.querySelector<HTMLElement>(".quote-builder");
      const summary = document.querySelector<HTMLElement>(".quote-summary");
      const builderRect = builder?.getBoundingClientRect();
      const summaryRect = summary?.getBoundingClientRect();

      return {
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        progressColumns: progress
          ? getComputedStyle(progress).gridTemplateColumns.split(/\s+/).filter(Boolean).length
          : 0,
        builderRight: builderRect?.right ?? 0,
        summaryRight: summaryRect?.right ?? 0,
        cards: cardMetrics,
      };
    });

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.progressColumns).toBe(4);
    expect(layout.builderRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.summaryRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.cards.every((card) => card.height <= 96)).toBe(true);
    expect(layout.cards.every((card) => card.labelWidth >= 120)).toBe(true);
    expect(layout.cards.every((card) => card.wordBreak === "normal")).toBe(true);
  }
});

test("industry query pre-fills the guided project brief", async ({ page }) => {
  await page.goto("/get-started?industry=home-services");
  await expect(page.getByLabel("Industry")).toHaveValue("Home Services");

  await page.goto("/get-started?industry=not-a-real-industry");
  await expect(page.getByLabel("Industry")).toHaveValue("");
});
