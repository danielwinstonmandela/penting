import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppShell } from "@/components/app-shell";
import { BottomNav } from "@/components/bottom-nav";
import { strings } from "@/lib/strings";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${strings.appName} — ${strings.appFullName}`,
    template: `%s · ${strings.appName}`,
  },
  description: strings.tagline,
  applicationName: strings.appNameWithFull,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: strings.appName,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: strings.appNameWithFull,
    title: `${strings.appName} — ${strings.appFullName}`,
    description: strings.tagline,
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: strings.appName,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
        <BottomNav />
      </body>
    </html>
  );
}
