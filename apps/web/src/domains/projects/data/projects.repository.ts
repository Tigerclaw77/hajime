import "server-only";

import type { ProjectFormInput } from "@/domains/projects/schemas/project.schema";
import { requireCurrentUser } from "@/domains/auth/server/current-user";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import type { Database } from "@/shared/supabase/database.types";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

function toProjectValues(input: ProjectFormInput): ProjectUpdate {
  return {
    coordinator_name: input.coordinatorName || null,
    country_code: input.countryCode,
    current_stage: input.currentStage,
    estimated_completion: input.estimatedCompletion || null,
    health: input.health,
    name: input.name,
    package: input.package,
  };
}

export async function listProjects() {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return {
    active: data.filter((project) => !project.archived_at),
    archived: data.filter((project) => Boolean(project.archived_at)),
  };
}

export async function getProject(projectId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createProject(input: ProjectFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const values: ProjectInsert = {
    ...toProjectValues(input),
    country_code: input.countryCode,
    current_stage: input.currentStage,
    health: input.health,
    name: input.name,
    owner_id: user.id,
    package: input.package,
  };

  const { data, error } = await supabase
    .from("projects")
    .insert(values)
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function updateProject(projectId: string, input: ProjectFormInput) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("projects")
    .update(toProjectValues(input))
    .eq("id", projectId)
    .eq("owner_id", user.id)
    .is("archived_at", null);

  if (error) throw error;
}

export async function archiveProject(projectId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("projects")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("owner_id", user.id)
    .is("archived_at", null);

  if (error) throw error;
}
