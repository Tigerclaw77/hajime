import type { Metadata } from "next";
import { FormationUpdateFeed } from "@/components/marketing/formation-update-feed";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";

export const metadata: Metadata = { title: "Business Formation Updates", description: "Current operational changes affecting founders establishing a business in Japan, linked to official sources.", alternates: { canonical: "/updates" } };

export default function UpdatesPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Business formation updates" title="What changed, who is affected, and what to do next.">A concise operational feed based on official sources. Material changes are checked manually each week; regulated interpretation stays with the appropriate professional.</PageIntro><TrustStrip /><section className="authority-section"><div className="authority-section-head"><div><span className="marketing-eyebrow">Current feed</span><h2>Latest reviewed changes</h2></div><p>Each published item receives a human source check before its status or founder impact is updated.</p></div><FormationUpdateFeed /></section></div>;
}
