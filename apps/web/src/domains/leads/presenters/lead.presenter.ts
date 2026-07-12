import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUS_LABELS,
  PROPOSAL_OUTCOME_LABELS,
  type Lead,
} from "@/domains/leads/model/lead";
import { PROJECT_PACKAGE_LABELS } from "@/domains/projects/model/project";

export function presentLead(lead: Lead) {
  return {
    package: lead.proposal_package
      ? PROJECT_PACKAGE_LABELS[lead.proposal_package]
      : "Not proposed",
    proposalOutcome: PROPOSAL_OUTCOME_LABELS[lead.proposal_outcome],
    source: LEAD_SOURCE_LABELS[lead.source],
    status: LEAD_STATUS_LABELS[lead.status],
  };
}
