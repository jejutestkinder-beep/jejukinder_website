// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import netlify from '@astrojs/netlify'; // 1. Netlify는 사용하지 않으므로 주석 처리하거나 삭제하세요.
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://jejuwaldorf-kinder.com',
    output: 'static',
    integrations: [
        tailwind(),
        icon({
            iconDir: 'src/assets/icons'
        }),
        sitemap()
    ],
});