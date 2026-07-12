import { describe, expect, it } from "vitest";
import { projectFormSchema } from "@/domains/projects/schemas/project.schema";

const validProject = {
  coordinatorName: "Avery Stone",
  countryCode: "JP" as const,
  currentStage: "planning" as const,
  estimatedCompletion: "2026-09-30",
  health: "on_track" as const,
  name: "Northstar Robotics K.K.",
  package: "concierge" as const,
};

describe("projectFormSchema", () => {
  it("accepts the Phase 1 project metadata", () => {
    expect(projectFormSchema.parse(validProject)).toEqual(validProject);
  });

  it("accepts an unassigned coordinator and unknown completion date", () => {
    expect(
      projectFormSchema.safeParse({
        ...validProject,
        coordinatorName: "",
        estimatedCompletion: "",
      }).success,
    ).toBe(true);
  });

  it("rejects unsupported countries", () => {
    const result = projectFormSchema.safeParse({
      ...validProject,
      countryCode: "SG",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid project name and completion date", () => {
    const result = projectFormSchema.safeParse({
      ...validProject,
      estimatedCompletion: "30 September",
      name: " ",
    });
    expect(result.success).toBe(false);
  });
});
