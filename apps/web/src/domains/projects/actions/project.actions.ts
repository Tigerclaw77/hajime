"use server";

import { revalidatePath } from "next/cache";
import {
  archiveProject,
  createProject,
  updateProject,
} from "@/domains/projects/data/projects.repository";
import {
  projectFormSchema,
  projectIdSchema,
  type ProjectFormInput,
} from "@/domains/projects/schemas/project.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";

function projectFailure<T = undefined>(): ActionResult<T> {
  return {
    ok: false,
    message: "We could not save this project. Please try again.",
  };
}

export async function createProjectAction(
  input: ProjectFormInput,
): Promise<ActionResult<{ projectId: string }>> {
  const parsed = projectFormSchema.safeParse(input);
  if (!parsed.success) {
    return validationError<{ projectId: string }>(
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const projectId = await createProject(parsed.data);
    revalidatePath("/projects");
    return { ok: true, data: { projectId } };
  } catch {
    return projectFailure();
  }
}

export async function updateProjectAction(
  projectId: string,
  input: ProjectFormInput,
): Promise<ActionResult> {
  const id = projectIdSchema.safeParse(projectId);
  const parsed = projectFormSchema.safeParse(input);
  if (!id.success) return projectFailure();
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  try {
    await updateProject(id.data, parsed.data);
    revalidatePath("/projects");
    revalidatePath(`/projects/${id.data}`);
    return { ok: true, data: undefined };
  } catch {
    return projectFailure();
  }
}

export async function archiveProjectAction(
  projectId: string,
): Promise<ActionResult> {
  const id = projectIdSchema.safeParse(projectId);
  if (!id.success) return projectFailure();

  try {
    await archiveProject(id.data);
    revalidatePath("/projects");
    revalidatePath(`/projects/${id.data}`);
    return { ok: true, data: undefined };
  } catch {
    return projectFailure();
  }
}
