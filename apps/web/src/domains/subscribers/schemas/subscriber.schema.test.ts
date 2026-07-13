import { describe, expect, it } from "vitest";
import { subscriberSchema } from "@/domains/subscribers/schemas/subscriber.schema";

describe("subscriberSchema", () => {
  it("accepts a normalized operational update subscription", () => {
    const result = subscriberSchema.safeParse({ email: "founder@example.com", interests: ["Formation updates", "Policy changes"], companyWebsite: "" });
    expect(result.success).toBe(true);
  });

  it("requires a valid email and at least one interest", () => {
    const result = subscriberSchema.safeParse({ email: "not-an-email", interests: [], companyWebsite: "" });
    expect(result.success).toBe(false);
  });
});
