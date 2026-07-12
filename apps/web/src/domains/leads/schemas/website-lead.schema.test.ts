import { describe, expect, it } from "vitest";
import { websiteLeadSchema } from "@/domains/leads/schemas/website-lead.schema";

const validLead = {
  name: "Alex Morgan",
  email: "alex@example.com",
  country: "United States",
  currentBusiness: "Software consultancy",
  targetTimeline: "3-6 months" as const,
  currentSituation: "I am evaluating a Japan entity for a small consulting team.",
  companyWebsite: "",
};

describe("websiteLeadSchema", () => {
  it("accepts a qualified consultation request", () => {
    expect(websiteLeadSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects an invalid email and thin context", () => {
    const result = websiteLeadSchema.safeParse({ ...validLead, email: "not-an-email", currentSituation: "Unsure" });
    expect(result.success).toBe(false);
  });

  it("limits every public free-text field", () => {
    const result = websiteLeadSchema.safeParse({ ...validLead, currentSituation: "x".repeat(3001) });
    expect(result.success).toBe(false);
  });
});
