import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Founder and Purpose", description: "Meet Hajime's founder and understand why the Japan launch system exists.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <div className="marketing-container marketing-page">
      <PageIntro eyebrow="Founder and purpose" title="Built for the space between a decision and a functioning business.">Japan has capable specialists. The harder problem is knowing what comes next, who owns it, and how one decision affects every other workstream.</PageIntro>

      <section className="founder-section" aria-labelledby="founder-name">
        <div className="founder-identity">
          <div className="founder-mark" aria-hidden="true">PD</div>
          <span className="marketing-eyebrow">Founder</span>
          <h2 id="founder-name">Paul Driggers</h2>
          <p>Founder and current operator of Hajime Japan</p>
          <dl>
            <div><dt>Based</dt><dd>United States</dd></div>
            <div><dt>Business status</dt><dd>Hajime Japan is operated directly by Paul Driggers; the contracting party is stated before payment</dd></div>
            <div><dt>Current stage</dt><dd>First commercial launch</dd></div>
          </dl>
        </div>
        <div className="founder-story">
          <span className="marketing-eyebrow">Why I built Hajime</span>
          <h2>A founder should not have to become the integration layer.</h2>
          <p>I built Hajime after mapping what actually happens between deciding to enter Japan and becoming operational. The difficult part is rarely one filing. It is keeping structure, residence, office, capital, registration, tax, banking, hiring, and professional work aligned while the people responsible for each part remain separate.</p>
          <p>My work on Hajime has focused on operational research, service design, source review, launch sequencing, responsibility mapping, and the systems needed to keep a multi-provider project legible. I am not a Japanese attorney, tax professional, judicial scrivener, administrative scrivener, or immigration professional.</p>
          <p>Hajime exists to give the launch one accountable operating rhythm without pretending to replace licensed judgment. I remain personally responsible for discovery, scope, coordination quality, communication, and escalation on every engagement accepted at this stage.</p>
          <aside><strong>Honest stage</strong><p>Hajime is founder-led and accepting a limited number of engagements while its delivery record is established. It does not claim a large team, established customer scale, guaranteed outcomes, or a public network of endorsed firms. The contracting party, scope, payment terms, and responsibilities are identified in writing before payment.</p></aside>
        </div>
      </section>

      <section className="editorial-grid"><div><span className="marketing-eyebrow">Hajime&apos;s role</span><h2>Make the whole journey legible.</h2></div><div className="editorial-copy"><p>Hajime turns a complex, multi-provider process into one sequenced plan and keeps the handoffs moving.</p><p>Licensed providers own regulated legal, tax, accounting, immigration, and filing work. Banks and government agencies make independent decisions. Hajime owns visibility, coordination, and the operating rhythm around that work.</p></div></section>
      <section className="principle-grid"><article><span>Clarity</span><h3>No hidden sequence</h3><p>You should always know the current step, the next step, who is responsible, and the expected timeframe.</p></article><article><span>Independence</span><h3>The outcome comes first</h3><p>Provider recommendations begin with the needs of the launch, not advertising or referral revenue.</p></article><article><span>Restraint</span><h3>Only the work that matters</h3><p>Hajime adds coordination where it reduces risk or workload and leaves regulated judgment with the right professional.</p></article></section>
      <div className="page-cta"><h2>Start with your actual launch facts.</h2><Link className="button button-primary button-large" href="/launch-roadmap">Build my roadmap</Link></div>
    </div>
  );
}
