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
  const fullName = page.getByRole("textbox", { name: "Full name *" });
  const businessName = page.getByRole("textbox", {
    name: "Business name *",
  });
  const email = page.getByRole("textbox", { name: "Email address *" });
  const summary = page.getByRole("textbox", { name: "Project summary *" });
  const service = page.getByRole("combobox", { name: "Service needed *" });
  const consent = page.getByRole("checkbox");
  const status = page.locator("#contact-status");

  await expect(status).toHaveClass("sr-only");
  await expect(page.getByText(/loading secure enquiry/i)).toHaveCount(0);

  await submit.click();
  await expect(status).toContainText(/review the highlighted fields/i);
  await expect(status).not.toHaveClass("sr-only");

  await email.fill("bad");
  await submit.click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify(failedResponse),
    }),
  );

  await fullName.fill("Example Person");
  await businessName.fill("Example Business");
  await email.fill("person@example.test");
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
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successfulResponse),
    }),
  );

  await submit.click();
  await expect(status).toContainText(/thanks/i);
  await expect(status).toContainText("WDD-20260713-TEST");
  await expect(fullName).toHaveValue("");
});

test("quote package query renders and privacy link works", async ({ page }) => {
  test.setTimeout(60_000);

  const packageLabels = new Map([
    ["starter", "Starter — $499"],
    ["business", "Business — $899"],
    ["growth", "Growth — $1,499"],
  ]);

  for (const packageName of [...packageLabels.keys(), "invalid"]) {
    await page.goto(`/get-started?package=${packageName}`);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByText(/loading quote form/i)).toHaveCount(0);
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Business name").fill("Test Business");
    await page.getByLabel("Email").fill("test@example.test");
    await page.getByLabel("Industry").fill("Home services");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("New Website").check();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Estimated number of pages").selectOption("1–5 pages");
    await page.getByLabel("Main business goal").fill("Generate qualified enquiries");
    await page.getByLabel("Contact or quote form").check();
    await page.getByLabel("Content status").selectOption("Ready");
    await page.getByLabel("Branding status").selectOption("Brand materials ready");
    await page.getByRole("button", { name: "Next" }).click();

    const preferred = packageLabels.has(packageName)
      ? page.getByLabel(packageLabels.get(packageName)!)
      : page.getByRole("radio", { checked: true });
    if (packageLabels.has(packageName)) {
      await expect(preferred).toBeChecked();
    } else {
      await expect(preferred).toHaveCount(0);
    }
  }

  await page.goto("/get-started");
  for (let step = 0; step < 4; step += 1) {
    if (step === 0) {
      await page.getByLabel("Full name").fill("Test Person");
      await page.getByLabel("Business name").fill("Test Business");
      await page.getByLabel("Email").fill("test@example.test");
      await page.getByLabel("Industry").fill("Home services");
    } else if (step === 1) {
      await page.getByLabel("New Website").check();
    } else if (step === 2) {
      await page.getByLabel("Estimated number of pages").selectOption("1–5 pages");
      await page.getByLabel("Main business goal").fill("Generate qualified enquiries");
      await page.getByLabel("Contact or quote form").check();
      await page.getByLabel("Content status").selectOption("Ready");
      await page.getByLabel("Branding status").selectOption("Brand materials ready");
    } else {
      await page.getByLabel("Starter — $499").check();
      await page.getByLabel("Budget range").selectOption("$500–$999");
      await page.getByLabel("Preferred start timing").selectOption("Within 30 days");
    }
    await page.getByRole("button", { name: "Next" }).click();
  }

  await page
    .locator("#main-content")
    .getByRole("link", { name: /privacy policy/i })
    .click();
  await expect(page).toHaveURL(/privacy-policy/);
});

test("industry query pre-fills the guided project brief", async ({ page }) => {
  await page.goto("/get-started?industry=home-services");
  await expect(page.getByLabel("Industry")).toHaveValue("Home Services");

  await page.goto("/get-started?industry=not-a-real-industry");
  await expect(page.getByLabel("Industry")).toHaveValue("");
});
