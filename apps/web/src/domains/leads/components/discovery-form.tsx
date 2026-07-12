"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { saveDiscoveryAction } from "@/domains/leads/actions/lead.actions";
import type { Lead } from "@/domains/leads/model/lead";
import { discoveryFormSchema, type DiscoveryFormInput } from "@/domains/leads/schemas/lead.schema";
import { minorToMoneyInput } from "@/shared/format/money";

export function DiscoveryForm({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<DiscoveryFormInput>({
    resolver: zodResolver(discoveryFormSchema),
    defaultValues: {
      budgetEstimate: minorToMoneyInput(lead.discovery_budget_estimate_minor),
      desiredTimeline: lead.discovery_desired_timeline,
      keyConcerns: lead.discovery_key_concerns,
      meetingDate: lead.discovery_meeting_date ?? "",
      nextAction: lead.discovery_next_action,
      summary: lead.discovery_summary,
    },
  });

  function onSubmit(input: DiscoveryFormInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      const result = await saveDiscoveryAction(lead.id, input);
      if (!result.ok) {
        setFormMessage(result.message);
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) =>
          setError(field as keyof DiscoveryFormInput, { message: messages[0] }),
        );
        return;
      }
      router.push(`/leads/${lead.id}`);
      router.refresh();
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-section">
        <div><h2>Meeting</h2><p>Schedule the conversation and preserve what matters.</p></div>
        <div className="form-fields two-column">
          <label className="field"><span>Meeting date</span><input type="date" {...register("meetingDate")} />{errors.meetingDate ? <small>{errors.meetingDate.message}</small> : null}</label>
          <label className="field"><span>Budget estimate (USD)</span><input inputMode="decimal" placeholder="9500.00" {...register("budgetEstimate")} />{errors.budgetEstimate ? <small>{errors.budgetEstimate.message}</small> : null}</label>
          <label className="field"><span>Desired timeline</span><input placeholder="Launch by Q4" {...register("desiredTimeline")} /></label>
          <label className="field"><span>Next action</span><input placeholder="Send package recommendation" {...register("nextAction")} /></label>
        </div>
      </div>
      <div className="form-section">
        <div><h2>Discovery record</h2><p>A concise account of fit, concerns, and intended outcome.</p></div>
        <div className="form-fields">
          <label className="field"><span>Summary</span><textarea rows={7} {...register("summary")} /></label>
          <label className="field"><span>Key concerns</span><textarea rows={5} {...register("keyConcerns")} /></label>
        </div>
      </div>
      {formMessage ? <p className="form-error" role="alert">{formMessage}</p> : null}
      <div className="form-actions"><Link className="button button-secondary" href={`/leads/${lead.id}`}>Cancel</Link><button className="button button-primary" disabled={pending}>{pending ? "Saving…" : "Save discovery"}</button></div>
    </form>
  );
}
