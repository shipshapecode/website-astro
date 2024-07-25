import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { addAuthorRemarkPlugin } from './add-author-remark-plugin.mjs';
import { addDescriptionRemarkPlugin } from './add-description-remark-plugin.mjs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shipshape.io/',
  integrations: [
    solid(),
    sitemap(),
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false
    })
  ],
  markdown: {
    remarkPlugins: [
      'remark-gfm',
      'remark-smartypants',
      addAuthorRemarkPlugin,
      addDescriptionRemarkPlugin
    ],
    shikiConfig: {
      theme: 'nord',
      wrap: true
    }
  },
  prefetch: true,
  vite: {
    plugins: [
      {
        name: 'import.meta.url-transformer',
        transform: (code, id) => {
          if (id.endsWith('.astro'))
            return code.replace(/import.meta.url/g, `"${id}"`);
        }
      }
    ],
    ssr: {
      external: ['svgo']
    }
  },
});
