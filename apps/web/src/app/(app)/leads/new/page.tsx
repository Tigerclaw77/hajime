import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/domains/leads/components/lead-form";

export const metadata: Metadata = { title: "New lead" };

export default function NewLeadPage() {
  return (
    <div className="page-shell page-shell-narrow">
      <Link className="back-link" href="/leads">Leads</Link>
      <header className="page-header compact"><div><div className="eyebrow">Customer acquisition</div><h1>Create a lead</h1><p>Begin with the facts needed for one good founder conversation.</p></div></header>
      <LeadForm mode="create" />
    </div>
  );
}
