"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  createProjectAction,
  updateProjectAction,
} from "@/domains/projects/actions/project.actions";
import {
  PROJECT_COUNTRIES,
  PROJECT_HEALTH_LABELS,
  PROJECT_HEALTH_VALUES,
  PROJECT_PACKAGE_LABELS,
  PROJECT_PACKAGES,
  PROJECT_STAGE_LABELS,
  PROJECT_STAGES,
  type Project,
} from "@/domains/projects/model/project";
import {
  projectFormSchema,
  type ProjectFormInput,
} from "@/domains/projects/schemas/project.schema";

type ProjectFormProps =
  | { mode: "create"; project?: never }
  | { mode: "edit"; project: Project };

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          coordinatorName: project.coordinator_name ?? "",
          countryCode: "JP",
          currentStage: project.current_stage,
          estimatedCompletion: project.estimated_completion ?? "",
          health: project.health,
          name: project.name,
          package: project.package,
        }
      : {
          coordinatorName: "",
          countryCode: "JP",
          currentStage: "planning",
          estimatedCompletion: "",
          health: "on_track",
          name: "",
          package: "guided_launch",
        },
  });

  function onSubmit(input: ProjectFormInput) {
    setFormMessage(undefined);
    startTransition(async () => {
      if (mode === "create") {
        const result = await createProjectAction(input);
        if (!result.ok) {
          applyFailure(result);
          return;
        }
        router.push(`/projects/${result.data.projectId}`);
        router.refresh();
        return;
      }

      const result = await updateProjectAction(project.id, input);
      if (!result.ok) {
        applyFailure(result);
        return;
      }
      router.push(`/projects/${project.id}`);
      router.refresh();
    });
  }

  function applyFailure(result: {
    message: string;
    fieldErrors?: Record<string, string[]>;
  }) {
    setFormMessage(result.message);
    Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
      setError(field as keyof ProjectFormInput, { message: messages[0] });
    });
  }

  const cancelHref = project ? `/projects/${project.id}` : "/projects";

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-section">
        <div>
          <h2>Project identity</h2>
          <p>The stable metadata everyone will use to recognize this launch.</p>
        </div>
        <div className="form-fields">
          <label className="field">
            <span>Project name</span>
            <input autoFocus {...register("name")} aria-invalid={Boolean(errors.name)} />
            {errors.name ? <small>{errors.name.message}</small> : null}
          </label>
          <label className="field">
            <span>Country</span>
            <select {...register("countryCode")}>
              {PROJECT_COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <em>Phase 1 supports Japan. The data model remains country-ready.</em>
          </label>
          <label className="field">
            <span>Package</span>
            <select {...register("package")}>
              {PROJECT_PACKAGES.map((value) => (
                <option key={value} value={value}>
                  {PROJECT_PACKAGE_LABELS[value]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="form-section">
        <div>
          <h2>Current position</h2>
          <p>A calm summary of stage, confidence, ownership, and expected timing.</p>
        </div>
        <div className="form-fields two-column">
          <label className="field">
            <span>Current stage</span>
            <select {...register("currentStage")}>
              {PROJECT_STAGES.map((value) => (
                <option key={value} value={value}>
                  {PROJECT_STAGE_LABELS[value]}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Health</span>
            <select {...register("health")}>
              {PROJECT_HEALTH_VALUES.map((value) => (
                <option key={value} value={value}>
                  {PROJECT_HEALTH_LABELS[value]}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Estimated completion</span>
            <input type="date" {...register("estimatedCompletion")} />
            {errors.estimatedCompletion ? (
              <small>{errors.estimatedCompletion.message}</small>
            ) : null}
          </label>
          <label className="field">
            <span>Coordinator</span>
            <input
              placeholder="Unassigned"
              {...register("coordinatorName")}
              aria-invalid={Boolean(errors.coordinatorName)}
            />
            {errors.coordinatorName ? (
              <small>{errors.coordinatorName.message}</small>
            ) : null}
          </label>
        </div>
      </div>

      {formMessage ? (
        <p className="form-error" role="alert">
          {formMessage}
        </p>
      ) : null}

      <div className="form-actions">
        <Link className="button button-secondary" href={cancelHref}>
          Cancel
        </Link>
        <button className="button button-primary" disabled={pending}>
          {pending
            ? "Saving…"
            : mode === "create"
              ? "Create project"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}
