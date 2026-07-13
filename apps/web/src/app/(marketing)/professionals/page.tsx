import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { PROFESSIONAL_ROLES } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Formation Professional Directory", description: "Understand which licensed and operational professionals a Japan business launch may require and how Hajime verifies introductions.", alternates: { canonical: "/professionals" } };

export default function ProfessionalsPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Professional responsibilities" title="The right professional, at the right moment.">Hajime coordinates the sequence; licensed professionals own regulated decisions and work. No provider can buy placement or access to a customer.</PageIntro><TrustStrip /><aside className="directory-notice"><strong>How introductions work today</strong><p>Introductions are engagement-specific and reviewed manually. Before an introduction, Hajime records the provider&apos;s identity, current registration where applicable, scope, language capability, availability, conflicts, fees, and fit. The customer decides whether to engage the provider directly.</p></aside><div className="professional-list">{PROFESSIONAL_ROLES.map((role) => <article key={role.name}><header><span>Responsibility standard</span><h2>{role.name}</h2></header><dl><div><dt>Capabilities</dt><dd>{role.capabilities}</dd></div><div><dt>Languages</dt><dd>{role.languages}</dd></div><div><dt>Regions</dt><dd>{role.regions}</dd></div><div><dt>Verification before introduction</dt><dd>{role.license}</dd></div><div><dt>When typically needed</dt><dd>{role.timing}</dd></div></dl></article>)}</div></div>;
}
