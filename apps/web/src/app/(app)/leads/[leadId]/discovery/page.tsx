import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DiscoveryForm } from "@/domains/leads/components/discovery-form";
import { getLead } from "@/domains/leads/data/leads.repository";

type DiscoveryPageProps = { params: Promise<{ leadId: string }> };
export const metadata: Metadata = { title: "Lead discovery" };

export default async function DiscoveryPage({ params }: DiscoveryPageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();
  if (lead.status === "archived") redirect(`/leads/${lead.id}`);
  return <div className="page-shell page-shell-narrow"><Link className="back-link" href={`/leads/${lead.id}`}>{lead.name}</Link><header className="page-header compact"><div><div className="eyebrow">Discovery</div><h1>Founder conversation</h1><p>Record fit, concerns, timing, and one clear next action.</p></div></header><DiscoveryForm lead={lead} /></div>;
}
