import { z } from "zod";

export const NutritionSchema = z.object({
  energy: z.string(),
  protein: z.string(),
  fat: z.string(),
});

export const RecipeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  servings: z.union([z.literal(1), z.literal(3)]),
  ingredients: z.array(z.string()).min(3).max(17),
  instructions: z.array(z.string()).min(3).max(12),
  nutrition: NutritionSchema,
  fruit: z.string().optional(),
  notes: z.string().optional(),
});

export const AgeGroupSlugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "ageGroup must be lowercase, hyphenated, and URL-safe",
  );

export const AgeGroupSchema = z.object({
  ageGroup: AgeGroupSlugSchema,
  label: z.string().min(1),
  recipes: z.array(RecipeSchema),
});

export const RecipeSeedDataSchema = z.object({
  ageGroups: z.array(AgeGroupSchema).min(1),
});

export type RecipeSeedDataParsed = z.infer<typeof RecipeSeedDataSchema>;
