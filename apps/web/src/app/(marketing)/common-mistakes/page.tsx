import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { COMMON_MISTAKES } from "@/shared/marketing/authority-content";

export const metadata: Metadata = { title: "Japan Business Formation Mistakes", description: "Avoid common sequencing and coordination mistakes when establishing a business in Japan.", alternates: { canonical: "/common-mistakes" } };

export default function CommonMistakesPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Common mistakes library" title="Most delays begin before anyone files.">The expensive errors are often valid actions taken in the wrong order, with the wrong owner, or against an assumption another workstream cannot support.</PageIntro><TrustStrip /><div className="mistake-list">{COMMON_MISTAKES.map((mistake, index) => <article key={mistake.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{mistake.title}</h2><dl><div><dt>What goes wrong</dt><dd>{mistake.consequence}</dd></div><div><dt>Prevent it</dt><dd>{mistake.prevention}</dd></div></dl></div></article>)}</div><div className="page-cta"><h2>Find the blockers in your plan.</h2><Link className="button button-primary" href="/launch-roadmap">Build your roadmap</Link></div></div>;
}
