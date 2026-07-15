import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { strings } from "@/lib/strings";
import type { Recipe } from "@/lib/types/recipe";

type Props = {
  recipe: Recipe;
  ageGroup: string;
};

function NutritionPills({ recipe }: { recipe: Recipe }) {
  const pills = [
    { key: "energy", value: recipe.nutrition.energy },
    { key: "protein", value: recipe.nutrition.protein },
    { key: "fat", value: recipe.nutrition.fat },
  ].filter((pill) => pill.value.trim() !== "");

  if (pills.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {pills.map((pill) => (
        <li
          key={pill.key}
          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
        >
          {pill.value}
        </li>
      ))}
    </ul>
  );
}

export function RecipeCard({ recipe, ageGroup }: Props) {
  return (
    <Link
      href={`/panduan-mpasi/${ageGroup}/${recipe.id}`}
      className="block min-h-11 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold leading-snug">
          {recipe.title}
        </h3>
        <Badge variant="secondary" className="shrink-0">
          {recipe.servings} {strings.servingsLabel}
        </Badge>
      </div>
      <NutritionPills recipe={recipe} />
    </Link>
  );
}
