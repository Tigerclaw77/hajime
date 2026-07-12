"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authSchema, type AuthInput } from "@/domains/auth/schemas/auth.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";
import { createSupabaseServerClient } from "@/shared/supabase/server";

type SignUpResult = { requiresEmailConfirmation: boolean };

export async function signInAction(
  input: AuthInput,
): Promise<ActionResult<undefined>> {
  const parsed = authSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { ok: false, message: "Email or password is incorrect." };
  }

  return { ok: true, data: undefined };
}

export async function signUpAction(
  input: AuthInput,
): Promise<ActionResult<SignUpResult>> {
  const parsed = authSchema.safeParse(input);
  if (!parsed.success) {
    return validationError<SignUpResult>(parsed.error.flatten().fieldErrors);
  }

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? "http://localhost:3000";
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    data: { requiresEmailConfirmation: !data.session },
  };
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
