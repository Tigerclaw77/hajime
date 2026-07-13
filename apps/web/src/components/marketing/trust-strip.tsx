import { LAST_REVIEWED } from "@/shared/marketing/authority-content";

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "trust-strip trust-strip-compact" : "trust-strip"} aria-label="Content standards">
      <span><strong>Official sources</strong> linked at the point of use</span>
      <span><strong>Last reviewed</strong> {LAST_REVIEWED}</span>
      <span><strong>Review cadence</strong> checked manually each week</span>
      <span><strong>Boundary</strong> coordination, not regulated advice</span>
    </div>
  );
}
