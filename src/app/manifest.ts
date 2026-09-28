import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sora Project — Manajemen & Cost Control Kontraktor Interior",
    short_name: "Sora Project",
    description: "Enterprise Contractor Operations & Cost Control Dashboard",
    start_url: "/",
    display: "standalone",
    background_color: "#F1F5F9",
    theme_color: "#1C2434",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
