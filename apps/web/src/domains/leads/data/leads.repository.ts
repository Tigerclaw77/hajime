import "server-only";

import { requireCurrentUser } from "@/domains/auth/server/current-user";
import type {
  DiscoveryFormInput,
  LeadFormInput,
  ProposalFormInput,
} from "@/domains/leads/schemas/lead.schema";
import { moneyInputToMinor } from "@/shared/format/money";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import type { Database } from "@/shared/supabase/database.types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];
type LeadStatus = Database["public"]["Tables"]["leads"]["Row"]["status"];

function toLeadValues(input: LeadFormInput): LeadUpdate {
  return {
    business_type: input.businessType,
    coordinator_name: input.coordinatorName || null,
    country: input.country,
    email: input.email,
    name: input.name,
    notes: input.notes,
    source: input.source,
  };
}

export async function listLeads() {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return {
    active: data.filter((lead) => lead.status !== "archived"),
    archived: data.filter((lead) => lead.status === "archived"),
  };
}

export async function getLead(leadId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createLead(input: LeadFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const values: LeadInsert = {
    ...toLeadValues(input),
    business_type: input.businessType,
    country: input.country,
    email: input.email,
    name: input.name,
    owner_id: user.id,
    source: input.source,
  };
  const { data, error } = await supabase
    .from("leads")
    .insert(values)
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function updateLead(leadId: string, input: LeadFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("leads")
    .update(toLeadValues(input))
    .eq("id", leadId)
    .eq("owner_id", user.id)
    .neq("status", "archived");

  if (error) throw error;
}

export async function saveDiscovery(leadId: string, input: DiscoveryFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const values: LeadUpdate = {
    discovery_budget_estimate_minor: moneyInputToMinor(input.budgetEstimate),
    discovery_desired_timeline: input.desiredTimeline,
    discovery_key_concerns: input.keyConcerns,
    discovery_meeting_date: input.meetingDate || null,
    discovery_next_action: input.nextAction,
    discovery_summary: input.summary,
  };
  const { error } = await supabase
    .from("leads")
    .update(values)
    .eq("id", leadId)
    .eq("owner_id", user.id)
    .neq("status", "archived");

  if (error) throw error;
}

export async function saveProposal(leadId: string, input: ProposalFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const values: LeadUpdate = {
    proposal_expiration_date: input.expirationDate || null,
    proposal_expected_value_minor: moneyInputToMinor(input.expectedValue),
    proposal_outcome: input.outcome,
    proposal_package: input.packageProposed || null,
    proposal_sent_date: input.sentDate || null,
  };
  const { error } = await supabase
    .from("leads")
    .update(values)
    .eq("id", leadId)
    .eq("owner_id", user.id)
    .neq("status", "archived");

  if (error) throw error;
}

export async function updateLeadStatus(
  leadId: string,
  status: Exclude<LeadStatus, "won" | "paid">,
) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .eq("owner_id", user.id);

  if (error) throw error;
}

export async function convertLeadToProject(leadId: string) {
  await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("convert_lead_to_project", {
    target_lead_id: leadId,
  });

  if (error) throw error;
  return data;
}
