import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>; locally the base path is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1600],
  },
  poweredByHeader: false,
};

export default nextConfig;
