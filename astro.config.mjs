// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output deploys directly to Cloudflare Pages (build command `npm run build`,
// output directory `dist`). Interactivity is delivered via client-side Preact islands,
// so no SSR adapter is required. If you later add accounts / progress tracking, swap
// to the @astrojs/cloudflare adapter to unlock Workers, KV, and D1.
// https://docs.astro.build/en/guides/deploy/cloudflare/
export default defineConfig({
  site: 'https://swe-for-vibe-coders.pages.dev',
  integrations: [mdx(), preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
