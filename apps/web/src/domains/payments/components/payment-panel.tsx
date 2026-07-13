"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { Lead } from "@/domains/leads/model/lead";
import { createStripePaymentAction } from "@/domains/payments/actions/payment.actions";
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  PAYMENT_STATUS_LABELS,
  type LeadPayment,
} from "@/domains/payments/model/payment";
import {
  createPaymentSchema,
  type CreatePaymentInput,
} from "@/domains/payments/schemas/payment.schema";
import { PROJECT_PACKAGE_LABELS } from "@/domains/projects/model/project";
import { formatDateTime } from "@/shared/format/date";
import { formatUsdMinor, minorToMoneyInput } from "@/shared/format/money";

function PaymentSummary({ payment }: { payment: LeadPayment }) {
  return (
    <div className="payment-summary">
      <div>
        <span>{PAYMENT_METHOD_LABELS[payment.method]}</span>
        <strong>{formatUsdMinor(payment.amount_minor)}</strong>
      </div>
      <div>
        <span>Status</span>
        <strong>{PAYMENT_STATUS_LABELS[payment.status]}</strong>
      </div>
      <div>
        <span>{payment.paid_at ? "Paid" : "Created"}</span>
        <strong>{formatDateTime(payment.paid_at ?? payment.created_at)}</strong>
      </div>
      {payment.payment_url ? (
        <a
          className="button button-secondary"
          href={payment.payment_url}
          rel="noreferrer"
          target="_blank"
        >
          Open in Stripe <ExternalLink aria-hidden="true" size={14} />
        </a>
      ) : null}
    </div>
  );
}

export function PaymentPanel({
  lead,
  payments,
}: {
  lead: Lead;
  payments: LeadPayment[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>();
  const activePayment = payments.find(
    (payment) => payment.status === "creating" || payment.status === "open",
  );
  const latestPayment = payments[0];
  const defaultDescription = activePayment?.description
    ?? (lead.proposal_package
      ? `${PROJECT_PACKAGE_LABELS[lead.proposal_package]} - ${lead.name}`
      : `Hajime Japan launch - ${lead.name}`);
  const { control, register, handleSubmit, setError, formState: { errors } } =
    useForm<CreatePaymentInput>({
      resolver: zodResolver(createPaymentSchema),
      defaultValues: {
        amount: minorToMoneyInput(
          activePayment?.amount_minor ?? lead.proposal_expected_value_minor,
        ),
        description: defaultDescription,
        dueDays: String(activePayment?.invoice_due_days ?? 14),
        method: activePayment?.method ?? "invoice",
      },
    });
  const method = useWatch({ control, name: "method" });
  const canCreate = Boolean(
    lead.proposal_package
    && lead.proposal_expected_value_minor
    && !["lost", "archived", "paid"].includes(lead.status)
    && activePayment?.status !== "open",
  );

  function onSubmit(input: CreatePaymentInput) {
    setMessage(undefined);
    startTransition(async () => {
      const result = await createStripePaymentAction(lead.id, input);
      if (!result.ok) {
        setMessage(result.message);
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) =>
          setError(field as keyof CreatePaymentInput, { message: messages[0] }),
        );
        return;
      }

      setMessage("Stripe payment request created.");
      router.refresh();
    });
  }

  return (
    <section className="payment-panel">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Payment</div>
          <h2>{latestPayment ? PAYMENT_STATUS_LABELS[latestPayment.status] : "Not requested"}</h2>
        </div>
      </div>

      {latestPayment && latestPayment.status !== "creating" ? (
        <PaymentSummary payment={latestPayment} />
      ) : null}

      {!lead.proposal_package || !lead.proposal_expected_value_minor ? (
        <div className="payment-empty">
          <p>Add a proposed package and expected value before requesting payment.</p>
          <Link className="text-link" href={`/leads/${lead.id}/proposal`}>Edit proposal</Link>
        </div>
      ) : null}

      {canCreate ? (
        <form className="payment-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {activePayment?.status === "creating" ? (
            <p className="payment-resume">Setup stopped before Stripe returned a link. Retry to resume this same request.</p>
          ) : null}
          <div className="payment-fields">
            <label className="field">
              <span>Payment method</span>
              <select {...register("method")}>
                {PAYMENT_METHODS.map((value) => (
                  <option key={value} value={value}>{PAYMENT_METHOD_LABELS[value]}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Amount (USD)</span>
              <input inputMode="decimal" {...register("amount")} />
              {errors.amount ? <small>{errors.amount.message}</small> : null}
            </label>
            {method === "invoice" ? (
              <label className="field">
                <span>Due in days</span>
                <input inputMode="numeric" {...register("dueDays")} />
                {errors.dueDays ? <small>{errors.dueDays.message}</small> : null}
              </label>
            ) : null}
            <label className="field payment-description">
              <span>Description</span>
              <input {...register("description")} />
              {errors.description ? <small>{errors.description.message}</small> : null}
            </label>
          </div>
          {message ? <p className="form-error" role="alert">{message}</p> : null}
          <div className="payment-actions">
            <p>Creating this request confirms the founder approved the engagement.</p>
            <button className="button button-primary" disabled={pending}>
              {pending ? "Creating..." : activePayment ? "Retry Stripe setup" : "Create payment request"}
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
