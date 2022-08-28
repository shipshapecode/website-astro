import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
export default defineConfig({
  site: 'https://shipshape.io/',
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

  experimental: {
    integrations: true
  },

  integrations: [astroImageTools]
});
