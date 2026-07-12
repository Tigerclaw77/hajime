import { describe, expect, it } from "vitest";
import {
  formatUsdMinor,
  minorToMoneyInput,
  moneyInputToMinor,
} from "@/shared/format/money";

describe("money formatting", () => {
  it("round-trips a USD form amount through integer minor units", () => {
    expect(moneyInputToMinor("9500.50")).toBe(950050);
    expect(minorToMoneyInput(950050)).toBe("9500.50");
    expect(formatUsdMinor(950050)).toBe("$9,500.50");
  });

  it("preserves an unknown estimate", () => {
    expect(moneyInputToMinor("")).toBeNull();
    expect(formatUsdMinor(null)).toBe("Not estimated");
  });
});
