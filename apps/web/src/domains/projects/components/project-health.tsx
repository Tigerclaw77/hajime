import { PROJECT_HEALTH_LABELS, type Project } from "@/domains/projects/model/project";

export function ProjectHealth({ health }: { health: Project["health"] }) {
  return <span className={`health health-${health}`}>{PROJECT_HEALTH_LABELS[health]}</span>;
}
