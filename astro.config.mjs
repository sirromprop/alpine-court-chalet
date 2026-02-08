// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  site: "https://alpinecourtchalet.com",
  output: "static",
  // Only use Cloudflare adapter in production builds
  ...(isProduction && { adapter: cloudflare() }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
