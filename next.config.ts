import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [60, 70, 75],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
