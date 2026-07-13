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

  await submit.click();
  await expect(status).toContainText(/review the highlighted fields/i);

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
  for (const packageName of ["starter", "business", "growth", "invalid"]) {
    await page.goto(`/get-started?package=${packageName}`);
    await expect(page.locator("#main-content")).toBeVisible();
  }

  await page.getByRole("link", { name: /privacy policy/i }).first().click();
  await expect(page).toHaveURL(/privacy-policy/);
});
