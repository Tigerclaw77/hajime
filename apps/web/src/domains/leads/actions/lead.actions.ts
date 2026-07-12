"use server";

import { revalidatePath } from "next/cache";
import {
  convertLeadToProject,
  createLead,
  getLead,
  saveDiscovery,
  saveProposal,
  updateLead,
  updateLeadStatus,
} from "@/domains/leads/data/leads.repository";
import {
  discoveryFormSchema,
  leadFormSchema,
  leadIdSchema,
  leadStatusSchema,
  proposalFormSchema,
  type DiscoveryFormInput,
  type LeadFormInput,
  type ProposalFormInput,
} from "@/domains/leads/schemas/lead.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";

function leadFailure<T = undefined>(message = "We could not save this lead. Please try again."): ActionResult<T> {
  return { ok: false, message };
}

function isUniqueViolation(error: unknown) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "23505");
}

function revalidateLead(leadId: string) {
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
}

export async function createLeadAction(
  input: LeadFormInput,
): Promise<ActionResult<{ leadId: string }>> {
  const parsed = leadFormSchema.safeParse(input);
  if (!parsed.success) {
    return validationError<{ leadId: string }>(parsed.error.flatten().fieldErrors);
  }

  try {
    const leadId = await createLead(parsed.data);
    revalidatePath("/leads");
    return { ok: true, data: { leadId } };
  } catch (error) {
    return leadFailure(
      isUniqueViolation(error)
        ? "An active lead already uses this email address."
        : undefined,
    );
  }
}

export async function updateLeadAction(
  leadId: string,
  input: LeadFormInput,
): Promise<ActionResult> {
  const id = leadIdSchema.safeParse(leadId);
  const parsed = leadFormSchema.safeParse(input);
  if (!id.success) return leadFailure();
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  try {
    await updateLead(id.data, parsed.data);
    revalidateLead(id.data);
    return { ok: true, data: undefined };
  } catch (error) {
    return leadFailure(
      isUniqueViolation(error)
        ? "An active lead already uses this email address."
        : undefined,
    );
  }
}

export async function saveDiscoveryAction(
  leadId: string,
  input: DiscoveryFormInput,
): Promise<ActionResult> {
  const id = leadIdSchema.safeParse(leadId);
  const parsed = discoveryFormSchema.safeParse(input);
  if (!id.success) return leadFailure();
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  try {
    await saveDiscovery(id.data, parsed.data);
    revalidateLead(id.data);
    return { ok: true, data: undefined };
  } catch {
    return leadFailure();
  }
}

export async function saveProposalAction(
  leadId: string,
  input: ProposalFormInput,
): Promise<ActionResult> {
  const id = leadIdSchema.safeParse(leadId);
  const parsed = proposalFormSchema.safeParse(input);
  if (!id.success) return leadFailure();
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  try {
    await saveProposal(id.data, parsed.data);
    revalidateLead(id.data);
    return { ok: true, data: undefined };
  } catch {
    return leadFailure();
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  status: string,
): Promise<ActionResult<{ projectId?: string }>> {
  const id = leadIdSchema.safeParse(leadId);
  const parsedStatus = leadStatusSchema.safeParse(status);
  if (!id.success || !parsedStatus.success) return leadFailure();

  try {
    if (parsedStatus.data === "won") {
      const lead = await getLead(id.data);
      if (!lead) return leadFailure("Lead not found.");
      if (!lead.proposal_package) {
        return leadFailure("Add a proposed package before marking this lead Won.");
      }
      const projectId = await convertLeadToProject(id.data);
      revalidatePath("/projects");
      revalidateLead(id.data);
      return { ok: true, data: { projectId } };
    }

    await updateLeadStatus(id.data, parsedStatus.data);
    revalidateLead(id.data);
    return { ok: true, data: {} };
  } catch {
    return leadFailure();
  }
}
