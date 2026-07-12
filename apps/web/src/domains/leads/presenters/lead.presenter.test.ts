import { describe, expect, it } from "vitest";
import { presentLead } from "@/domains/leads/presenters/lead.presenter";
import type { Lead } from "@/domains/leads/model/lead";

const lead: Lead = {
  business_type: "Technology services",
  coordinator_name: "Avery Stone",
  country: "United States",
  created_at: "2026-07-12T00:00:00.000Z",
  currency_code: "USD",
  discovery_budget_estimate_minor: null,
  discovery_desired_timeline: "",
  discovery_key_concerns: "",
  discovery_meeting_date: null,
  discovery_next_action: "",
  discovery_summary: "",
  email: "founder@example.com",
  id: "2ec6826b-951d-4470-836b-8d64f0632ec4",
  name: "Northstar Robotics",
  notes: "",
  owner_id: "81f59e17-f54c-4e59-a0c2-a6e605fdc268",
  project_id: null,
  proposal_expiration_date: null,
  proposal_expected_value_minor: 950000,
  proposal_outcome: "open",
  proposal_package: "concierge",
  proposal_sent_date: "2026-07-20",
  source: "founder_network",
  status: "proposal_sent",
  updated_at: "2026-07-12T00:00:00.000Z",
};

describe("presentLead", () => {
  it("maps stored sales values to business language", () => {
    expect(presentLead(lead)).toEqual({
      package: "Concierge",
      proposalOutcome: "Open",
      source: "Founder network",
      status: "Proposal sent",
    });
  });
});
