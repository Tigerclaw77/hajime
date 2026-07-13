import "server-only";

import { requireCurrentUser } from "@/domains/auth/server/current-user";
import type { Lead, LeadStatus } from "@/domains/leads/model/lead";
import type {
  DiscoveryFormInput,
  LeadFormInput,
  ProposalFormInput,
} from "@/domains/leads/schemas/lead.schema";
import { queryDatabase } from "@/shared/database/pool";
import {
  nullableInteger,
  timestampToIso,
} from "@/shared/database/values";
import { moneyInputToMinor } from "@/shared/format/money";

type LeadDatabaseRow = Omit<
  Lead,
  | "created_at"
  | "discovery_budget_estimate_minor"
  | "proposal_expected_value_minor"
  | "updated_at"
> & {
  created_at: Date | string;
  discovery_budget_estimate_minor: number | string | null;
  proposal_expected_value_minor: number | string | null;
  updated_at: Date | string;
};

function normalizeLead(lead: LeadDatabaseRow): Lead {
  return {
    ...lead,
    created_at: timestampToIso(lead.created_at),
    discovery_budget_estimate_minor: nullableInteger(lead.discovery_budget_estimate_minor),
    proposal_expected_value_minor: nullableInteger(lead.proposal_expected_value_minor),
    updated_at: timestampToIso(lead.updated_at),
  };
}

export async function listLeads() {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<LeadDatabaseRow>(
    `select * from leads where owner_id = $1 order by updated_at desc`,
    [user.id],
  );
  const leads = rows.map(normalizeLead);
  return {
    active: leads.filter((lead) => lead.status !== "archived"),
    archived: leads.filter((lead) => lead.status === "archived"),
  };
}

export async function getLead(leadId: string) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<LeadDatabaseRow>(
    `select * from leads where id = $1 and owner_id = $2 limit 1`,
    [leadId, user.id],
  );
  return rows[0] ? normalizeLead(rows[0]) : null;
}

export async function createLead(input: LeadFormInput) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<{ id: string }>(
    `insert into leads (
      owner_id, name, email, country, business_type, source, notes, coordinator_name
    ) values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning id`,
    [
      user.id,
      input.name,
      input.email,
      input.country,
      input.businessType,
      input.source,
      input.notes,
      input.coordinatorName || null,
    ],
  );
  if (!rows[0]) throw new Error("Lead creation did not return an id.");
  return rows[0].id;
}

export async function updateLead(leadId: string, input: LeadFormInput) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update leads set
      name = $1, email = $2, country = $3, business_type = $4,
      source = $5, notes = $6, coordinator_name = $7
    where id = $8 and owner_id = $9 and status <> 'archived'`,
    [
      input.name,
      input.email,
      input.country,
      input.businessType,
      input.source,
      input.notes,
      input.coordinatorName || null,
      leadId,
      user.id,
    ],
  );
}

export async function saveDiscovery(leadId: string, input: DiscoveryFormInput) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update leads set
      discovery_meeting_date = $1,
      discovery_summary = $2,
      discovery_key_concerns = $3,
      discovery_desired_timeline = $4,
      discovery_budget_estimate_minor = $5,
      discovery_next_action = $6
    where id = $7 and owner_id = $8 and status <> 'archived'`,
    [
      input.meetingDate || null,
      input.summary,
      input.keyConcerns,
      input.desiredTimeline,
      moneyInputToMinor(input.budgetEstimate),
      input.nextAction,
      leadId,
      user.id,
    ],
  );
}

export async function saveProposal(leadId: string, input: ProposalFormInput) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update leads set
      proposal_sent_date = $1,
      proposal_package = $2,
      proposal_expected_value_minor = $3,
      proposal_expiration_date = $4,
      proposal_outcome = $5
    where id = $6 and owner_id = $7 and status <> 'archived'`,
    [
      input.sentDate || null,
      input.packageProposed || null,
      moneyInputToMinor(input.expectedValue),
      input.expirationDate || null,
      input.outcome,
      leadId,
      user.id,
    ],
  );
}

export async function updateLeadStatus(
  leadId: string,
  status: Exclude<LeadStatus, "won" | "paid">,
) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update leads set status = $1 where id = $2 and owner_id = $3`,
    [status, leadId, user.id],
  );
}

export async function convertLeadToProject(leadId: string) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<{ project_id: string }>(
    `select convert_lead_to_project($1, $2) as project_id`,
    [user.id, leadId],
  );
  if (!rows[0]) throw new Error("Lead conversion did not return a project id.");
  return rows[0].project_id;
}
