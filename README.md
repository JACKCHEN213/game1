# fire emblem

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Code Format

```sh
# eslint
yarn lint
# stylelint
yarn lint:css
# eslint + stylelint
yarn lint:all
```

### Version Control

```sh
# commit
yarn cz
```

## Project Code Config

### script setup edit sequence

```typescript
    // 📌 1. 类型定义
    <script setup lang="ts">
    interface Props {
      id: number;
      title?: string;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
      (e: 'update:title', value: string): void;
    }>();

    // 📌 2. 导入依赖
    import { ref, reactive, onMounted, onUnmounted } from 'vue';
    import { useFetch } from '@/composables/useFetch';

// 📌 3. 常量定义
    const API_URL = 'https://api.example.com';
    const MAX_ITEMS = 10;

// 📌 4. 响应式数据
    const count = ref(0);
    const state = reactive({
      list: [] as string[],
      loading: false,
    });
    const doubled = computed(() => count.value * 2);

// 📌 5. 自定义 Hooks
    const { data, error } = useFetch(API_URL);

// 📌 6. 函数定义
    function increment() {
      count.value++;
    }

    function handleSubmit() {
      state.loading = true;
      // ...调用 API
    }

// 📌 7. 生命周期钩子
    onMounted(() => {
      console.log('组件挂载');
      fetchData();
    });

    onUnmounted(() => {
      console.log('组件卸载');
      clearTimeout(timer);
    });

// 📌 8. 侦听器
    watch(count, (newVal) => {
      console.log('count 变化:', newVal);
    });

    watchEffect(() => {
      if (state.loading) {
        // ...副作用逻辑
      }
    });

// 📌 9. 暴露内容（可选）
    defineExpose({
      increment,
    });
</script>

```
