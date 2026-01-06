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
				custom: {
					brown: '#674949',
					'bg-pink': '#FFFAF8',
					'light-pink': '#FFEEE8',
					'light-yellow': '#FFFDF4',
					grey: '#D0CECE',
					'dark-grey': '#6C6C6C',
					rose: '#C64444',
					green: '#227A71',
					white: '#FFFFFF',
					black: '#000000',
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

