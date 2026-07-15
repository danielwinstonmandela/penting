import { PageFrame } from "@/components/page-frame";
import { RecipeGuide } from "@/components/recipes/recipe-guide";
import { ageGroups } from "@/lib/data/recipes";
import { strings } from "@/lib/strings";

export const metadata = {
  title: strings.recipesTitle,
};

export default function PanduanMpasiPage() {
  return (
    <PageFrame width="wide">
      <RecipeGuide ageGroups={ageGroups} />
    </PageFrame>
  );
}
