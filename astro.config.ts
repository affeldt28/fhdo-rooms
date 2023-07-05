import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://rooms.affeldt.io",
	base: "/",
	output: "static",
	integrations: [
		tailwind({
			applyBaseStyles: true,
		}),
	],
});
