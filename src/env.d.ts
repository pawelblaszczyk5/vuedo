/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

// Theoritically it's not required, but I need it for ESLint
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
