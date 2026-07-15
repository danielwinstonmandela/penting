export interface RecipeSeedData {
  ageGroups: AgeGroup[];
}

export interface AgeGroup {
  ageGroup: string; // URL slug, e.g. "6-8-bulan"
  label: string; // Display label, e.g. "6 - 8 BULAN"
  recipes: Recipe[];
}

export interface Recipe {
  id: string;
  title: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
  fruit?: string;
  notes?: string;
}

export interface Nutrition {
  energy: string;
  protein: string;
  fat: string;
}
