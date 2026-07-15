import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { validateRecipeSeedData } from "../lib/data/validate-recipe-data";

const filePath = resolve(process.cwd(), "content/recipes.seed.json");

let raw: unknown;
try {
  raw = JSON.parse(readFileSync(filePath, "utf8"));
} catch (error) {
  console.error(`Failed to read or parse ${filePath}`);
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const result = validateRecipeSeedData(raw);

if (!result.success) {
  console.error("Recipe seed validation failed:\n");
  for (const issue of result.issues) {
    console.error(`  - [${issue.path}] ${issue.message}`);
  }
  process.exit(1);
}

const total = result.data.ageGroups.reduce(
  (sum, group) => sum + group.recipes.length,
  0,
);
console.log(
  `Validated ${result.data.ageGroups.length} age groups, ${total} recipes.`,
);
