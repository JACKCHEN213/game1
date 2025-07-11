<script lang="ts" setup>
  import Cursor from './Cursor.vue';
  import Human from './Human.vue';
  import { ref } from 'vue';
  import { useGridMovement } from '@/hooks/useGridMovement';
  import RouteGrid from './RouteGrid.vue';

  const { mapUrl, mapWidth, mapHeight, mapOffsetX, mapOffsetY } = defineProps({
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
  });

  const cursorX = ref(0);
  const cursorY = ref(0);
  const characterMove = ref<'stand' | 'up' | 'down' | 'left' | 'right'>('stand');
  const characterPositionIndex = ref(0);
  const gridElement = ref<HTMLElement | null>(null);
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE);
  useGridMovement(cursorX, cursorY, {
    step: cursorSize,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    elementRef: gridElement,
  });
</script>

<template>
  <div ref="gridElement" class="wrapper">
    <img :src="mapUrl" alt="map" :width="mapWidth" :height="mapHeight" />

    <RouteGrid />
    <RouteGrid :top="16" />
    <RouteGrid :top="32" />
    <RouteGrid :top="48" />
    <RouteGrid :top="64" />
    <RouteGrid :left="16" />
    <RouteGrid :top="16" :left="16" />
    <RouteGrid :top="32" :left="16" />
    <RouteGrid :top="48" :left="16" />
    <RouteGrid :top="32" :left="32" />

    <Cursor
      :x="cursorX"
      :y="cursorY"
      :size="cursorSize"
      :offset_x="mapOffsetX"
      :offset_y="mapOffsetY"
    />

    <Human :characterMove="characterMove" :characterPositionIndex="characterPositionIndex" />
  </div>
  <div>
    <select v-model="characterMove" name="switchMove">
      <option value="stand">站立</option>
      <option value="up">上</option>
      <option value="down">下</option>
      <option value="left">左</option>
      <option value="right">右</option>
    </select>
    <select v-model.number="characterPositionIndex" name="switchPositionIndex">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  </div>
</template>

<style scoped>
  .wrapper {
    position: relative;
    transform-origin: top left;
  }

  select:not(:last-child) {
    margin-right: 10px;
    font-size: 12px;
  }
</style>
