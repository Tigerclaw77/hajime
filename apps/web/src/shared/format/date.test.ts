import { describe, expect, it } from "vitest";
import { formatDate } from "@/shared/format/date";

describe("formatDate", () => {
  it("formats a database date without local timezone drift", () => {
    expect(formatDate("2026-08-30")).toBe("30 Aug 2026");
  });

  it("uses honest language when no estimate exists", () => {
    expect(formatDate(null)).toBe("Not estimated");
  });
});
