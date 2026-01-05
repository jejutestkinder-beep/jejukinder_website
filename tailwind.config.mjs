/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#10b981', // Main green
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				},
			},
			fontFamily: {
				heading: ['gaegu', 'cursive'], // h1, h2
				body: ['roboto', 'sans-serif'], // h3, p, body
			},
		},
	},
	plugins: [],
};

