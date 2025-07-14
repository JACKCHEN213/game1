<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const { top, left, bottom, right, color } = defineProps({
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    right: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#0000FF',
    },
  });

  const routeElement = ref();
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE);

  onMounted(() => {
    routeElement.value.style['background-color'] = color;
    routeElement.value.style['opacity'] = '0.5';
    routeElement.value.style['top'] = `${top + 0.5}px`;
    routeElement.value.style['left'] = `${left + 0.5}px`;
    routeElement.value.style['bottom'] = `${bottom}px`;
    routeElement.value.style['right'] = `${right}px`;
  });
</script>
<template>
  <div
    ref="routeElement"
    class="route"
    :style="{
      width: cursorSize - 1 + 'px',
      height: cursorSize - 1 + 'px',
    }"
  />
</template>

<style scoped>
  .route {
    position: absolute;
  }
</style>
