import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProjectForm } from "@/domains/projects/components/project-form";
import { getProject } from "@/domains/projects/data/projects.repository";

type EditProjectPageProps = { params: Promise<{ projectId: string }> };

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();
  if (project.archived_at) redirect(`/projects/${project.id}`);

  return (
    <div className="page-shell page-shell-narrow">
      <Link className="back-link" href={`/projects/${project.id}`}>
        {project.name}
      </Link>
      <header className="page-header compact">
        <div>
          <div className="eyebrow">Project settings</div>
          <h1>Edit metadata</h1>
          <p>Keep the project’s current position accurate and concise.</p>
        </div>
      </header>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
