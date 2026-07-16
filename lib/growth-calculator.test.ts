import { describe, expect, it } from "vitest";

import {
  calculateGrowth,
  lmsZScore,
  mapAgeToRecipeGroup,
} from "@/lib/growth-calculator";
import { getNutritionTarget } from "@/lib/nutrition-targets";
import { wfa_boys } from "@/lib/who-lms-tables/wfa-boys";

describe("lmsZScore", () => {
  it("returns ~0 for median weight of newborn boy", () => {
    const row = wfa_boys.find((r) => r.month === 0)!;
    const z = lmsZScore(row.M, row);
    expect(Math.abs(z)).toBeLessThan(0.001);
  });

  it("flags severe underweight for very low newborn boy weight", () => {
    const result = calculateGrowth({
      ageMonths: 0,
      weightKg: 2.0,
      heightCm: 49.9,
      sex: "male",
    });
    expect(result.wfa.severity).toBeGreaterThanOrEqual(2);
    expect(result.wfa.tone).toMatch(/urgent|attention/);
  });
});

describe("status classification", () => {
  it("marks stunting when height is far below median", () => {
    const result = calculateGrowth({
      ageMonths: 12,
      weightKg: 9.5,
      heightCm: 68,
      sex: "male",
    });
    expect(result.hfa.zScore).toBeLessThan(-2);
    expect(result.hfa.severity).toBeGreaterThanOrEqual(2);
  });

  it("emphasizes the more severe indicator", () => {
    const result = calculateGrowth({
      ageMonths: 24,
      weightKg: 8,
      heightCm: 78,
      sex: "female",
    });
    expect(result.primary.severity).toBe(
      Math.max(result.wfa.severity, result.hfa.severity),
    );
  });

  it("returns WHO median and child differences", () => {
    const result = calculateGrowth({
      ageMonths: 12,
      weightKg: 10.2,
      heightCm: 75.5,
      sex: "female",
    });

    expect(result.weightKgNormal).toBeGreaterThan(0);
    expect(result.heightCmNormal).toBeGreaterThan(0);
    expect(result.weightDiffKg).toBeCloseTo(
      result.weightKg - result.weightKgNormal,
      6,
    );
    expect(result.heightDiffCm).toBeCloseTo(
      result.heightCm - result.heightCmNormal,
      6,
    );
  });
});

describe("mapAgeToRecipeGroup", () => {
  it("returns null under 6 months", () => {
    expect(mapAgeToRecipeGroup(5)).toBeNull();
  });
  it("maps bands correctly", () => {
    expect(mapAgeToRecipeGroup(7)).toBe("6-8-bulan");
    expect(mapAgeToRecipeGroup(10)).toBe("9-11-bulan");
    expect(mapAgeToRecipeGroup(18)).toBe("12-23-bulan");
    expect(mapAgeToRecipeGroup(36)).toBe("2-5-tahun");
  });
});

describe("nutrition targets", () => {
  it("returns zero energy band for exclusive breastfeeding ages", () => {
    expect(getNutritionTarget(3).energyKkal).toBe(0);
  });
  it("returns 6-8 band values", () => {
    expect(getNutritionTarget(7).energyKkal).toBe(200);
  });
});
