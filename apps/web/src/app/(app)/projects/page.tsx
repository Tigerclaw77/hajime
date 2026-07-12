import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/domains/projects/components/project-card";
import { listProjects } from "@/domains/projects/data/projects.repository";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const { active, archived } = await listProjects();

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <div className="eyebrow">Project portfolio</div>
          <h1>Projects</h1>
          <p>One clear record for every business launch.</p>
        </div>
        <Link className="button button-primary" href="/projects/new">
          New project
        </Link>
      </header>

      {active.length ? (
        <section aria-labelledby="active-projects">
          <div className="section-header">
            <h2 id="active-projects">Active</h2>
            <span>{active.length}</span>
          </div>
          <div className="project-list">
            {active.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : (
        <section className="empty-state">
          <span className="brand-mark" aria-hidden="true">
            始
          </span>
          <h2>Start with one project.</h2>
          <p>
            Capture the essential launch metadata now. Partners, documents, and workflows
            remain intentionally out of scope.
          </p>
          <Link className="button button-primary" href="/projects/new">
            Create your first project
          </Link>
        </section>
      )}

      {archived.length ? (
        <section className="mt-14" aria-labelledby="archived-projects">
          <div className="section-header">
            <h2 id="archived-projects">Archived</h2>
            <span>{archived.length}</span>
          </div>
          <div className="project-list project-list-archived">
            {archived.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
