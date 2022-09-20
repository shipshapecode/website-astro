import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';
import solid from '@astrojs/solid-js';
import tailwind from "@astrojs/tailwind";
import { addAuthorRemarkPlugin } from './add-author-remark-plugin.mjs';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: 'https://shipshape.io/',
  vite: {
    plugins: [{
      name: 'import.meta.url-transformer',
      transform: (code, id) => {
        if (id.endsWith('.astro')) return code.replace(/import.meta.url/g, `"${id}"`);
      }
    }],
    ssr: {
      external: ['svgo']
    }
  },
  experimental: {
    integrations: true
  },
  integrations: [astroImageTools, solid(), sitemap(), tailwind({
    // Example: Disable injecting a basic `base.css` import on every page.
    // Useful if you need to define and/or import your own custom `base.css`.
    config: { applyBaseStyles: false },
  })],
  markdown: {
    remarkPlugins: ['remark-gfm', 'remark-smartypants', addAuthorRemarkPlugin]
  }
});