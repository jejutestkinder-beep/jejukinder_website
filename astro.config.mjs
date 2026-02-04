// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import netlify from '@astrojs/netlify'; // 1. Netlify는 사용하지 않으므로 주석 처리하거나 삭제하세요.
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

const addTestimonialImageCaptions = () => {
    return (tree, file) => {
        const filePath = String(file?.path || '');
        if (!filePath.includes('/testimonial/')) return;

        const walk = (node) => {
            if (!node || !Array.isArray(node.children)) return;

            for (let i = 0; i < node.children.length; i += 1) {
                const child = node.children[i];

                if (child?.type === 'element' && child.tagName === 'img') {
                    const title = child.properties?.title;
                    if (typeof title === 'string' && title.trim()) {
                        node.children[i] = {
                            type: 'element',
                            tagName: 'figure',
                            properties: { className: ['captioned-image'] },
                            children: [
                                child,
                                {
                                    type: 'element',
                                    tagName: 'figcaption',
                                    properties: { className: ['image-caption'] },
                                    children: [{ type: 'text', value: title.trim() }]
                                }
                            ]
                        };
                    }
                } else {
                    walk(child);
                }
            }
        };

        walk(tree);
    };
};

// https://astro.build/config
export default defineConfig({
    site: 'https://jejuwaldorf-kinder.com',
    output: 'static',
    markdown: {
        rehypePlugins: [addTestimonialImageCaptions()]
    },
    integrations: [
        tailwind(),
        icon({
            iconDir: 'src/assets/icons'
        }),
        sitemap()
    ],
});