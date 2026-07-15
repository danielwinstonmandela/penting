export type NutritionTarget = {
  energyKkal: number;
  proteinG: number;
  fatG: number;
  bandLabel: string;
};

/**
 * Age-banded daily complementary-feeding guidance (static lookup).
 * Values aligned with typical ID MPASI / WHO complementary feeding energy bands.
 */
const TARGETS: Array<{
  minMonth: number;
  maxMonth: number;
  target: NutritionTarget;
}> = [
  {
    minMonth: 0,
    maxMonth: 5,
    target: {
      energyKkal: 0,
      proteinG: 0,
      fatG: 0,
      bandLabel: "0–5 bulan (ASI eksklusif)",
    },
  },
  {
    minMonth: 6,
    maxMonth: 8,
    target: {
      energyKkal: 200,
      proteinG: 9,
      fatG: 10,
      bandLabel: "6–8 bulan",
    },
  },
  {
    minMonth: 9,
    maxMonth: 11,
    target: {
      energyKkal: 300,
      proteinG: 11,
      fatG: 12,
      bandLabel: "9–11 bulan",
    },
  },
  {
    minMonth: 12,
    maxMonth: 23,
    target: {
      energyKkal: 550,
      proteinG: 15,
      fatG: 18,
      bandLabel: "12–23 bulan",
    },
  },
  {
    minMonth: 24,
    maxMonth: 60,
    target: {
      energyKkal: 750,
      proteinG: 20,
      fatG: 25,
      bandLabel: "2–5 tahun",
    },
  },
];

export function getNutritionTarget(ageMonths: number): NutritionTarget {
  const age = Math.min(60, Math.max(0, Math.floor(ageMonths)));
  const match = TARGETS.find(
    (band) => age >= band.minMonth && age <= band.maxMonth,
  );
  return (
    match?.target ?? {
      energyKkal: 750,
      proteinG: 20,
      fatG: 25,
      bandLabel: "2–5 tahun",
    }
  );
}
