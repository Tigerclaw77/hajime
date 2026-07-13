"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { subscribeToUpdatesAction } from "@/domains/subscribers/actions/subscriber.actions";
import { subscriberSchema, UPDATE_INTERESTS, type SubscriberInput } from "@/domains/subscribers/schemas/subscriber.schema";

export function EmailUpdatesForm({ compact = false }: { compact?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [complete, setComplete] = useState(false);
  const [formMessage, setFormMessage] = useState<string>();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SubscriberInput>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: { email: "", interests: ["Formation updates", "Policy changes"], companyWebsite: "" },
  });

  function onSubmit(input: SubscriberInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      const result = await subscribeToUpdatesAction(input);
      if (result.ok) { setComplete(true); return; }
      setFormMessage(result.message);
      Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => setError(field as keyof SubscriberInput, { message: messages[0] }));
    });
  }

  if (complete) return <div className="subscription-confirmation" role="status"><strong>Preferences saved.</strong><p>We will send concise formation updates and no general marketing mail.</p></div>;

  return (
    <form className={compact ? "updates-form updates-form-compact" : "updates-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="updates-form-primary">
        <label className="field"><span>Email address</span><input type="email" autoComplete="email" placeholder="you@company.com" {...register("email")} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email.message}</small>}</label>
        <button className="button button-primary" disabled={pending}>{pending ? "Saving..." : "Get updates"}</button>
      </div>
      {!compact ? <fieldset><legend>Send me</legend><div className="updates-interest-grid">{UPDATE_INTERESTS.map((interest) => <label key={interest}><input type="checkbox" value={interest} {...register("interests")} /><span>{interest}</span></label>)}</div>{errors.interests && <small>{errors.interests.message}</small>}</fieldset> : null}
      <label className="form-honeypot" aria-hidden="true"><span>Company website</span><input tabIndex={-1} autoComplete="off" {...register("companyWebsite")} /></label>
      {formMessage && <p className="form-error" role="alert">{formMessage}</p>}
      <p className="updates-privacy">Operational updates only. Unsubscribe at any time. See our <Link href="/privacy">privacy commitments</Link>.</p>
    </form>
  );
}
