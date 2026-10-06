import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VERGELES",
    short_name: "VERGELES",
    description: "Современная мебель с доставкой по России и Европе",
    start_url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`,
    display: "browser",
    background_color: "#f5f3ef",
    theme_color: "#f5f3ef",
    icons: [{ src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
