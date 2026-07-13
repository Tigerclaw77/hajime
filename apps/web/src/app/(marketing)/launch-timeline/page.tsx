import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { LAUNCH_TIMELINE } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Launch Timeline", description: "Explore the typical sequence, durations, dependencies, professional involvement, and delays in a Japan business launch.", alternates: { canonical: "/launch-timeline" } };

export default function LaunchTimelinePage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Timeline explorer" title="Registration is a milestone. Operations are the finish line.">Explore a typical sequence and open each stage to see its dependency, owner, and most common source of delay.</PageIntro><TrustStrip /><div className="timeline-explorer">{LAUNCH_TIMELINE.map((step, index) => <details key={step.name} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.name}</strong><small>{step.duration}</small></summary><div className="timeline-detail"><p>{step.detail}</p><dl><div><dt>Depends on</dt><dd>{step.dependency}</dd></div><div><dt>Primary owner</dt><dd>{step.owner}</dd></div><div><dt>Common delay</dt><dd>{step.delay}</dd></div></dl></div></details>)}</div><aside className="timeline-estimate"><div><span>Typical coordinated range</span><strong>8-20+ weeks</strong></div><p>Entity route, overseas evidence, residence status, permits, office, banking, and government review can materially change the sequence.</p><Link className="button button-primary" href="/launch-roadmap">Estimate your roadmap</Link></aside></div>;
}
