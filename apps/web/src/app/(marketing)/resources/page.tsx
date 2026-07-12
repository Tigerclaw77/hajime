import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Resources", description: "Practical formation resources for founders preparing to build a business in Japan.", alternates: { canonical: "/resources" } };

const resources = [
  { id: "readiness", label: "Readiness", title: "Before you choose a formation route", text: "Clarify the business activity, owners, capital plan, target city, residence assumptions, and first-year operating needs. These inputs shape the entity, providers, office route, banking preparation, and schedule." },
  { id: "providers", label: "Provider map", title: "Who does what in a Japan launch", text: "Judicial and administrative scriveners, attorneys, accountants, tax attorneys, office providers, banks, insurers, payroll providers, and HR specialists own different parts of the outcome. The right sequence matters as much as the provider list." },
  { id: "timing", label: "Timing", title: "Why formation timelines move", text: "Document preparation, overseas legalization, capital movement, office requirements, regulated filings, immigration, and bank review can create dependencies. Build the schedule around what must happen in order, not an optimistic filing date." },
] as const;

export default function ResourcesPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Resources" title="Prepare for the decisions that shape your launch.">Concise working notes for founders who want a clearer picture before engaging providers.</PageIntro><div className="resource-list">{resources.map((resource, index) => <article id={resource.id} key={resource.id}><div><span>{String(index + 1).padStart(2, "0")}</span><small>{resource.label}</small></div><div><h2>{resource.title}</h2><p>{resource.text}</p></div></article>)}</div><aside className="resource-note"><strong>A useful first conversation starts with constraints.</strong><p>You do not need every answer. Bring your target timeline, ownership plan, business activity, and the decisions you are currently stuck on.</p><Link className="text-link marketing-text-link" href="/book-consultation">Book a discovery call</Link></aside></div>;
}
