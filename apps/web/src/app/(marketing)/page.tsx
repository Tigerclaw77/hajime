import type { Metadata } from "next";
import { ArrowRight, Building2, Check, CircleDollarSign, CircleMinus, Clock3, Compass, FileCheck2, Landmark, Network, Radar, Route, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { HomepageMotion } from "@/components/marketing/homepage-motion";
import { LaunchVisual } from "@/components/marketing/launch-visual";
import { RoadmapPreview } from "@/components/marketing/roadmap-preview";
import { FORMATION_UPDATES, LAST_REVIEWED } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hajime Japan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "Business formation coordination for Japan.",
  areaServed: { "@type": "Country", name: "Japan" },
  makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business formation coordination for Japan" } },
};

const launchStages = [
  { name: "Plan", icon: Compass, className: "stage-blue", bullets: ["Choose the right route", "Set capital and timing", "See every dependency"] },
  { name: "Form", icon: Building2, className: "stage-violet", bullets: ["Align office and structure", "Prepare clean evidence", "Bring in the right experts"] },
  { name: "Register", icon: FileCheck2, className: "stage-emerald", bullets: ["Finalize the filing", "Track official review", "Secure certificates"] },
  { name: "Bank", icon: Landmark, className: "stage-amber", bullets: ["Build the KYC story", "Prepare the evidence pack", "Keep the launch moving"] },
  { name: "Operate", icon: CircleDollarSign, className: "stage-teal", bullets: ["Activate tax and payroll", "Assign recurring owners", "Start building in Japan"] },
] as const;

const withoutHajime = ["Separate advice with no shared sequence", "Deadlines discovered after they matter", "Documents prepared against different assumptions", "No single view of what happens next"];
const withHajime = ["One project across every workstream", "One timeline with dependencies visible", "One accountable owner for every next step", "Momentum from decision through operations"];

export default function HomePage() {
  return (
    <div className="experience-home">
      <HomepageMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <section className="experience-slide experience-hero">
        <div className="experience-grid" aria-hidden="true" />
        <div className="marketing-container experience-hero-inner">
          <div className="experience-hero-copy" data-reveal>
            <span className="experience-kicker"><i /> Japan company launch system</span>
            <h1>Launch Your Business in Japan.</h1>
            <p>Turn the decision into an operating company. One roadmap shows where you are, what moves next, and when you&apos;re ready to operate.</p>
            <Link className="experience-primary-cta" href="/launch-roadmap">Start my roadmap <ArrowRight size={16} strokeWidth={2} /></Link>
            <div className="experience-proof"><span><ShieldCheck size={14} /> Official sources</span><span><Route size={14} /> One launch path</span><span><Clock3 size={14} /> Next step always clear</span></div>
          </div>
          <div className="experience-hero-visual" data-reveal><LaunchVisual /></div>
        </div>
        <div className="slide-index"><span>01</span><i /><span>06</span></div>
      </section>

      <section className="experience-slide sequence-slide">
        <div className="marketing-container">
          <header className="experience-heading" data-reveal><span className="experience-kicker"><i /> The launch sequence</span><h2>Five stages. One direction.</h2><p>Each milestone unlocks the next. See where you are, know what moves next, and keep going.</p></header>
          <div className="launch-sequence" data-reveal>
            {launchStages.map(({ name, icon: Icon, className, bullets }, index) => <div className="launch-stage-wrap" key={name}><article className={`launch-stage ${className}`}><div className="launch-stage-head"><span><Icon size={20} strokeWidth={1.8} /></span><small>0{index + 1}</small></div><h3>{name}</h3><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>{index < launchStages.length - 1 ? <div className="stage-arrow" aria-hidden="true"><ArrowRight size={16} /></div> : null}</div>)}
          </div>
        </div>
        <div className="slide-index"><span>02</span><i /><span>06</span></div>
      </section>

      <section className="experience-slide mission-slide">
        <div className="mission-glow" aria-hidden="true" />
        <div className="marketing-container mission-inner">
          <header className="experience-heading experience-heading-light" data-reveal><span className="experience-kicker"><i /> Mission Control</span><h2>Your launch, live.</h2><p>Material changes surfaced early. Official sources attached. The impact on your project made clear.</p></header>
          <div className="mission-metrics" data-reveal>
            <div><Radar size={18} /><span>New guidance</span><strong>1</strong></div>
            <div><Clock3 size={18} /><span>Upcoming</span><strong>1</strong></div>
            <div><Network size={18} /><span>Monitoring</span><strong>2</strong></div>
            <div><ShieldCheck size={18} /><span>Last verified</span><strong>{LAST_REVIEWED.replace("July ", "Jul ")}</strong></div>
          </div>
          <div className="mission-feed" data-reveal>
            <div className="mission-feed-head"><span>Operational signal</span><span>Effective</span><span>Status</span></div>
            {FORMATION_UPDATES.slice(0, 3).map((update) => <Link href={`/updates/${update.slug}`} key={update.slug}><span className="mission-signal"><i />{update.title}<small>{update.affected}</small></span><time>{update.effectiveDate}</time><strong>{update.status}</strong><ArrowRight size={15} /></Link>)}
          </div>
          <div className="mission-source" data-reveal><ShieldCheck size={15} /><span>Evidence-led monitoring</span><p>Every signal links back to an official source. Regulated interpretation stays with the appropriate professional.</p><Link href="/updates">Open Mission Control <ArrowRight size={14} /></Link></div>
        </div>
        <div className="slide-index slide-index-light"><span>03</span><i /><span>06</span></div>
      </section>

      <section className="experience-slide roadmap-slide">
        <div className="marketing-container roadmap-slide-layout">
          <header className="experience-heading" data-reveal><span className="experience-kicker"><i /> Your roadmap</span><h2>Progress you can feel.</h2><p>Explore the launch stage by stage. The owner, timing, and next checkpoint remain visible as the project advances.</p><Link className="experience-text-link" href="/launch-roadmap">Build your personalized roadmap <ArrowRight size={15} /></Link></header>
          <div data-reveal><RoadmapPreview /></div>
        </div>
        <div className="roadmap-orbit-accent" aria-hidden="true" />
        <div className="slide-index"><span>04</span><i /><span>06</span></div>
      </section>

      <section className="experience-slide comparison-slide">
        <div className="marketing-container">
          <header className="experience-heading comparison-heading" data-reveal><span className="experience-kicker"><i /> One coordinated project</span><h2>Clarity changes the experience.</h2></header>
          <div className="comparison-grid" data-reveal>
            <article className="comparison-without"><header><CircleMinus size={20} /><span>Fragmented launch</span></header><h3>Many workstreams.<br />No shared momentum.</h3><ul>{withoutHajime.map((item) => <li key={item}><CircleMinus size={15} />{item}</li>)}</ul></article>
            <article className="comparison-with"><header><Check size={20} /><span>Hajime launch system</span></header><h3>One project.<br />One clear next step.</h3><ul>{withHajime.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>
          </div>
        </div>
        <div className="slide-index"><span>05</span><i /><span>06</span></div>
      </section>

      <section className="experience-slide experience-final">
        <div className="final-route" aria-hidden="true"><span /><i /><b /></div>
        <div className="marketing-container experience-final-inner" data-reveal><span className="experience-kicker"><i /> Progress starts here</span><h2>You&apos;re closer than you think.</h2><p>Turn the decision to build in Japan into one clear launch plan.</p><div><Link className="experience-primary-cta experience-primary-cta-light" href="/launch-roadmap">Start my roadmap <ArrowRight size={16} /></Link><small>Five questions. Your path becomes clear.</small></div></div>
        <div className="slide-index slide-index-light"><span>06</span><i /><span>06</span></div>
      </section>
    </div>
  );
}
