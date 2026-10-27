// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Replace with the real domain once deployed to Cloudflare Pages.
  site: 'https://praveenraj.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});
