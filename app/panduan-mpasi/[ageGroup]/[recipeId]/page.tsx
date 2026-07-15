import { notFound } from "next/navigation";

import { PageFrame } from "@/components/page-frame";
import { RecipeDetail } from "@/components/recipes/recipe-detail";
import { ageGroups, recipeById } from "@/lib/data/recipes";

export function generateStaticParams() {
  return ageGroups.flatMap((group) =>
    group.recipes.map((recipe) => ({
      ageGroup: group.ageGroup,
      recipeId: recipe.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ageGroup: string; recipeId: string }>;
}) {
  const { recipeId } = await params;
  const entry = recipeById[recipeId];
  return {
    title: entry?.recipe.title ?? "Resep",
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ ageGroup: string; recipeId: string }>;
}) {
  const { ageGroup, recipeId } = await params;
  const entry = recipeById[recipeId];

  if (!entry || entry.ageGroup !== ageGroup) {
    notFound();
  }

  return (
    <PageFrame width="content">
      <RecipeDetail
        recipe={entry.recipe}
        ageGroup={entry.ageGroup}
        label={entry.label}
      />
    </PageFrame>
  );
}
