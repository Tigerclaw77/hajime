import { JOURNEY_STEPS } from "@/shared/marketing/site-content";

export function Journey({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "journey journey-compact" : "journey"}>
      {JOURNEY_STEPS.map((step, index) => (
        <li key={step.name}>
          <div className="journey-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
          <div className="journey-copy"><h3>{step.name}</h3><p>{step.description}</p></div>
          {!compact && <div className="journey-meta"><span>{step.owner}</span><strong>{step.timeframe}</strong></div>}
        </li>
      ))}
    </ol>
  );
}
