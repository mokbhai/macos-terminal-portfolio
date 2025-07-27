// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  // URL configuration
  trailingSlash: "never", // Removes trailing slashes from URLs
  host: "0.0.0.0",

  // Vite configuration
  vite: {
    plugins: [tailwindcss()],
  },

  // Required integrations
  integrations: [react()],

  // Deployment configuration
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: ({ command }) => ({
    host: "0.0.0.0",
    port: command === "dev" ? 4321 : 4321,
    allowedHosts: true,
  }),
  devToolbar: {
    enabled: false,
  },
});
