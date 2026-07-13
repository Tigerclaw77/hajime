import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/how-it-works", "/pricing", "/faq", "/about", "/resources", "/updates", "/launch-roadmap", "/knowledge-base", "/government-changes", "/launch-timeline", "/common-mistakes", "/professionals", "/email-updates", "/book-consultation", "/privacy", "/terms"];
  const dynamicRoutes = [
    "/updates/business-manager-requirements", "/updates/business-manager-transition", "/updates/jetro-guidance-2026", "/updates/nta-translation-currency",
    "/knowledge-base/getting-started", "/knowledge-base/business-structures", "/knowledge-base/business-manager-visa", "/knowledge-base/taxes", "/knowledge-base/hiring", "/knowledge-base/office-requirements", "/knowledge-base/banking", "/knowledge-base/registration", "/knowledge-base/compliance", "/knowledge-base/common-mistakes", "/knowledge-base/translations", "/knowledge-base/government-agencies", "/knowledge-base/professional-roles",
  ];
  return [...routes, ...dynamicRoutes].map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route.startsWith("/updates") || route === "/government-changes" ? "daily" : route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/book-consultation" || route === "/launch-roadmap" ? 0.9 : 0.7 }));
}
