import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { EmailUpdatesForm } from "@/domains/subscribers/components/email-updates-form";

export const metadata: Metadata = { title: "Japan Business Formation Email Updates", description: "Subscribe to concise business formation, policy, deadline, and guidance updates for Japan.", alternates: { canonical: "/email-updates" } };

export default function EmailUpdatesPage() {
  return <div className="marketing-container marketing-page marketing-page-narrow"><PageIntro eyebrow="Email updates" title="Only the changes that affect a launch.">Choose what matters. Hajime sends source-linked operational summaries when guidance, policy, deadlines, or formation assumptions materially change.</PageIntro><TrustStrip compact /><section className="subscription-panel"><div><h2>Concise by design.</h2><p>No daily news digest. No sponsor placements. No selling your attention. Each update states the source, affected audience, next action, and review date.</p></div><EmailUpdatesForm /></section></div>;
}
