import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { FORMATION_UPDATES, LAST_REVIEWED } from "@/shared/marketing/authority-content";

type UpdatePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return FORMATION_UPDATES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = FORMATION_UPDATES.find((item) => item.slug === slug);
  return { title: update?.title ?? "Formation update", description: update?.summary, alternates: { canonical: `/updates/${slug}` } };
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const update = FORMATION_UPDATES.find((item) => item.slug === slug);
  if (!update) notFound();
  return <article className="marketing-container marketing-page marketing-page-narrow update-detail"><Link className="back-link" href="/updates">All updates</Link><header><div className="update-detail-meta"><span className={`update-status update-status-${update.status.toLowerCase()}`}>{update.status}</span><time>Effective {update.effectiveDate}</time></div><h1>{update.title}</h1><p>{update.summary}</p></header><TrustStrip compact /><dl className="update-facts"><div><dt>Who is affected</dt><dd>{update.affected}</dd></div><div><dt>Recommended next step</dt><dd>{update.action}</dd></div><div><dt>Official source</dt><dd><a href={update.sourceUrl} target="_blank" rel="noreferrer">{update.sourceLabel}</a></dd></div><div><dt>Hajime treatment</dt><dd>Explain the operational impact, track relevant dates and dependencies, and defer regulated interpretation to a licensed professional.</dd></div></dl><aside className="source-note"><strong>Source standard</strong><p>Reviewed {LAST_REVIEWED}. This summary is orientation material and does not replace the current Japanese source or professional advice. Where an English translation differs, the Japanese source controls.</p></aside><div className="page-cta"><h2>Does this change affect your launch?</h2><Link className="button button-primary" href="/book-consultation">Request a launch review</Link></div></article>;
}
