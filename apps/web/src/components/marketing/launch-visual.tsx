import { Building2, Check, CircleDollarSign, Landmark, Route } from "lucide-react";

const checkpoints = [
  { label: "Plan", detail: "You are here", icon: Route, state: "current" },
  { label: "Form", detail: "Next", icon: Building2, state: "next" },
  { label: "Register", detail: "Milestone", icon: Check, state: "upcoming" },
  { label: "Bank", detail: "Milestone", icon: Landmark, state: "upcoming" },
  { label: "Operate", detail: "Destination", icon: CircleDollarSign, state: "destination" },
] as const;

export function LaunchVisual() {
  return (
    <div className="launch-visual" aria-label="Launch route from planning to operating a company in Japan">
      <header className="launch-route-header">
        <div><span>Your launch route</span><strong>Japan company</strong></div>
        <span className="launch-route-ready"><i /> Ready to begin</span>
      </header>

      <div className="launch-route-map">
        <div className="launch-route-line" aria-hidden="true"><span /><i /></div>
        <ol>
          {checkpoints.map(({ label, detail, icon: Icon, state }, index) => (
            <li className={`launch-route-node launch-route-${state}`} key={label}>
              <span className="launch-route-icon"><Icon size={17} strokeWidth={1.9} /></span>
              <small>0{index + 1}</small>
              <strong>{label}</strong>
              <em>{detail}</em>
            </li>
          ))}
        </ol>
      </div>

      <footer className="launch-route-summary">
        <div><span>Current position</span><strong>Planning</strong></div>
        <div><span>Next step</span><strong>Choose your formation route</strong></div>
        <div><span>Destination</span><strong>Operating in Japan</strong></div>
      </footer>
    </div>
  );
}
