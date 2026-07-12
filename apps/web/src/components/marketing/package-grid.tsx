import Link from "next/link";
import { PACKAGES } from "@/shared/marketing/site-content";

export function PackageGrid({ limit }: { limit?: number }) {
  return (
    <div className="package-grid">
      {PACKAGES.slice(0, limit).map((item) => (
        <article className={item.featured ? "package-card package-featured" : "package-card"} key={item.name}>
          <div><span className="marketing-eyebrow">{item.note}</span><h3>{item.name}</h3><div className="package-price">{item.price}</div><p>{item.description}</p></div>
          <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <Link className="button button-secondary" href={`/book-consultation?package=${item.name.toLowerCase().replaceAll(" ", "-")}`}>Request proposal</Link>
        </article>
      ))}
    </div>
  );
}
