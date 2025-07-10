import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn', // 默认显示语言
  messages: {
    'zh-cn': zhCN,
  },
});

export default i18n;
