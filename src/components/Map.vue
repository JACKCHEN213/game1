<script lang="ts" setup>
  import Cursor from './Cursor.vue';
  import { ref } from 'vue';
  import { useGridMovement } from '@/hooks/useGridMovement';

  const parentProps = defineProps({
    mapUrl: {
      type: String,
      required: true,
    },
    mapWidth: {
      type: Number,
      required: true,
    },
    mapHeight: {
      type: Number,
      required: true,
    },
    mapOffsetX: {
      type: Number,
      default: 0,
    },
    mapOffsetY: {
      type: Number,
      default: 0,
    },
    mapScale: {
      type: Number,
      default: 1,
    },
  });

  const cursorX = ref(0);
  const cursorY = ref(0);
  const gridElement = ref<HTMLElement | null>(null);
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE) * parentProps.mapScale;
  useGridMovement(cursorX, cursorY, {
    step: cursorSize,
    mapWidth: parentProps.mapWidth * parentProps.mapScale,
    mapHeight: parentProps.mapHeight * parentProps.mapScale,
    elementRef: gridElement,
  });
</script>

<template>
  <div ref="gridElement" class="wrapper">
    <img
      :src="mapUrl"
      alt="map"
      :width="mapWidth * parentProps.mapScale"
      :height="mapHeight * parentProps.mapScale"
    />

    <Cursor
      :x="cursorX"
      :y="cursorY"
      :size="cursorSize"
      :offset_x="mapOffsetX"
      :offset_y="mapOffsetY"
      :scale="parentProps.mapScale"
    />
  </div>
</template>

<style scoped>
  .wrapper {
    position: relative;

    /* transform: scale(v-bind('parentProps.mapScale')); */
    transform-origin: top left;
  }
</style>
