import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { IngredientChecklist } from "@/components/recipes/ingredient-checklist";
import { Badge } from "@/components/ui/badge";
import { strings } from "@/lib/strings";
import type { Recipe } from "@/lib/types/recipe";

type Props = {
  recipe: Recipe;
  ageGroup: string;
  label: string;
};

export function RecipeDetail({ recipe, ageGroup, label }: Props) {
  const nutrition = [
    { key: "energy", label: strings.energyLabel, value: recipe.nutrition.energy },
    { key: "protein", label: strings.proteinLabel, value: recipe.nutrition.protein },
    { key: "fat", label: strings.fatLabel, value: recipe.nutrition.fat },
  ].filter((item) => item.value.trim() !== "");

  return (
    <article className="grid gap-6">
      <Link
        href={`/panduan-mpasi/${ageGroup}`}
        className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {strings.backToGuide}
      </Link>

      <header className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {label}
        </p>
        <h1 className="font-display text-3xl font-semibold leading-tight">
          {recipe.title}
        </h1>
        <Badge variant="secondary" className="w-fit">
          {recipe.servings} {strings.servingsLabel}
        </Badge>
        {recipe.fruit ? (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {strings.fruitLabel}:
            </span>{" "}
            {recipe.fruit}
          </p>
        ) : null}
      </header>

      {recipe.notes ? (
        <aside className="rounded-2xl border border-attention/30 bg-attention/10 px-4 py-3 text-sm leading-relaxed text-attention">
          {recipe.notes}
        </aside>
      ) : null}

      <section className="grid gap-3">
        <h2 className="font-display text-xl font-semibold">
          {strings.ingredientsTitle}
        </h2>
        <IngredientChecklist ingredients={recipe.ingredients} />
      </section>

      <section className="grid gap-3">
        <h2 className="font-display text-xl font-semibold">
          {strings.instructionsTitle}
        </h2>
        <ol className="grid gap-3">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {nutrition.length > 0 ? (
        <section className="grid gap-3">
          <h2 className="font-display text-xl font-semibold">
            {strings.nutritionTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {nutrition.map((item) => (
              <li
                key={item.key}
                className="rounded-2xl border border-border bg-secondary/60 px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-semibold">{item.value}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
