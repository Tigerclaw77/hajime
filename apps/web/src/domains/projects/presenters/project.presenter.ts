import {
  PROJECT_COUNTRY_LABELS,
  PROJECT_HEALTH_LABELS,
  PROJECT_PACKAGE_LABELS,
  PROJECT_STAGE_LABELS,
  type Project,
} from "@/domains/projects/model/project";

export function presentProject(project: Project) {
  return {
    country: PROJECT_COUNTRY_LABELS[project.country_code] ?? project.country_code,
    health: PROJECT_HEALTH_LABELS[project.health],
    package: PROJECT_PACKAGE_LABELS[project.package],
    stage: PROJECT_STAGE_LABELS[project.current_stage],
  };
}
