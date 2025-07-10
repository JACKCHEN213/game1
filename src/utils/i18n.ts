import { useI18n } from 'vue-i18n';

// 直接导出 t 函数
export default function $t(key: string) {
  const { t } = useI18n();
  return t(key);
}
