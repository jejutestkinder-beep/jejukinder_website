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
        // 이미지 처리 방식을 기본값으로 두거나 필요한 설정을 따릅니다.
        platformProxy: {
            enabled: true
        }
    }),
    integrations: [
        tailwind(),
        icon({
            iconDir: 'src/assets/icons'
        }),
        sitemap()
    ],
});