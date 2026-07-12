import type { Metadata } from "next";
import Link from "next/link";
import { ProjectForm } from "@/domains/projects/components/project-form";

export const metadata: Metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div className="page-shell page-shell-narrow">
      <Link className="back-link" href="/projects">
        Projects
      </Link>
      <header className="page-header compact">
        <div>
          <div className="eyebrow">New project</div>
          <h1>Create a project</h1>
          <p>Begin with the metadata needed to identify and manage the launch.</p>
        </div>
      </header>
      <ProjectForm mode="create" />
    </div>
  );
}
