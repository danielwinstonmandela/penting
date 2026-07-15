import seed from "@/content/recipes.seed.json";
import { validateRecipeSeedData } from "@/lib/data/validate-recipe-data";
import type { Recipe, RecipeSeedData } from "@/lib/types/recipe";

const result = validateRecipeSeedData(seed);

if (!result.success) {
  const details = result.issues
    .map((issue) => `[${issue.path}] ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid recipes.seed.json:\n${details}`);
}

export const recipeSeedData: RecipeSeedData = result.data;

export const recipesByAgeGroup: Record<string, Recipe[]> = Object.fromEntries(
  recipeSeedData.ageGroups.map((group) => [group.ageGroup, group.recipes]),
);

export const recipeById: Record<
  string,
  { recipe: Recipe; ageGroup: string; label: string }
> = {};

for (const group of recipeSeedData.ageGroups) {
  for (const recipe of group.recipes) {
    recipeById[recipe.id] = {
      recipe,
      ageGroup: group.ageGroup,
      label: group.label,
    };
  }
}

export const ageGroups = recipeSeedData.ageGroups;

export function getAgeGroupLabel(ageGroup: string): string | undefined {
  return ageGroups.find((group) => group.ageGroup === ageGroup)?.label;
}
