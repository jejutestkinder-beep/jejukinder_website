// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://jejuwaldorf-kinder.com',
	integrations: [
        tailwind(),
        icon({
            iconDir: 'src/assets/icons'
        }),
        sitemap()
    ], 
    output: 'static', 
    adapter: cloudflare(),
});