import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://borysonline.com',
  integrations: [],
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
