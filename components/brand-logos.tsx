import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO = {
  sarga: {
    src: "/visuals/logo_sarga_dharma.PNG",
    alt: "Logo Sarga Dharma",
  },
  kkn: {
    src: "/visuals/logo_kkn_ppm_ugm.PNG",
    alt: "Logo KKN-PPM UGM",
  },
  ugmLight: {
    src: "/visuals/logo_ugm_hitam.png",
    alt: "Logo Universitas Gadjah Mada",
  },
  ugmDark: {
    src: "/visuals/logo_ugm_putih.png",
    alt: "Logo Universitas Gadjah Mada",
  },
} as const;

type LogoMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function SargaLogo({ size = 40, className, priority }: LogoMarkProps) {
  return (
    <Image
      src={LOGO.sarga.src}
      alt={LOGO.sarga.alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}

export function KknLogo({ size = 40, className, priority }: LogoMarkProps) {
  return (
    <Image
      src={LOGO.kkn.src}
      alt={LOGO.kkn.alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}

export function UgmLogo({
  tone = "light",
  size = 40,
  className,
  priority,
}: LogoMarkProps & { tone?: "light" | "dark" }) {
  const logo = tone === "dark" ? LOGO.ugmDark : LOGO.ugmLight;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}

export function PartnerLogoRow({
  tone = "light",
  size = 44,
  className,
}: {
  tone?: "light" | "dark";
  size?: number;
  className?: string;
}) {
  const divider =
    tone === "dark" ? "bg-white/25" : "bg-foreground/15";

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 sm:gap-4",
        className,
      )}
      role="group"
      aria-label="Mitra penyelenggara"
    >
      <SargaLogo size={size} />
      <span className={cn("h-8 w-px shrink-0", divider)} aria-hidden />
      <KknLogo size={size} />
      <span className={cn("h-8 w-px shrink-0", divider)} aria-hidden />
      <UgmLogo tone={tone} size={size} />
    </div>
  );
}
