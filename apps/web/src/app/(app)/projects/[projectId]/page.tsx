import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveProjectButton } from "@/domains/projects/components/archive-project-button";
import { ProjectHealth } from "@/domains/projects/components/project-health";
import { getProject } from "@/domains/projects/data/projects.repository";
import { presentProject } from "@/domains/projects/presenters/project.presenter";
import { formatDate, formatDateTime } from "@/shared/format/date";

type ProjectPageProps = { params: Promise<{ projectId: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProject(projectId);
  return { title: project?.name ?? "Project" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();

  const presented = presentProject(project);
  const isArchived = Boolean(project.archived_at);

  return (
    <div className="page-shell page-shell-narrow">
      <Link className="back-link" href="/projects">
        Projects
      </Link>
      <header className="project-header">
        <div>
          <div className="flex items-center gap-3">
            <div className="eyebrow">{presented.country}</div>
            {isArchived ? <span className="archived-label">Archived</span> : null}
          </div>
          <h1>{project.name}</h1>
          <p>{presented.package}</p>
        </div>
        <div className="flex items-center gap-3">
          {!isArchived ? (
            <>
              <Link className="button button-secondary" href={`/projects/${project.id}/edit`}>
                Edit metadata
              </Link>
              <ArchiveProjectButton projectId={project.id} />
            </>
          ) : null}
        </div>
      </header>

      {isArchived ? (
        <div className="archive-notice">
          This project is read-only. It was archived {formatDateTime(project.archived_at!)}.
        </div>
      ) : null}

      <section className="project-summary" aria-label="Project summary">
        <div className="summary-primary">
          <span>Current stage</span>
          <strong>{presented.stage}</strong>
          <p>
            The project record is the source of truth for current launch metadata.
          </p>
        </div>
        <div className="summary-item">
          <span>Health</span>
          <ProjectHealth health={project.health} />
        </div>
        <div className="summary-item">
          <span>Estimated completion</span>
          <strong>{formatDate(project.estimated_completion)}</strong>
        </div>
        <div className="summary-item">
          <span>Coordinator</span>
          <strong>{project.coordinator_name ?? "Unassigned"}</strong>
        </div>
      </section>

      <section className="metadata-section">
        <div className="section-header">
          <h2>Project metadata</h2>
        </div>
        <dl className="metadata-list">
          <div><dt>Name</dt><dd>{project.name}</dd></div>
          <div><dt>Country</dt><dd>{presented.country}</dd></div>
          <div><dt>Package</dt><dd>{presented.package}</dd></div>
          <div><dt>Current stage</dt><dd>{presented.stage}</dd></div>
          <div><dt>Health</dt><dd>{presented.health}</dd></div>
          <div><dt>Estimated completion</dt><dd>{formatDate(project.estimated_completion)}</dd></div>
          <div><dt>Coordinator</dt><dd>{project.coordinator_name ?? "Unassigned"}</dd></div>
          <div><dt>Created</dt><dd>{formatDateTime(project.created_at)}</dd></div>
          <div><dt>Updated</dt><dd>{formatDateTime(project.updated_at)}</dd></div>
        </dl>
      </section>
    </div>
  );
}
