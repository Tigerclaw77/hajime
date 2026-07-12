"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateLeadStatusAction } from "@/domains/leads/actions/lead.actions";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type Lead } from "@/domains/leads/model/lead";

export function LeadStatusControl({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState<Lead["status"]>(lead.status);
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();
  const statuses = lead.project_id ? (["won", "archived"] as const) : LEAD_STATUSES;

  function submit() {
    setMessage(undefined);
    startTransition(async () => {
      const result = await updateLeadStatusAction(lead.id, status);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="status-control">
      <label className="field">
        <span>Status</span>
        <select value={status} onChange={(event) => setStatus(event.target.value as Lead["status"])}>
          {statuses.map((value) => <option key={value} value={value}>{LEAD_STATUS_LABELS[value]}</option>)}
        </select>
      </label>
      <button className="button button-primary" disabled={pending || status === lead.status} onClick={submit}>{pending ? "Updating…" : "Update status"}</button>
      {message ? <p className="form-error" role="alert">{message}</p> : null}
    </div>
  );
}
