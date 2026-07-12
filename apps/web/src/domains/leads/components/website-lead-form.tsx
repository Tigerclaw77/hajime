"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitWebsiteLeadAction } from "@/domains/leads/actions/website-lead.actions";
import { TARGET_TIMELINES, websiteLeadSchema, type WebsiteLeadInput } from "@/domains/leads/schemas/website-lead.schema";

export function WebsiteLeadForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<WebsiteLeadInput>({
    resolver: zodResolver(websiteLeadSchema),
    defaultValues: { name: "", email: "", country: "", currentBusiness: "", targetTimeline: undefined, currentSituation: "", companyWebsite: "" },
  });

  function onSubmit(input: WebsiteLeadInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      const result = await submitWebsiteLeadAction(input);
      if (result.ok) {
        router.push("/book-consultation/confirmed");
        return;
      }
      setFormMessage(result.message);
      Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => setError(field as keyof WebsiteLeadInput, { message: messages[0] }));
    });
  }

  return (
    <form className="consultation-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="consultation-fields">
        <label className="field"><span>Name</span><input autoComplete="name" {...register("name")} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name.message}</small>}</label>
        <label className="field"><span>Email</span><input type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email.message}</small>}</label>
        <label className="field"><span>Country</span><input autoComplete="country-name" placeholder="United States" {...register("country")} aria-invalid={Boolean(errors.country)} />{errors.country && <small>{errors.country.message}</small>}</label>
        <label className="field"><span>Current business</span><input placeholder="What do you operate today?" {...register("currentBusiness")} aria-invalid={Boolean(errors.currentBusiness)} />{errors.currentBusiness && <small>{errors.currentBusiness.message}</small>}</label>
        <label className="field field-wide"><span>Target timeline</span><select defaultValue="" {...register("targetTimeline")} aria-invalid={Boolean(errors.targetTimeline)}><option value="" disabled>Select a timeframe</option>{TARGET_TIMELINES.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}</select>{errors.targetTimeline && <small>{errors.targetTimeline.message}</small>}</label>
        <label className="field field-wide"><span>Current situation</span><textarea rows={6} placeholder="What are you planning, and where are you currently stuck?" {...register("currentSituation")} aria-invalid={Boolean(errors.currentSituation)} />{errors.currentSituation && <small>{errors.currentSituation.message}</small>}</label>
        <label className="form-honeypot" aria-hidden="true"><span>Company website</span><input tabIndex={-1} autoComplete="off" {...register("companyWebsite")} /></label>
      </div>
      {formMessage && <p className="form-error" role="alert">{formMessage}</p>}
      <div className="consultation-submit"><button className="button button-primary button-large" disabled={pending}>{pending ? "Sending..." : "Request discovery call"}</button><p>By submitting, you acknowledge our <Link href="/privacy">Privacy notice</Link>. Do not include sensitive personal or financial documents.</p></div>
    </form>
  );
}
