import { notFound } from "next/navigation";

import { PageFrame } from "@/components/page-frame";
import { RecipeGuide } from "@/components/recipes/recipe-guide";
import {
  ageGroups,
  getAgeGroupLabel,
  recipesByAgeGroup,
} from "@/lib/data/recipes";
import { strings } from "@/lib/strings";

export function generateStaticParams() {
  return ageGroups.map((group) => ({ ageGroup: group.ageGroup }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ ageGroup: string }>;
}) {
  return params.then(({ ageGroup }) => {
    const label = getAgeGroupLabel(ageGroup);
    return {
      title: label ? `${strings.recipesTitle} · ${label}` : strings.recipesTitle,
    };
  });
}

export default async function AgeGroupPage({
  params,
}: {
  params: Promise<{ ageGroup: string }>;
}) {
  const { ageGroup } = await params;
  const recipes = recipesByAgeGroup[ageGroup];
  const label = getAgeGroupLabel(ageGroup);

  if (!recipes || !label) {
    notFound();
  }

  return (
    <PageFrame width="wide">
      <RecipeGuide
        ageGroups={ageGroups}
        activeAgeGroup={ageGroup}
        recipes={recipes}
        sectionLabel={label}
      />
    </PageFrame>
  );
}
