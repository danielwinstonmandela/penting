"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  OctagonAlert,
} from "lucide-react";

import type { GrowthResult, StatusTone } from "@/lib/growth-calculator";
import type { NutritionTarget } from "@/lib/nutrition-targets";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

function toneClasses(tone: StatusTone) {
  switch (tone) {
    case "urgent":
      return "border-urgent/40 bg-urgent/8 text-urgent";
    case "attention":
      return "border-attention/40 bg-attention/8 text-attention";
    case "ok":
      return "border-ok/40 bg-ok/10 text-ok";
    default:
      return "border-border bg-muted text-neutral-status";
  }
}

function StatusIcon({ tone }: { tone: StatusTone }) {
  if (tone === "urgent") return <OctagonAlert className="size-6 shrink-0" aria-hidden />;
  if (tone === "attention")
    return <AlertTriangle className="size-6 shrink-0" aria-hidden />;
  if (tone === "ok") return <CheckCircle2 className="size-6 shrink-0" aria-hidden />;
  return <Info className="size-6 shrink-0" aria-hidden />;
}

type Props = {
  result: GrowthResult;
  targets: NutritionTarget;
};

export function ResultCard({ result, targets }: Props) {
  const secondary =
    result.primarySource === "hfa" ? result.wfa : result.hfa;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="grid gap-4"
      aria-live="polite"
    >
      <div
        className={cn(
          "rounded-2xl border-2 p-4",
          toneClasses(result.primary.tone),
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
          {strings.resultTitle}
        </p>
        <div className="mt-2 flex items-start gap-3">
          <StatusIcon tone={result.primary.tone} />
          <div>
            <h2 className="font-display text-xl font-semibold leading-snug text-current">
              {result.primary.label}
            </h2>
            <p className="mt-1 text-sm opacity-90">
              {result.primarySource === "hfa"
                ? strings.hfaLabel
                : strings.wfaLabel}
              {" · utama"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="grid gap-1">
          <p className="text-sm font-medium text-muted-foreground">
            {strings.hfaLabel}
          </p>
          <p
            className={cn(
              "text-sm font-semibold",
              result.primarySource === "hfa" && "text-foreground",
            )}
          >
            {result.hfa.label}
          </p>
        </div>
        <div className="grid gap-1 border-t border-border pt-3">
          <p className="text-sm font-medium text-muted-foreground">
            {strings.wfaLabel}
          </p>
          <p
            className={cn(
              "text-sm font-semibold",
              result.primarySource === "wfa" && "text-foreground",
            )}
          >
            {result.wfa.label}
          </p>
        </div>

        <details className="border-t border-border pt-3">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
            {strings.zScoreDetail}
          </summary>
          <dl className="mt-2 grid gap-1 text-sm">
            <div className="flex justify-between gap-3">
              <dt>HFA</dt>
              <dd className="font-mono">{result.hfa.zScore.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>WFA</dt>
              <dd className="font-mono">{result.wfa.zScore.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between gap-3 text-muted-foreground">
              <dt>Status sekunder</dt>
              <dd>{secondary.label}</dd>
            </div>
          </dl>
        </details>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-lg font-semibold">
          {strings.resultTargetsTitle}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{targets.bandLabel}</p>
        {targets.energyKkal === 0 ? (
          <p className="mt-3 text-sm leading-relaxed">
            {strings.mpasiTooYoung}
          </p>
        ) : (
          <ul className="mt-3 grid grid-cols-3 gap-2">
            <li className="rounded-xl bg-secondary px-2 py-3 text-center">
              <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                {strings.energyLabel}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {targets.energyKkal} {strings.unitKkal}
              </p>
            </li>
            <li className="rounded-xl bg-secondary px-2 py-3 text-center">
              <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                {strings.proteinLabel}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {targets.proteinG} {strings.unitGram}
              </p>
            </li>
            <li className="rounded-xl bg-secondary px-2 py-3 text-center">
              <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                {strings.fatLabel}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {targets.fatG} {strings.unitGram}
              </p>
            </li>
          </ul>
        )}
      </div>
    </motion.section>
  );
}
