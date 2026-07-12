"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLeadAction, updateLeadAction } from "@/domains/leads/actions/lead.actions";
import {
  LEAD_SOURCES,
  LEAD_SOURCE_LABELS,
  type Lead,
} from "@/domains/leads/model/lead";
import { leadFormSchema, type LeadFormInput } from "@/domains/leads/schemas/lead.schema";

type LeadFormProps =
  | { mode: "create"; lead?: never }
  | { mode: "edit"; lead: Lead };

export function LeadForm({ mode, lead }: LeadFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: lead
      ? {
          businessType: lead.business_type,
          coordinatorName: lead.coordinator_name ?? "",
          country: lead.country,
          email: lead.email,
          name: lead.name,
          notes: lead.notes,
          source: lead.source,
        }
      : {
          businessType: "",
          coordinatorName: "",
          country: "",
          email: "",
          name: "",
          notes: "",
          source: "referral",
        },
  });

  function applyFailure(result: {
    message: string;
    fieldErrors?: Record<string, string[]>;
  }) {
    setFormMessage(result.message);
    Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
      setError(field as keyof LeadFormInput, { message: messages[0] });
    });
  }

  function onSubmit(input: LeadFormInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      if (mode === "create") {
        const result = await createLeadAction(input);
        if (!result.ok) return applyFailure(result);
        router.push(`/leads/${result.data.leadId}`);
        router.refresh();
        return;
      }

      const result = await updateLeadAction(lead.id, input);
      if (!result.ok) return applyFailure(result);
      router.push(`/leads/${lead.id}`);
      router.refresh();
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-section">
        <div>
          <h2>Lead identity</h2>
          <p>The essential context needed for a thoughtful founder conversation.</p>
        </div>
        <div className="form-fields two-column">
          <label className="field">
            <span>Name</span>
            <input autoFocus {...register("name")} aria-invalid={Boolean(errors.name)} />
            {errors.name ? <small>{errors.name.message}</small> : null}
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
            {errors.email ? <small>{errors.email.message}</small> : null}
          </label>
          <label className="field">
            <span>Country</span>
            <input placeholder="United States" {...register("country")} />
            {errors.country ? <small>{errors.country.message}</small> : null}
          </label>
          <label className="field">
            <span>Business type</span>
            <input placeholder="Technology services" {...register("businessType")} />
            {errors.businessType ? <small>{errors.businessType.message}</small> : null}
          </label>
          <label className="field">
            <span>Source</span>
            <select {...register("source")}>
              {LEAD_SOURCES.map((source) => (
                <option key={source} value={source}>{LEAD_SOURCE_LABELS[source]}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Assigned coordinator</span>
            <input placeholder="Unassigned" {...register("coordinatorName")} />
            {errors.coordinatorName ? <small>{errors.coordinatorName.message}</small> : null}
          </label>
        </div>
      </div>

      <div className="form-section">
        <div>
          <h2>Notes</h2>
          <p>Useful founder context, not a substitute for discovery.</p>
        </div>
        <label className="field">
          <span>Notes</span>
          <textarea rows={7} {...register("notes")} />
          {errors.notes ? <small>{errors.notes.message}</small> : null}
        </label>
      </div>

      {formMessage ? <p className="form-error" role="alert">{formMessage}</p> : null}
      <div className="form-actions">
        <Link className="button button-secondary" href={lead ? `/leads/${lead.id}` : "/leads"}>Cancel</Link>
        <button className="button button-primary" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create lead" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
