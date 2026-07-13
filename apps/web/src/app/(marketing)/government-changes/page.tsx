import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { FORMATION_UPDATES } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Formation Government Change Tracker", description: "A chronological tracker of official policy and guidance changes affecting business formation in Japan.", alternates: { canonical: "/government-changes" } };

export default function GovernmentChangesPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Government change tracker" title="Policy changes, translated into operational next steps.">Chronological monitoring for founders who need to know what changed without mistaking a summary for regulated advice.</PageIntro><TrustStrip /><ol className="change-timeline">{FORMATION_UPDATES.map((update) => <li key={update.slug}><div className="change-date"><time>{update.effectiveDate}</time><span className={`update-status update-status-${update.status.toLowerCase()}`}>{update.status}</span></div><article><h2>{update.title}</h2><p>{update.summary}</p><dl><div><dt>Who is affected</dt><dd>{update.affected}</dd></div><div><dt>Action required</dt><dd>{update.action}</dd></div><div><dt>Source</dt><dd><a href={update.sourceUrl} target="_blank" rel="noreferrer">{update.sourceLabel}</a></dd></div></dl><Link className="text-link marketing-text-link" href={`/updates/${update.slug}`}>Read Hajime explanation</Link></article></li>)}</ol></div>;
}
