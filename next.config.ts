import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns: [
      {
        hostname: "exciting-monitor-649.convex.cloud",
      }
    ]
  }
};

export default nextConfig;
