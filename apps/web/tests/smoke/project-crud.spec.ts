import { expect, test } from "@playwright/test";

const email = process.env.E2E_TEST_EMAIL;
const password = process.env.E2E_TEST_PASSWORD;

test("authenticated user can create, view, edit, and archive a project", async ({ page }) => {
  test.skip(!email || !password, "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to run CRUD smoke coverage.");

  const name = `Smoke Project ${Date.now()}`;

  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(email!);
  await page.getByLabel("Password").fill(password!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/projects$/);

  await page.getByRole("link", { name: /New project|Create your first project/ }).first().click();
  await page.getByLabel("Project name").fill(name);
  await page.getByLabel("Coordinator").fill("Smoke Coordinator");
  await page.getByRole("button", { name: "Create project" }).click();

  await expect(page.getByRole("heading", { name })).toBeVisible();
  await expect(page.getByText("Guided Launch", { exact: true }).first()).toBeVisible();

  await page.getByRole("link", { name: "Edit metadata" }).click();
  await page.getByLabel("Health").selectOption("at_risk");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("At risk", { exact: true }).first()).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Archive project" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Archived" })).toBeVisible();
  await expect(page.getByText(name)).toBeVisible();
});
