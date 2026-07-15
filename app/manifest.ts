import type { MetadataRoute } from "next";

import { strings } from "@/lib/strings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${strings.appName} — ${strings.appFullName}`,
    short_name: strings.appName,
    description: strings.tagline,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#283618",
    lang: "id",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
