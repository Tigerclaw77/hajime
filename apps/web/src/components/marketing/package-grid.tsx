import Link from "next/link";
import { PACKAGES } from "@/shared/marketing/site-content";

export function PackageGrid({ limit }: { limit?: number }) {
  return (
    <div className="package-grid">
      {PACKAGES.slice(0, limit).map((item) => (
        <article className={item.featured ? "package-card package-featured" : "package-card"} key={item.name}>
          <header className="package-card-head">
            <span className="marketing-eyebrow">{item.note}</span>
            <div><h2>{item.name}</h2><div className="package-price">{item.price}</div></div>
            <p>{item.summary}</p>
          </header>

          <div className="package-fit">
            <div><strong>Best for</strong><p>{item.forWhom}</p></div>
            <div><strong>Buy it when</strong><p>{item.buyWhen}</p></div>
            <div className="package-not-for"><strong>Do not buy it when</strong><p>{item.notFor}</p></div>
          </div>

          <div className="package-contract">
            <section><h3>Engagement boundary</h3><ul>{item.scope.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
            <section><h3>You receive</h3><ul>{item.deliverables.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
            <section><h3>Not included</h3><ul className="package-exclusions">{item.exclusions.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
          </div>

          <dl className="package-standards">
            <div><dt>Maximum response time</dt><dd>{item.responseTime}</dd></div>
            <div><dt>Meeting limit</dt><dd>{item.meetings}</dd></div>
            <div><dt>Communication limit</dt><dd>{item.communication}</dd></div>
            <div><dt>Your responsibilities</dt><dd>{item.customerResponsibilities}</dd></div>
            <div><dt>Completion</dt><dd>{item.completion}</dd></div>
            <div><dt>Professional responsibility</dt><dd>{item.professionalResponsibilities}</dd></div>
          </dl>

          <Link className="button button-primary" href="/book-consultation">Request a package review</Link>
        </article>
      ))}
    </div>
  );
}
