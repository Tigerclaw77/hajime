"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  signInAction,
  signUpAction,
} from "@/domains/auth/actions/auth.actions";
import { authSchema, type AuthInput } from "@/domains/auth/schemas/auth.schema";

type AuthFormProps = { mode: "sign-in" | "sign-up" };

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const [confirmationSent, setConfirmationSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const isSignIn = mode === "sign-in";

  function onSubmit(input: AuthInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      const result = isSignIn
        ? await signInAction(input)
        : await signUpAction(input);

      if (!result.ok) {
        setFormMessage(result.message);
        Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
          setError(field as keyof AuthInput, { message: messages[0] });
        });
        return;
      }

      if (!isSignIn && result.data?.requiresEmailConfirmation) {
        setConfirmationSent(true);
        return;
      }

      router.push("/projects");
      router.refresh();
    });
  }

  if (confirmationSent) {
    return (
      <div className="space-y-5" role="status">
        <div className="eyebrow">Check your email</div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Confirm your account.
        </h1>
        <p className="text-sm leading-6 text-muted">
          We sent a secure confirmation link. After confirming, return here to
          sign in.
        </p>
        <Link className="button button-primary w-full" href="/sign-in">
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <div className="eyebrow">Hajime Japan</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          {isSignIn ? "Welcome back." : "Create your workspace."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {isSignIn
            ? "Sign in to manage your business launch projects."
            : "Start with one project. The rest can wait."}
        </p>
      </div>

      <label className="field">
        <span>Email</span>
        <input
          autoComplete="email"
          type="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <small>{errors.email.message}</small> : null}
      </label>

      <label className="field">
        <span>Password</span>
        <input
          autoComplete={isSignIn ? "current-password" : "new-password"}
          type="password"
          {...register("password")}
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password ? <small>{errors.password.message}</small> : null}
      </label>

      {formMessage ? (
        <p className="form-error" role="alert">
          {formMessage}
        </p>
      ) : null}

      <button className="button button-primary w-full" disabled={pending}>
        {pending ? "Please wait…" : isSignIn ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-xs text-muted">
        {isSignIn ? "New to Hajime?" : "Already have an account?"}{" "}
        <Link
          className="font-semibold text-ink underline decoration-line underline-offset-4"
          href={isSignIn ? "/sign-up" : "/sign-in"}
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
