import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next/image will serve AVIF (then WebP) when the browser supports it,
    // dramatically shrinking the large banner/cover PNGs.
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
};

export default nextConfig;
