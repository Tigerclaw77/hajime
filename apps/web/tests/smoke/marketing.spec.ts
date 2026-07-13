import { expect, test } from "@playwright/test";

test("marketing homepage presents the formation offer and primary conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Hajime Japan/);
  await expect(page.getByRole("heading", { name: "Launch Your Business in Japan." })).toBeVisible();
  await expect(page.getByText("You are here")).toBeVisible();
  await expect(page.getByText("Operating in Japan")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your launch, live." })).toBeVisible();
  await expect(page.locator(".experience-hero .experience-primary-cta")).toHaveAttribute("href", "/launch-roadmap");
});

test("every public information page is available", async ({ page }) => {
  const pages = [
    ["/how-it-works", "A clear path from decision to launch."],
    ["/pricing", "Know the boundary before you commit."],
    ["/faq", "Straight answers before we begin."],
    ["/about", "Built for the space between a decision and a functioning business."],
    ["/resources", "The working tools behind a clearer launch."],
    ["/updates", "What changed, who is affected, and what to do next."],
    ["/launch-roadmap", "See the shape of your Japan launch."],
    ["/knowledge-base", "Understand the launch before the handoffs begin."],
    ["/government-changes", "Policy changes, translated into operational next steps."],
    ["/launch-timeline", "Registration is a milestone. Operations are the finish line."],
    ["/common-mistakes", "Most delays begin before anyone files."],
    ["/professionals", "The right professional, at the right moment."],
    ["/email-updates", "Only the changes that affect a launch."],
    ["/privacy", "Your information should have a clear purpose."],
    ["/terms", "Clear boundaries begin before an engagement."],
  ] as const;

  for (const [url, heading] of pages) {
    await page.goto(url);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
});

test("roadmap responds to launch complexity and keeps discovery as the next action", async ({ page }) => {
  await page.goto("/launch-roadmap");
  await expect(page.getByText("0% complete")).toBeVisible();
  await page.getByLabel("Japan company").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Outside Japan").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Yes").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("No", { exact: true }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("No", { exact: true }).check();
  await expect(page.getByText("12-25 weeks")).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Request a roadmap review" })).toHaveAttribute("href", "/book-consultation");
  await expect(page.getByText("Immigration professional", { exact: true })).toBeVisible();
});

test("homepage motion respects reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".experience-hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".experience-slide")).toHaveCount(6);
});

test("consultation form validates required qualification context", async ({ page }) => {
  await page.goto("/book-consultation");
  await page.getByRole("button", { name: "Request discovery" }).click();

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
