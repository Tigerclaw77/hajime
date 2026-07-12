"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { archiveProjectAction } from "@/domains/projects/actions/project.actions";

export function ArchiveProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>();

  function archive() {
    if (!window.confirm("Archive this project? It will become read-only.")) return;

    setMessage(undefined);
    startTransition(async () => {
      const result = await archiveProjectAction(projectId);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      router.push("/projects");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      {message ? <span className="text-xs text-danger">{message}</span> : null}
      <button className="button button-danger" disabled={pending} onClick={archive}>
        {pending ? "Archiving…" : "Archive project"}
      </button>
    </div>
  );
}
