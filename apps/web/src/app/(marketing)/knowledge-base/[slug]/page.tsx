import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { KNOWLEDGE_CLUSTERS } from "@/shared/marketing/authority-content";

type KnowledgePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return KNOWLEDGE_CLUSTERS.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: KnowledgePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cluster = KNOWLEDGE_CLUSTERS.find((item) => item.slug === slug);
  return { title: cluster?.name ?? "Knowledge base", description: cluster?.description, alternates: { canonical: `/knowledge-base/${slug}` } };
}

export default async function KnowledgeClusterPage({ params }: KnowledgePageProps) {
  const { slug } = await params;
  const cluster = KNOWLEDGE_CLUSTERS.find((item) => item.slug === slug);
  if (!cluster) notFound();
  return <div className="marketing-container marketing-page marketing-page-narrow knowledge-detail"><Link className="back-link" href="/knowledge-base">Knowledge base</Link><header className="marketing-page-intro"><span className="marketing-eyebrow">Formation guide</span><h1>{cluster.name}</h1><p>{cluster.description}</p></header><TrustStrip compact /><div className="knowledge-topic-list">{cluster.topics.map((topic, index) => <article key={topic.title}><div><span>{String(index + 1).padStart(2, "0")}</span><small>{topic.intent} intent</small></div><div><h2>{topic.title}</h2><p>{topic.summary}</p><aside><strong>Hajime boundary</strong> Use this guide to identify decisions, evidence, owners, and next steps. Licensed professionals own case-specific legal, tax, immigration, and regulated conclusions.</aside></div></article>)}</div><div className="page-cta"><h2>Turn the guidance into a sequenced plan.</h2><Link className="button button-primary" href="/launch-roadmap">Build your roadmap</Link></div></div>;
}
