import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eduardochamp1.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
