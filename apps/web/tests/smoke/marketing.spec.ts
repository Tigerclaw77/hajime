import { expect, test } from "@playwright/test";

test("marketing homepage presents the formation offer and primary conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Hajime Japan/);
  await expect(page.getByRole("heading", { name: "Business Formation Coordination for Japan." })).toBeVisible();
  await expect(page.getByText("Formation in progress")).toBeVisible();
  await expect(page.getByText("Review the signature packet by Friday")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a discovery call" }).first()).toHaveAttribute("href", "/book-consultation");
});

test("every public information page is available", async ({ page }) => {
  const pages = [
    ["/how-it-works", "A clear path from decision to launch."],
    ["/pricing", "Clear scope before you commit."],
    ["/faq", "Straight answers before we begin."],
    ["/about", "Built for the space between a decision and a functioning business."],
    ["/resources", "Prepare for the decisions that shape your launch."],
    ["/privacy", "Your information should have a clear purpose."],
    ["/terms", "Clear boundaries begin before an engagement."],
  ] as const;

  for (const [url, heading] of pages) {
    await page.goto(url);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
});

test("consultation form validates required qualification context", async ({ page }) => {
  await page.goto("/book-consultation");
  await page.getByRole("button", { name: "Request discovery call" }).click();

  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Choose a target timeline.")).toBeVisible();
});

test("mobile homepage has no horizontal overflow and keeps navigation usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const pageWidth = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(pageWidth.scroll).toBeLessThanOrEqual(pageWidth.client);
  await page.getByText("Menu", { exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Pricing" })).toBeVisible();
});

test("SEO discovery endpoints are generated", async ({ request }) => {
  const [robots, sitemap] = await Promise.all([request.get("/robots.txt"), request.get("/sitemap.xml")]);
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/book-consultation");
});
