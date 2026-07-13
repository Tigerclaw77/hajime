import "server-only";

import { requireCurrentUser } from "@/domains/auth/server/current-user";
import type { Project } from "@/domains/projects/model/project";
import type { ProjectFormInput } from "@/domains/projects/schemas/project.schema";
import { queryDatabase } from "@/shared/database/pool";
import {
  nullableDateToIso,
  nullableTimestampToIso,
  timestampToIso,
} from "@/shared/database/values";

type ProjectDatabaseRow = Omit<
  Project,
  "archived_at" | "created_at" | "estimated_completion" | "updated_at"
> & {
  archived_at: Date | string | null;
  created_at: Date | string;
  estimated_completion: Date | string | null;
  updated_at: Date | string;
};

function normalizeProject(project: ProjectDatabaseRow): Project {
  return {
    ...project,
    archived_at: nullableTimestampToIso(project.archived_at),
    created_at: timestampToIso(project.created_at),
    estimated_completion: nullableDateToIso(project.estimated_completion),
    updated_at: timestampToIso(project.updated_at),
  };
}

export async function listProjects() {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<ProjectDatabaseRow>(
    `select * from projects where owner_id = $1 order by updated_at desc`,
    [user.id],
  );
  const projects = rows.map(normalizeProject);
  return {
    active: projects.filter((project) => !project.archived_at),
    archived: projects.filter((project) => Boolean(project.archived_at)),
  };
}

export async function getProject(projectId: string) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<ProjectDatabaseRow>(
    `select * from projects where id = $1 and owner_id = $2 limit 1`,
    [projectId, user.id],
  );
  return rows[0] ? normalizeProject(rows[0]) : null;
}

export async function createProject(input: ProjectFormInput) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<{ id: string }>(
    `insert into projects (
      owner_id, name, country_code, package, current_stage, health,
      estimated_completion, coordinator_name
    ) values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning id`,
    [
      user.id,
      input.name,
      input.countryCode,
      input.package,
      input.currentStage,
      input.health,
      input.estimatedCompletion || null,
      input.coordinatorName || null,
    ],
  );
  if (!rows[0]) throw new Error("Project creation did not return an id.");
  return rows[0].id;
}

export async function updateProject(projectId: string, input: ProjectFormInput) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update projects set
      name = $1,
      country_code = $2,
      package = $3,
      current_stage = $4,
      health = $5,
      estimated_completion = $6,
      coordinator_name = $7
    where id = $8 and owner_id = $9 and archived_at is null`,
    [
      input.name,
      input.countryCode,
      input.package,
      input.currentStage,
      input.health,
      input.estimatedCompletion || null,
      input.coordinatorName || null,
      projectId,
      user.id,
    ],
  );
}

export async function archiveProject(projectId: string) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update projects
     set archived_at = timezone('utc', now())
     where id = $1 and owner_id = $2 and archived_at is null`,
    [projectId, user.id],
  );
}
