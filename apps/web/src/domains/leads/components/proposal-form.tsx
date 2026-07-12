"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { saveProposalAction } from "@/domains/leads/actions/lead.actions";
import { PROPOSAL_OUTCOMES, PROPOSAL_OUTCOME_LABELS, type Lead } from "@/domains/leads/model/lead";
import { PROJECT_PACKAGES, PROJECT_PACKAGE_LABELS } from "@/domains/projects/model/project";
import { proposalFormSchema, type ProposalFormInput } from "@/domains/leads/schemas/lead.schema";
import { minorToMoneyInput } from "@/shared/format/money";

export function ProposalForm({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ProposalFormInput>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      expirationDate: lead.proposal_expiration_date ?? "",
      expectedValue: minorToMoneyInput(lead.proposal_expected_value_minor),
      outcome: lead.proposal_outcome,
      packageProposed: lead.proposal_package ?? "",
      sentDate: lead.proposal_sent_date ?? "",
    },
  });

  function onSubmit(input: ProposalFormInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      const result = await saveProposalAction(lead.id, input);
      if (!result.ok) {
        setFormMessage(result.message);
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) =>
          setError(field as keyof ProposalFormInput, { message: messages[0] }),
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
        <div><h2>Proposal</h2><p>The commercial offer currently in front of the founder.</p></div>
        <div className="form-fields two-column">
          <label className="field"><span>Sent date</span><input type="date" {...register("sentDate")} />{errors.sentDate ? <small>{errors.sentDate.message}</small> : null}</label>
          <label className="field"><span>Expiration</span><input type="date" {...register("expirationDate")} />{errors.expirationDate ? <small>{errors.expirationDate.message}</small> : null}</label>
          <label className="field"><span>Package proposed</span><select {...register("packageProposed")}><option value="">Not proposed</option>{PROJECT_PACKAGES.map((value) => <option key={value} value={value}>{PROJECT_PACKAGE_LABELS[value]}</option>)}</select></label>
          <label className="field"><span>Expected value (USD)</span><input inputMode="decimal" placeholder="9500.00" {...register("expectedValue")} />{errors.expectedValue ? <small>{errors.expectedValue.message}</small> : null}</label>
          <label className="field"><span>Outcome</span><select {...register("outcome")}>{PROPOSAL_OUTCOMES.map((value) => <option key={value} value={value}>{PROPOSAL_OUTCOME_LABELS[value]}</option>)}</select></label>
        </div>
      </div>
      {formMessage ? <p className="form-error" role="alert">{formMessage}</p> : null}
      <div className="form-actions"><Link className="button button-secondary" href={`/leads/${lead.id}`}>Cancel</Link><button className="button button-primary" disabled={pending}>{pending ? "Saving…" : "Save proposal"}</button></div>
    </form>
  );
}
