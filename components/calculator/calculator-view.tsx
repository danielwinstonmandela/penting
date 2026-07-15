"use client";

import { useState } from "react";

import {
  CalculatorForm,
  type CalculatorFormValues,
} from "@/components/calculator/calculator-form";
import { RecipeRecommendation } from "@/components/calculator/recipe-recommendation";
import { ResultCard } from "@/components/calculator/result-card";
import {
  calculateGrowth,
  type GrowthResult,
} from "@/lib/growth-calculator";
import { getNutritionTarget } from "@/lib/nutrition-targets";
import { recommendRecipes } from "@/lib/recommend-recipes";
import { strings } from "@/lib/strings";
import type { Recipe } from "@/lib/types/recipe";

export function CalculatorView() {
  const [result, setResult] = useState<GrowthResult | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  function handleSubmit(values: CalculatorFormValues) {
    const next = calculateGrowth({
      ageMonths: values.ageMonths,
      weightKg: values.weightKg,
      heightCm: values.heightCm,
      sex: values.sex,
    });
    const recommended = recommendRecipes(next);
    setResult(next);
    setRecipes(recommended.recipes);
    setAgeGroup(recommended.ageGroup);
  }

  const targets = result ? getNutritionTarget(result.ageMonths) : null;

  return (
    <div className="grid gap-8">
      <header className="grid max-w-2xl gap-2">
        <h1 className="font-display text-3xl font-semibold leading-tight lg:text-4xl">
          {strings.calculatorTitle}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
          {strings.calculatorSubtitle}
        </p>
      </header>

      <div
        className={
          result && targets
            ? "grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10"
            : "grid max-w-xl gap-8"
        }
      >
        <CalculatorForm onSubmit={handleSubmit} />

        {result && targets ? (
          <div className="grid gap-8 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <ResultCard result={result} targets={targets} />
            <RecipeRecommendation
              ageGroup={ageGroup}
              recipes={recipes}
              tooYoung={result.ageMonths < 6}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
