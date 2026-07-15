"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  ingredients: string[];
};

export function IngredientChecklist({ ingredients }: Props) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <ul className="grid gap-2">
      {ingredients.map((ingredient, index) => {
        const id = `ing-${index}`;
        const isChecked = !!checked[index];
        return (
          <li key={id} className="flex min-h-11 items-start gap-3 rounded-xl px-1 py-1">
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(value) =>
                setChecked((prev) => ({ ...prev, [index]: value === true }))
              }
              className="mt-1 size-5"
            />
            <Label
              htmlFor={id}
              className={cn(
                "text-sm leading-relaxed font-normal",
                isChecked && "text-muted-foreground line-through",
              )}
            >
              {ingredient}
            </Label>
          </li>
        );
      })}
    </ul>
  );
}
