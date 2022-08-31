module.exports = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	vueIndentScriptAndStyle: true,
	plugins: [require('prettier-plugin-tailwindcss')],
};
