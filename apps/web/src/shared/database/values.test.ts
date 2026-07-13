import { describe, expect, it } from "vitest";
import { dateToIso, nullableDateToIso } from "@/shared/database/values";

describe("database date normalization", () => {
  it("normalizes a PostgreSQL Date object without appending a second timestamp", () => {
    expect(dateToIso(new Date(2026, 6, 13))).toBe("2026-07-13");
  });

  it("preserves an ISO date string and nullable values", () => {
    expect(dateToIso("2026-07-13")).toBe("2026-07-13");
    expect(nullableDateToIso(null)).toBeNull();
  });
});
