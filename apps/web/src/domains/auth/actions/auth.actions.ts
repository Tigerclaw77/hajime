"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authSchema, type AuthInput } from "@/domains/auth/schemas/auth.schema";
import { getAuth } from "@/domains/auth/server/auth";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";

type SignUpResult = { requiresEmailConfirmation: boolean };

export async function signInAction(
  input: AuthInput,
): Promise<ActionResult<undefined>> {
  const parsed = authSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  try {
    await getAuth().api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch {
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

  try {
    await getAuth().api.signUpEmail({
      body: {
        ...parsed.data,
        name: parsed.data.email.split("@")[0] || parsed.data.email,
      },
      headers: await headers(),
    });
  } catch {
    return { ok: false, message: "We could not create this account." };
  }

  return {
    ok: true,
    data: { requiresEmailConfirmation: false },
  };
}

export async function signOutAction() {
  await getAuth().api.signOut({ headers: await headers() });
  redirect("/sign-in");
}
