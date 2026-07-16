"use client";

import { motion } from "framer-motion";

import { RecipeCard } from "@/components/recipes/recipe-card";
import { strings } from "@/lib/strings";
import type { Recipe } from "@/lib/types/recipe";

type Props = {
  ageGroup: string | null;
  recipes: Recipe[];
  tooYoung: boolean;
};

export function RecipeRecommendation({ ageGroup, recipes, tooYoung }: Props) {
  return (
    <section className="grid gap-3">
      <h3 className="font-display text-lg font-semibold">
        {strings.resultRecipesTitle}
      </h3>
      <p className="text-sm text-muted-foreground">{strings.recipeCardsHint}</p>
      {tooYoung || !ageGroup ? (
        <p className="rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm leading-relaxed">
          {strings.exclusiveBreastfeedingNote} {strings.mpasiTooYoung}
        </p>
      ) : (
        <motion.ul
          className="grid gap-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {recipes.map((recipe) => (
            <motion.li
              key={recipe.id}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
              }}
            >
              <RecipeCard recipe={recipe} ageGroup={ageGroup} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
