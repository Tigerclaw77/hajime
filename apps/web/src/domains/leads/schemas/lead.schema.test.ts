import { describe, expect, it } from "vitest";
import {
  discoveryFormSchema,
  leadFormSchema,
  proposalFormSchema,
} from "@/domains/leads/schemas/lead.schema";

describe("leadFormSchema", () => {
  it("accepts the minimum founder-led sales context", () => {
    expect(
      leadFormSchema.safeParse({
        businessType: "Technology services",
        coordinatorName: "Avery Stone",
        country: "United States",
        email: "founder@example.com",
        name: "Northstar Robotics",
        notes: "Introduced by an existing founder.",
        source: "referral",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid contact and identity data", () => {
    expect(
      leadFormSchema.safeParse({
        businessType: "",
        coordinatorName: "A",
        country: "",
        email: "not-an-email",
        name: "",
        notes: "",
        source: "referral",
      }).success,
    ).toBe(false);
  });
});

describe("discoveryFormSchema", () => {
  it("accepts an empty or two-decimal USD budget estimate", () => {
    const base = {
      desiredTimeline: "Q4",
      keyConcerns: "Banking readiness",
      meetingDate: "2026-07-20",
      nextAction: "Send recommendation",
      summary: "Strong fit.",
    };
    expect(discoveryFormSchema.safeParse({ ...base, budgetEstimate: "" }).success).toBe(true);
    expect(discoveryFormSchema.safeParse({ ...base, budgetEstimate: "9500.50" }).success).toBe(true);
    expect(discoveryFormSchema.safeParse({ ...base, budgetEstimate: "95.001" }).success).toBe(false);
  });
});

describe("proposalFormSchema", () => {
  it("rejects an expiration before the sent date", () => {
    const result = proposalFormSchema.safeParse({
      expirationDate: "2026-07-19",
      expectedValue: "9500.00",
      outcome: "open",
      packageProposed: "concierge",
      sentDate: "2026-07-20",
    });
    expect(result.success).toBe(false);
  });
});
