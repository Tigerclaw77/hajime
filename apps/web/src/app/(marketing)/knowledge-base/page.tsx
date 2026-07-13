import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { KNOWLEDGE_CLUSTERS } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Formation Knowledge Base", description: "Practical, source-aware guidance for planning and coordinating a business launch in Japan.", alternates: { canonical: "/knowledge-base" } };

export default function KnowledgeBasePage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Knowledge base" title="Understand the launch before the handoffs begin.">Operational guidance organized around the decisions founders actually face. Each section distinguishes orientation, coordination, and questions owned by licensed professionals.</PageIntro><TrustStrip /><div className="knowledge-grid">{KNOWLEDGE_CLUSTERS.map((cluster, index) => <Link href={`/knowledge-base/${cluster.slug}`} key={cluster.slug} className="knowledge-card"><span>{String(index + 1).padStart(2, "0")}</span><h2>{cluster.name}</h2><p>{cluster.description}</p><small>{cluster.topics.length} essential guides</small></Link>)}</div></div>;
}
