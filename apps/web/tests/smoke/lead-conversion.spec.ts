import { expect, test } from "@playwright/test";

const email = process.env.E2E_TEST_EMAIL;
const password = process.env.E2E_TEST_PASSWORD;

test("authenticated founder can move a lead through discovery, proposal, and conversion", async ({ page }) => {
  test.skip(!email || !password, "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to run lead conversion smoke coverage.");
  const name = `Lead Smoke ${Date.now()}`;

  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(email!);
  await page.getByLabel("Password").fill(password!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/projects$/);

  await page.goto("/leads/new");
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").fill(`lead-${Date.now()}@example.com`);
  await page.getByLabel("Country").fill("United States");
  await page.getByLabel("Business type").fill("Technology services");
  await page.getByLabel("Assigned coordinator").fill("Smoke Coordinator");
  await page.getByRole("button", { name: "Create lead" }).click();
  await expect(page.getByRole("heading", { name })).toBeVisible();

  await page.getByRole("link", { name: "Edit discovery" }).click();
  await page.getByLabel("Meeting date").fill("2026-08-01");
  await page.getByLabel("Summary").fill("Qualified founder with a clear Japan launch plan.");
  await page.getByLabel("Next action").fill("Send Concierge proposal");
  await page.getByRole("button", { name: "Save discovery" }).click();
  await expect(page.getByText("Qualified founder with a clear Japan launch plan.")).toBeVisible();

  await page.getByRole("link", { name: "Edit proposal" }).click();
  await page.getByLabel("Package proposed").selectOption("concierge");
  await page.getByLabel("Expected value (USD)").fill("9500.00");
  await page.getByRole("button", { name: "Save proposal" }).click();
  await expect(page.getByRole("heading", { name: "Concierge" })).toBeVisible();

  await page.getByLabel("Status").selectOption("won");
  await page.getByRole("button", { name: "Update status" }).click();
  await expect(page.getByText("Converted customer")).toBeVisible();
  await page.getByRole("link", { name: "Open project" }).click();
  await expect(page.getByRole("heading", { name: `${name} Japan Launch` })).toBeVisible();
});
