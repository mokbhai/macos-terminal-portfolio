// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

import node from '@astrojs/node';

export default defineConfig({
  // Replace with your website URL (required for sitemap generation)
  site: "https://mokshitjain.jainparichay.in",

  // URL configuration
  trailingSlash: "never", // Removes trailing slashes from URLs

  // Vite configuration
  vite: {
    plugins: [tailwindcss()],
  },

  // Required integrations
  integrations: [
    react(), // Enables React components
    sitemap({
      // Generates sitemap
      serialize: (item) => {
        const url = item.url.endsWith("/") ? item.url.slice(0, -1) : item.url;
        return { ...item, url };
      },
    }),
  ],

  // Deployment configuration
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  devToolbar: {
    enabled: false,
  },
});