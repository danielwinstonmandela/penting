import {
  RecipeSeedDataSchema,
  type RecipeSeedDataParsed,
} from "@/lib/schemas/recipe-schema";

export type ValidationIssue = {
  path: string;
  message: string;
};

export type ValidationResult =
  | { success: true; data: RecipeSeedDataParsed }
  | { success: false; issues: ValidationIssue[] };

export function validateRecipeSeedData(input: unknown): ValidationResult {
  const parsed = RecipeSeedDataSchema.safeParse(input);
  const issues: ValidationIssue[] = [];

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      issues.push({
        path: issue.path.join(".") || "(root)",
        message: issue.message,
      });
    }
    return { success: false, issues };
  }

  const data = parsed.data;
  const ageGroupSlugs = new Set<string>();
  const recipeIds = new Set<string>();

  for (const group of data.ageGroups) {
    if (ageGroupSlugs.has(group.ageGroup)) {
      issues.push({
        path: `ageGroups.${group.ageGroup}`,
        message: `Duplicate ageGroup slug "${group.ageGroup}"`,
      });
    }
    ageGroupSlugs.add(group.ageGroup);

    for (const recipe of group.recipes) {
      if (recipeIds.has(recipe.id)) {
        issues.push({
          path: `${group.ageGroup}.${recipe.id}`,
          message: `Duplicate recipe id "${recipe.id}" across the file`,
        });
      }
      recipeIds.add(recipe.id);
    }
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return { success: true, data };
}
