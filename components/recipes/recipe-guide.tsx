"use client";

import { motion } from "framer-motion";

import { AgeFilterChips } from "@/components/recipes/age-filter-chips";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { strings } from "@/lib/strings";
import type { AgeGroup, Recipe } from "@/lib/types/recipe";

type Props = {
  ageGroups: AgeGroup[];
  activeAgeGroup?: string | null;
  recipes?: Recipe[];
  sectionLabel?: string;
};

export function RecipeGuide({
  ageGroups,
  activeAgeGroup = null,
  recipes,
  sectionLabel,
}: Props) {
  const chips = ageGroups.map((group) => ({
    ageGroup: group.ageGroup,
    label: group.label,
  }));

  const grouped =
    activeAgeGroup || recipes
      ? null
      : ageGroups.map((group) => ({
          ageGroup: group.ageGroup,
          label: group.label,
          recipes: group.recipes,
        }));

  return (
    <div className="grid gap-6">
      <header className="grid max-w-2xl gap-2">
        <h1 className="font-display text-3xl font-semibold leading-tight lg:text-4xl">
          {strings.recipesTitle}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
          {strings.recipesSubtitle}
        </p>
      </header>

      <AgeFilterChips chips={chips} active={activeAgeGroup} />

      {grouped ? (
        <div className="grid gap-8">
          {grouped.map((group) => (
            <section key={group.ageGroup} className="grid gap-3">
              <h2 className="font-display text-lg font-semibold">
                {group.label}
              </h2>
              <RecipeGrid recipes={group.recipes} ageGroup={group.ageGroup} />
            </section>
          ))}
        </div>
      ) : (
        <section className="grid gap-3">
          {sectionLabel ? (
            <h2 className="font-display text-lg font-semibold">{sectionLabel}</h2>
          ) : null}
          <RecipeGrid
            recipes={recipes ?? []}
            ageGroup={activeAgeGroup ?? ""}
          />
        </section>
      )}
    </div>
  );
}

function RecipeGrid({
  recipes,
  ageGroup,
}: {
  recipes: Recipe[];
  ageGroup: string;
}) {
  return (
    <motion.ul
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
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
  );
}
