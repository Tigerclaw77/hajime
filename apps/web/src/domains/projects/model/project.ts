export const PROJECT_COUNTRIES = [{ value: "JP", label: "Japan" }] as const;

export const PROJECT_PACKAGES = [
  "diy_blueprint",
  "guided_launch",
  "concierge",
  "enterprise",
] as const;

export type ProjectPackage = (typeof PROJECT_PACKAGES)[number];

export const PROJECT_PACKAGE_LABELS: Record<Project["package"], string> = {
  diy_blueprint: "DIY Blueprint",
  guided_launch: "Guided Launch",
  concierge: "Concierge",
  enterprise: "Enterprise",
};

export const PROJECT_STAGES = [
  "prospect",
  "client",
  "planning",
  "formation",
  "registration",
  "tax",
  "banking",
  "operational",
  "completed",
] as const;

export type ProjectStage = (typeof PROJECT_STAGES)[number];

export const PROJECT_STAGE_LABELS: Record<Project["current_stage"], string> = {
  prospect: "Prospect",
  client: "Client",
  planning: "Planning",
  formation: "Formation",
  registration: "Registration",
  tax: "Tax",
  banking: "Banking",
  operational: "Operational",
  completed: "Completed",
};

export const PROJECT_HEALTH_VALUES = [
  "on_track",
  "at_risk",
  "blocked",
  "paused",
] as const;

export type ProjectHealth = (typeof PROJECT_HEALTH_VALUES)[number];

export type Project = {
  archived_at: string | null;
  coordinator_name: string | null;
  country_code: string;
  created_at: string;
  current_stage: ProjectStage;
  estimated_completion: string | null;
  health: ProjectHealth;
  id: string;
  name: string;
  owner_id: string;
  package: ProjectPackage;
  updated_at: string;
};

export const PROJECT_HEALTH_LABELS: Record<Project["health"], string> = {
  on_track: "On track",
  at_risk: "At risk",
  blocked: "Blocked",
  paused: "Paused",
};

export const PROJECT_COUNTRY_LABELS: Record<string, string> = {
  JP: "Japan",
};
