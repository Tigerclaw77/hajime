import Link from "next/link";
import { ProjectHealth } from "@/domains/projects/components/project-health";
import { presentProject } from "@/domains/projects/presenters/project.presenter";
import type { Project } from "@/domains/projects/model/project";
import { formatDate, formatDateTime } from "@/shared/format/date";

export function ProjectCard({ project }: { project: Project }) {
  const presented = presentProject(project);

  return (
    <Link className="project-row" href={`/projects/${project.id}`}>
      <span className="project-primary">
        <strong>{project.name}</strong>
        <small>
          {presented.country} · {presented.package}
        </small>
      </span>
      <span className="project-stage">
        <small>Current stage</small>
        <strong>{presented.stage}</strong>
      </span>
      <ProjectHealth health={project.health} />
      <span className="project-date">
        <small>Estimated completion</small>
        <strong>{formatDate(project.estimated_completion)}</strong>
      </span>
      <span className="project-updated">Updated {formatDateTime(project.updated_at)}</span>
    </Link>
  );
}
