import {
  hasNutritionDeficit,
  mapAgeToRecipeGroup,
  parseProteinGrams,
  type GrowthResult,
} from "@/lib/growth-calculator";
import { recipesByAgeGroup } from "@/lib/data/recipes";
import type { Recipe } from "@/lib/types/recipe";

export function recommendRecipes(result: GrowthResult, limit = 4): {
  ageGroup: string | null;
  recipes: Recipe[];
} {
  const ageGroup = mapAgeToRecipeGroup(result.ageMonths);
  if (!ageGroup) {
    return { ageGroup: null, recipes: [] };
  }

  const pool = [...(recipesByAgeGroup[ageGroup] ?? [])];
  if (pool.length === 0) {
    return { ageGroup, recipes: [] };
  }

  if (hasNutritionDeficit(result)) {
    pool.sort(
      (a, b) =>
        parseProteinGrams(b.nutrition.protein) -
        parseProteinGrams(a.nutrition.protein),
    );
  } else {
    // Stable general rotation keyed by age month so result feels intentional
    const offset = result.ageMonths % pool.length;
    const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
    return { ageGroup, recipes: rotated.slice(0, limit) };
  }

  return { ageGroup, recipes: pool.slice(0, limit) };
}
