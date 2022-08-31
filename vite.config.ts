import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { presetIcons, presetWind } from 'unocss';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		vue({ reactivityTransform: true }),
		Unocss({
			presets: [
				presetIcons({
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'middle',
					},
				}),
				presetWind(),
			],
		}),
	],
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('src', import.meta.url)),
		},
	},
});
