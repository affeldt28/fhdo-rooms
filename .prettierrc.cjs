/** @type {import('@types/prettier').Config} */
module.exports = {
	semi: true,
	singleQuote: true,
	quoteProps: "as-needed",
	jsxSingleQuote: false,
	trailingComma: "all",
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: "always",
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	vueIndentScriptAndStyle: false,
	embeddedLanguageFormatting: "auto",
	singleAttributePerLine: false,

	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],

	// @trivago/prettier-plugin-sort-imports
	importOrder: ["^@(.*)$", "^~/(.*)$", "^[./]"],
	importOrderSeparation: true,

	// prettier-plugin-tailwindcss
	tailwindConfig: "./tailwind.config.cts",
};
