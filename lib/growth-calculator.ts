import { hfa_boys } from "@/lib/who-lms-tables/hfa-boys";
import { hfa_girls } from "@/lib/who-lms-tables/hfa-girls";
import { wfa_boys } from "@/lib/who-lms-tables/wfa-boys";
import { wfa_girls } from "@/lib/who-lms-tables/wfa-girls";
import type { LmsRow } from "@/lib/who-lms-tables/wfa-boys";

export type Sex = "male" | "female";

export type StatusSeverity = 0 | 1 | 2 | 3;

export type StatusTone = "urgent" | "attention" | "ok" | "neutral";

export type IndicatorStatus = {
  code: string;
  label: string;
  severity: StatusSeverity;
  tone: StatusTone;
  zScore: number;
};

export type GrowthResult = {
  ageMonths: number;
  sex: Sex;
  weightKg: number;
  heightCm: number;
  wfa: IndicatorStatus;
  hfa: IndicatorStatus;
  primary: IndicatorStatus;
  primarySource: "wfa" | "hfa";
};

function clampMonth(ageMonths: number): number {
  return Math.min(60, Math.max(0, ageMonths));
}

function interpolateLms(table: LmsRow[], ageMonths: number): LmsRow {
  const age = clampMonth(ageMonths);
  const lower = Math.floor(age);
  const upper = Math.ceil(age);

  const lowerRow = table.find((row) => row.month === lower);
  const upperRow = table.find((row) => row.month === upper);

  if (!lowerRow && !upperRow) {
    throw new Error(`Missing LMS rows near age ${ageMonths}`);
  }
  if (!lowerRow) return upperRow!;
  if (!upperRow || lower === upper) return lowerRow;

  const t = age - lower;
  return {
    month: age,
    L: lowerRow.L + (upperRow.L - lowerRow.L) * t,
    M: lowerRow.M + (upperRow.M - lowerRow.M) * t,
    S: lowerRow.S + (upperRow.S - lowerRow.S) * t,
  };
}

/** LMS z-score (WHO Child Growth Standards). */
export function lmsZScore(measurement: number, lms: Pick<LmsRow, "L" | "M" | "S">): number {
  const { L, M, S } = lms;
  if (measurement <= 0 || M <= 0 || S <= 0) {
    throw new Error("Invalid measurement or LMS parameters");
  }
  if (L === 0) {
    return Math.log(measurement / M) / S;
  }
  return (Math.pow(measurement / M, L) - 1) / (L * S);
}

function classifyHfa(z: number): IndicatorStatus {
  if (z < -3) {
    return {
      code: "hfa_severe",
      label: "Sangat Pendek — Butuh Penanganan Segera",
      severity: 3,
      tone: "urgent",
      zScore: z,
    };
  }
  if (z < -2) {
    return {
      code: "hfa_stunted",
      label: "Pendek — Perlu Perhatian",
      severity: 2,
      tone: "attention",
      zScore: z,
    };
  }
  if (z <= 3) {
    return {
      code: "hfa_normal",
      label: "Normal — Pertumbuhan Baik",
      severity: 0,
      tone: "ok",
      zScore: z,
    };
  }
  return {
    code: "hfa_tall",
    label: "Tinggi",
    severity: 0,
    tone: "neutral",
    zScore: z,
  };
}

function classifyWfa(z: number): IndicatorStatus {
  if (z < -3) {
    return {
      code: "wfa_severe",
      label: "Sangat Kurang — Butuh Penanganan Segera",
      severity: 3,
      tone: "urgent",
      zScore: z,
    };
  }
  if (z < -2) {
    return {
      code: "wfa_under",
      label: "Kurang — Perlu Perhatian",
      severity: 2,
      tone: "attention",
      zScore: z,
    };
  }
  if (z <= 2) {
    return {
      code: "wfa_normal",
      label: "Normal — Berat Baik",
      severity: 0,
      tone: "ok",
      zScore: z,
    };
  }
  return {
    code: "wfa_over",
    label: "Lebih",
    severity: 1,
    tone: "neutral",
    zScore: z,
  };
}

function pickPrimary(
  wfa: IndicatorStatus,
  hfa: IndicatorStatus,
): { primary: IndicatorStatus; primarySource: "wfa" | "hfa" } {
  if (hfa.severity > wfa.severity) {
    return { primary: hfa, primarySource: "hfa" };
  }
  if (wfa.severity > hfa.severity) {
    return { primary: wfa, primarySource: "wfa" };
  }
  // Tie: prefer HFA for stunting focus when both elevated; else HFA as growth vertical signal
  if (hfa.severity > 0) {
    return { primary: hfa, primarySource: "hfa" };
  }
  return { primary: hfa, primarySource: "hfa" };
}

export function calculateGrowth(input: {
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  sex: Sex;
}): GrowthResult {
  const { ageMonths, weightKg, heightCm, sex } = input;
  const wfaTable = sex === "male" ? wfa_boys : wfa_girls;
  const hfaTable = sex === "male" ? hfa_boys : hfa_girls;

  const wfaLms = interpolateLms(wfaTable, ageMonths);
  const hfaLms = interpolateLms(hfaTable, ageMonths);

  const wfaZ = lmsZScore(weightKg, wfaLms);
  const hfaZ = lmsZScore(heightCm, hfaLms);

  const wfa = classifyWfa(wfaZ);
  const hfa = classifyHfa(hfaZ);
  const { primary, primarySource } = pickPrimary(wfa, hfa);

  return {
    ageMonths,
    sex,
    weightKg,
    heightCm,
    wfa,
    hfa,
    primary,
    primarySource,
  };
}

export function hasNutritionDeficit(result: GrowthResult): boolean {
  return result.wfa.severity >= 2 || result.hfa.severity >= 2;
}

export function mapAgeToRecipeGroup(ageMonths: number): string | null {
  if (ageMonths < 6) return null;
  if (ageMonths <= 8) return "6-8-bulan";
  if (ageMonths <= 11) return "9-11-bulan";
  if (ageMonths <= 23) return "12-23-bulan";
  if (ageMonths <= 60) return "2-5-tahun";
  return null;
}

export function parseProteinGrams(protein: string): number {
  if (!protein.trim()) return 0;
  const normalized = protein.replace(",", ".").replace(/[^\d.]/g, "");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}
