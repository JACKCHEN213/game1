import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './locales';

/* 创建pinia */
const pinia = createPinia();
const app = createApp(App);

/* 使用插件 */
app.use(pinia);
app.use(i18n);

// 挂载全局 $t 方法
app.config.globalProperties.$t = i18n.global.t;

app.mount('#app');
