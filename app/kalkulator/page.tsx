import { CalculatorView } from "@/components/calculator/calculator-view";
import { PageFrame } from "@/components/page-frame";
import { strings } from "@/lib/strings";

export const metadata = {
  title: strings.calculatorTitle,
};

export default function KalkulatorPage() {
  return (
    <PageFrame width="content">
      <CalculatorView />
    </PageFrame>
  );
}
