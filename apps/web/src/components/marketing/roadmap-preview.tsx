"use client";

import { Building2, Check, CircleDollarSign, FileCheck2, Landmark } from "lucide-react";
import { useState } from "react";

const stages = [
  { name: "Plan", icon: FileCheck2, owner: "You + Hajime", checkpoint: "Confirm the formation route", time: "Week 1" },
  { name: "Form", icon: Building2, owner: "Hajime + professionals", checkpoint: "Approve formation documents", time: "Weeks 2-4" },
  { name: "Register", icon: Check, owner: "Licensed professional", checkpoint: "Submit the registry filing", time: "Weeks 5-7" },
  { name: "Bank", icon: Landmark, owner: "You + bank", checkpoint: "Complete the KYC evidence pack", time: "Weeks 7-12" },
  { name: "Operate", icon: CircleDollarSign, owner: "You + providers", checkpoint: "Begin operating with clear ownership", time: "Weeks 10-16" },
] as const;

export function RoadmapPreview() {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = stages[activeIndex] ?? stages[0];
  const progress = ((activeIndex + 1) / stages.length) * 100;

  return (
    <div className="roadmap-preview-product">
      <div className="roadmap-preview-topline">
        <div><span>Japan launch</span><strong>Building momentum</strong></div>
        <span className="roadmap-health"><i /> On track</span>
      </div>
      <div className="roadmap-progress-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="roadmap-stage-controls" role="tablist" aria-label="Explore launch stages">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return <button key={stage.name} role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)} className={activeIndex === index ? "active" : index < activeIndex ? "complete" : ""}><span><Icon size={16} strokeWidth={1.8} /></span><strong>{stage.name}</strong><small>{stage.time}</small></button>;
        })}
      </div>
      <div className="roadmap-active-detail" role="tabpanel">
        <div><span>Current checkpoint</span><h3>{active.checkpoint}</h3></div>
        <dl><div><dt>Responsible</dt><dd>{active.owner}</dd></div><div><dt>Timing</dt><dd>{active.time}</dd></div><div><dt>Overall progress</dt><dd>{Math.round(progress)}%</dd></div></dl>
      </div>
    </div>
  );
}
