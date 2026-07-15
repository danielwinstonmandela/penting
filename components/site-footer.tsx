import { PartnerLogoRow } from "@/components/brand-logos";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";

export function SiteFooter({
  tone = "light",
  logoSize = 40,
  className,
}: {
  tone?: "light" | "dark";
  logoSize?: number;
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <footer
      className={cn(
        "border-t pt-6 pb-2",
        isDark ? "border-white/15" : "border-border",
        className,
      )}
    >
      <PartnerLogoRow tone={tone} size={logoSize} className="mb-4" />
      <p
        className={cn(
          "text-center text-xs leading-relaxed",
          isDark ? "text-white/55" : "text-muted-foreground",
        )}
      >
        {strings.footerCredit}
      </p>
      <p
        className={cn(
          "mt-1 text-center text-[0.7rem] leading-relaxed",
          isDark ? "text-white/40" : "text-muted-foreground/80",
        )}
      >
        {strings.footerPartner}
      </p>
    </footer>
  );
}
