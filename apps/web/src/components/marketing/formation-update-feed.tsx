import Link from "next/link";
import { FORMATION_UPDATES } from "@/shared/marketing/authority-content";

export function FormationUpdateFeed({ limit }: { limit?: number }) {
  const updates = typeof limit === "number" ? FORMATION_UPDATES.slice(0, limit) : FORMATION_UPDATES;

  return (
    <div className="update-feed">
      {updates.map((update) => (
        <article className="update-row" key={update.slug}>
          <div className="update-meta">
            <span className={`update-status update-status-${update.status.toLowerCase()}`}>{update.status}</span>
            <time>{update.effectiveDate}</time>
          </div>
          <div className="update-copy">
            <h3><Link href={`/updates/${update.slug}`}>{update.title}</Link></h3>
            <p>{update.summary}</p>
            <span>Affects: {update.affected}</span>
          </div>
          <Link className="update-arrow" href={`/updates/${update.slug}`} aria-label={`Read ${update.title}`}>View</Link>
        </article>
      ))}
    </div>
  );
}
