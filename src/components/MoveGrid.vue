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

  const moveGridElement = ref();
  const GRID_SIZE: number = parseInt(import.meta.env.VITE_GRID_SIZE);

  onMounted(() => {
    moveGridElement.value.style['background-color'] = color;
    moveGridElement.value.style['opacity'] = '0.5';
    moveGridElement.value.style['top'] = `${top + 0.5}px`;
    moveGridElement.value.style['left'] = `${left + 0.5}px`;
    moveGridElement.value.style['bottom'] = `${bottom}px`;
    moveGridElement.value.style['right'] = `${right}px`;
  });
</script>
<template>
  <div
    ref="moveGridElement"
    class="moveGrid"
    :style="{
      width: GRID_SIZE - 1 + 'px',
      height: GRID_SIZE - 1 + 'px',
    }"
  />
</template>

<style scoped>
  .moveGrid {
    position: absolute;
    z-index: var(--z-index-map-move-grid);
  }
</style>
