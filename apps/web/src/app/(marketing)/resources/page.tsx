import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { OFFICIAL_AGENCIES } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Formation Resources", description: "Checklists, timelines, official agencies, professional roles, common mistakes, and practical launch resources for Japan.", alternates: { canonical: "/resources" } };

const resourceGroups = [
  { label: "Plan", title: "Personalized launch roadmap", text: "Generate a timeline, checklist preview, professional map, likely documents, agencies, and blockers from five questions.", href: "/launch-roadmap" },
  { label: "Track", title: "Government change tracker", text: "Follow material policy and official-guidance changes by effective date, affected audience, and required action.", href: "/government-changes" },
  { label: "Sequence", title: "Business launch timeline", text: "Explore average durations, dependencies, owners, and recurring delays from route selection through operations.", href: "/launch-timeline" },
  { label: "Avoid", title: "Common mistakes library", text: "Review the coordination failures that create rework before registration and during operational setup.", href: "/common-mistakes" },
  { label: "Understand", title: "Formation knowledge base", text: "Browse source-aware guidance across structures, visa, tax, hiring, office, banking, registration, and compliance.", href: "/knowledge-base" },
  { label: "Engage", title: "Professional role guide", text: "Understand which licensed professional owns which question and when each role typically enters the sequence.", href: "/professionals" },
] as const;

export default function ResourcesPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Resource hub" title="The working tools behind a clearer launch.">Start with your next decision, not a wall of articles. Every resource is designed to explain, sequence, track, or route work to the right professional.</PageIntro><TrustStrip /><div className="resource-hub-grid">{resourceGroups.map((resource) => <Link href={resource.href} key={resource.href}><span>{resource.label}</span><h2>{resource.title}</h2><p>{resource.text}</p><small>Open resource</small></Link>)}</div><section className="agency-directory"><div className="authority-section-head"><div><span className="marketing-eyebrow">Agency guide</span><h2>Go to the source.</h2></div><p>Official English pages are useful orientation. Current Japanese text and professional interpretation control where requirements or eligibility matter.</p></div><div>{OFFICIAL_AGENCIES.map((agency) => <a href={agency.url} target="_blank" rel="noreferrer" key={agency.name}><strong>{agency.name}</strong><span>{agency.remit}</span><small>Official site</small></a>)}</div></section></div>;
}
