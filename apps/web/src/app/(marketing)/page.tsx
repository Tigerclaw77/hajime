import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/marketing/faq-list";
import { Journey } from "@/components/marketing/journey";
import { PackageGrid } from "@/components/marketing/package-grid";

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

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <section className="marketing-hero">
        <div className="marketing-container hero-grid">
          <div className="hero-copy">
            <span className="marketing-eyebrow">Build in Japan, with clarity</span>
            <h1>Business Formation Coordination for Japan.</h1>
            <p>One clear plan across local professionals, documents, and next steps. You stay focused on the business while Hajime keeps the formation moving.</p>
            <div className="hero-actions"><Link className="button button-primary button-large" href="/book-consultation">Book a discovery call</Link><Link className="button button-secondary button-large" href="/how-it-works">See how it works</Link></div>
            <small>30-minute fit call. No sensitive documents required.</small>
          </div>
          <div className="timeline-preview" aria-label="Example project timeline">
            <div className="timeline-preview-head"><div><span>Japan launch</span><strong>Formation in progress</strong></div><span className="status-on-track">On track</span></div>
            <div className="timeline-progress"><span style={{ width: "58%" }} /></div>
            <div className="timeline-date"><span>Current step</span><strong>Company formation</strong><span>Estimated completion</span><strong>October 24</strong></div>
            <ol>
              <li className="timeline-complete"><span>Business plan</span><strong>Complete</strong></li>
              <li className="timeline-complete"><span>Capital plan</span><strong>Complete</strong></li>
              <li className="timeline-active"><span>Company formation</span><strong>Licensed professional</strong></li>
              <li className="timeline-waiting"><span>Signature documents</span><strong>Waiting on you</strong></li>
              <li><span>Bank preparation</span><strong>Upcoming</strong></li>
            </ol>
            <div className="timeline-next"><span>Next action</span><strong>Review the signature packet by Friday</strong></div>
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-section-rule" id="how-it-works"><div className="marketing-container section-split"><div className="section-copy"><span className="marketing-eyebrow">How Hajime works</span><h2>One sequence. One accountable coordinator.</h2><p>Formation crosses legal, tax, office, banking, and operational workstreams. Hajime makes the dependencies visible and keeps the right person moving at the right time.</p><Link className="text-link marketing-text-link" href="/how-it-works">See the full journey</Link></div><Journey compact /></div></section>

      <section className="marketing-section marketing-section-soft"><div className="marketing-container"><div className="section-heading-large"><span className="marketing-eyebrow">Why customers choose Hajime</span><h2>Less uncertainty at every handoff.</h2></div><div className="reason-grid"><article><span>01</span><h3>A plan you can see</h3><p>Current step, next action, owner, and timeframe stay visible from decision through launch.</p></article><article><span>02</span><h3>Independent coordination</h3><p>Hajime keeps the whole outcome in view while each specialist owns their professional work.</p></article><article><span>03</span><h3>Clear boundaries</h3><p>Licensed professionals perform regulated work. Scope, exclusions, and third-party costs are stated before commitment.</p></article></div></div></section>

      <section className="marketing-section"><div className="marketing-container"><div className="section-heading-large section-heading-row"><div><span className="marketing-eyebrow">Package overview</span><h2>Choose how much coordination you need.</h2></div><Link className="text-link marketing-text-link" href="/pricing">Compare all packages</Link></div><PackageGrid limit={3} /><p className="pricing-disclaimer">Package fees cover Hajime coordination. Government, licensed professional, translation, office, banking, and other third-party costs are separate.</p></div></section>

      <section className="marketing-section marketing-section-rule"><div className="marketing-container faq-layout"><div className="section-copy"><span className="marketing-eyebrow">Frequently asked</span><h2>Know the boundaries before the call.</h2><p>Clear expectations are part of the service.</p><Link className="text-link marketing-text-link" href="/faq">View all questions</Link></div><FaqList limit={5} /></div></section>

      <section className="final-cta"><div className="marketing-container"><span className="marketing-eyebrow">Your next step</span><h2>Bring the questions. Leave with a clearer path.</h2><p>Tell us where you are, what you plan to build, and when you want to begin.</p><Link className="button button-primary button-large" href="/book-consultation">Book a discovery call</Link></div></section>
    </>
  );
}
