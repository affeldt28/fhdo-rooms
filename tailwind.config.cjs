/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [],
	extend: {
		gridTemplateRows: {
			min: "min-content",
		},
		gridTemplateColumns: {
			auto: "repeat(auto-fit, minmax(20em, 1fr))",
		},
	},
};
