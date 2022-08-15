import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [vue({ reactivityTransform: true }), Icons({ compiler: 'vue3' })],
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('src', import.meta.url)),
		},
	},
});
