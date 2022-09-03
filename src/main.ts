import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '~/App.vue';

import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(autoAnimatePlugin);
app.mount('#app');
