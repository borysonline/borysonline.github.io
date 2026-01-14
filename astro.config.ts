import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://borysonline.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/feed.xml'),
      customPages: [],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  output: 'static',
  vite: {
    build: {
      minify: 'terser',
    },
  },
});
