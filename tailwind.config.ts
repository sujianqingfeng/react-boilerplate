import type { Config } from 'tailwindcss'

export default {
	darkMode: ['selector', '[data-mode="dark"]'],
	content: ['./src/**/*.{jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
