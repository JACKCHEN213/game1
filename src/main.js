import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

/* 创建pinia */
const pinia = createPinia();
const app = createApp(App);

/* 使用插件 */
app.use(pinia);

app.mount('#app');
