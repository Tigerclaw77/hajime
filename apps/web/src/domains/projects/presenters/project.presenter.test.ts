import { describe, expect, it } from "vitest";
import { presentProject } from "@/domains/projects/presenters/project.presenter";
import type { Project } from "@/domains/projects/model/project";

const project: Project = {
  archived_at: null,
  coordinator_name: null,
  country_code: "JP",
  created_at: "2026-07-12T00:00:00.000Z",
  current_stage: "formation",
  estimated_completion: null,
  health: "at_risk",
  id: "69b98dc7-211d-4db3-a40e-b420fbe3f469",
  name: "Northstar Robotics K.K.",
  owner_id: "a3a4eef0-d5f4-4f54-9446-a0a92750b012",
  package: "guided_launch",
  updated_at: "2026-07-12T00:00:00.000Z",
};

describe("presentProject", () => {
  it("maps stored values to source-of-truth business labels", () => {
    expect(presentProject(project)).toEqual({
      country: "Japan",
      health: "At risk",
      package: "Guided Launch",
      stage: "Formation",
    });
  });
});
