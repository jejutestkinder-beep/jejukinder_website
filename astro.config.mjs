// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import netlify from '@astrojs/netlify'; // 1. Netlify는 사용하지 않으므로 주석 처리하거나 삭제하세요.
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://jejuwaldorf-kinder.com',
    output: 'server', // server로 사용하고 prerender 로 제어한대
    adapter: cloudflare({
        // 2. 이미지 처리 방식을 'passthrough'로 설정하여 빌드 속도를 대폭 높입니다.
        imageService: 'passthrough' 
    }),
    integrations: [
        tailwind(),
        icon({
            iconDir: 'src/assets/icons'
        }),
        sitemap()
    ],
});