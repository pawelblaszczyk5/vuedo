/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@vue/eslint-config-typescript/recommended',
		'plugin:unicorn/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'@vue/eslint-config-prettier',
	],
	rules: {
		'@typescript-eslint/consistent-type-imports': 2,
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
		],
		'@typescript-eslint/array-type': ['error', { default: 'generic' }],
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: false }],
		'import/order': [
			'error',
			{
				groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
				'newlines-between': 'always',
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],
		'import/no-unresolved': ['error', { ignore: ['virtual:'] }],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['.*'],
						message: "Don't use relative imports",
					},
				],
			},
		],
		'unicorn/no-null': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/text-encoding-identifier-case': 'off',
		'unicorn/filename-case': 'off',
		'unicorn/expiring-todo-comments	': 'off',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-await-expression-member': 'off',
		'unicorn/no-nested-ternary': 'off',
		'unicorn/no-unreadable-array-destructuring': 'off',
		'unicorn/no-unreadable-iife': 'off',
		'unicorn/no-unsafe-regex': 'error',
		'unicorn/prefer-query-selector': 'off',
		'unicorn/prefer-type-error': 'off',
		'unicorn/prefer-top-level-await': 'off',
		'unicorn/no-keyword-prefix': 'off',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],
		'vue/padding-line-between-blocks': ['error', 'always'],
		'vue/no-setup-props-destructure': 'off',
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	overrides: [
		{
			files: ['*.vue'],
			globals: {
				$ref: 'readonly',
				$computed: 'readonly',
				$shallowRef: 'readonly',
				$customRef: 'readonly',
				$toRef: 'readonly',
				$$: 'readonly',
				$: 'readonly',
			},
		},
	],
};
