import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";

const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  randomUUID();

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  additionalPrecacheEntries: [
    { url: "/~offline", revision },
    { url: "/", revision },
    { url: "/kalkulator", revision },
    { url: "/panduan-mpasi", revision },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
