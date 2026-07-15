"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

export type AgeChip = {
  ageGroup: string;
  label: string;
};

type Props = {
  chips: AgeChip[];
  active?: string | null;
  mode?: "link" | "query";
};

export function AgeFilterChips({ chips, active = null, mode = "link" }: Props) {
  const router = useRouter();

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      <Chip
        label={strings.allAges}
        active={!active}
        href="/panduan-mpasi"
        onClick={
          mode === "query"
            ? () => router.replace("/panduan-mpasi", { scroll: false })
            : undefined
        }
      />
      {chips.map((chip) => (
        <Chip
          key={chip.ageGroup}
          label={chip.label}
          active={active === chip.ageGroup}
          href={`/panduan-mpasi/${chip.ageGroup}`}
          onClick={
            mode === "query"
              ? () =>
                  router.replace(`/panduan-mpasi/${chip.ageGroup}`, {
                    scroll: false,
                  })
              : undefined
          }
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  href,
  onClick,
}: {
  label: string;
  active: boolean;
  href: string;
  onClick?: () => void;
}) {
  const className = cn(
    "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition-colors",
    active
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground hover:bg-accent",
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
