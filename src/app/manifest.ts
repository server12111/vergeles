import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VERGELES",
    short_name: "VERGELES",
    description: "Современная мебель с доставкой по России и Европе",
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ef",
    theme_color: "#f5f3ef",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
