/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				custom: {
					brown: '#674949',
					bgPink: '#FFFAF8',
					lightPink: '#FFEEE8',
					lightYellow: '#FFFDF4',
					grey: '#D0CECE',
					darkGrey: '#6C6C6C',
					rose: '#C64444',
					green: '#227A71',
					white: '#FFFFFF',
					black: '#2B1111',
				},
			},
			fontFamily: {
				heading: ['gaegu', 'cursive'], // h1, h2
				body: ['roboto', 'sans-serif'], // h3, p, body
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-in-out forwards',
			},
		},
	},
	plugins: [],
};

