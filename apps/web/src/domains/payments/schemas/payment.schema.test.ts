import { describe, expect, it } from "vitest";
import { createPaymentSchema } from "@/domains/payments/schemas/payment.schema";

describe("createPaymentSchema", () => {
  it("accepts a fixed USD invoice request", () => {
    expect(createPaymentSchema.parse({
      amount: "9500.00",
      description: "Concierge - Northstar Robotics",
      dueDays: "14",
      method: "invoice",
    })).toEqual({
      amount: "9500.00",
      description: "Concierge - Northstar Robotics",
      dueDays: "14",
      method: "invoice",
    });
  });

  it("accepts a one-time Payment Link request", () => {
    expect(createPaymentSchema.safeParse({
      amount: "4800",
      description: "Guided Launch - Aster Labs",
      dueDays: "14",
      method: "payment_link",
    }).success).toBe(true);
  });

  it("rejects zero, fractional cents, and invalid invoice terms", () => {
    expect(createPaymentSchema.safeParse({
      amount: "0",
      description: "Concierge",
      dueDays: "14",
      method: "invoice",
    }).success).toBe(false);
    expect(createPaymentSchema.safeParse({
      amount: "25.123",
      description: "Concierge",
      dueDays: "14",
      method: "invoice",
    }).success).toBe(false);
    expect(createPaymentSchema.safeParse({
      amount: "2500",
      description: "Concierge",
      dueDays: "91",
      method: "invoice",
    }).success).toBe(false);
  });
});
