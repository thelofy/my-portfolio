import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        /**
         * Sanity CDN — used for all images uploaded through the Studio.
         * Pattern matches: https://cdn.sanity.io/images/<projectId>/...
         */
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
