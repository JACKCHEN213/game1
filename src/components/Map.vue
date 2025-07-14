<script lang="ts" setup>
  import Cursor from './Cursor.vue';
  import Human from './Human.vue';
  import { ref } from 'vue';
  import { useGridMovement } from '@/hooks/useGridMovement';
  import { useHumanStore } from '@/stores/human';
  import MoveGrid from './MoveGrid.vue';
  import { GridColor } from '@/types/GRID';

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
  const humanState = useHumanStore();
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

    <div id="moveGrid" class="moveGrid">
      <MoveGrid v-show="humanState.select_human_flag" />
      <MoveGrid v-show="humanState.select_human_flag" :top="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="32" />
      <MoveGrid v-show="humanState.select_human_flag" :top="48" />
      <MoveGrid v-show="humanState.select_human_flag" :top="64" />
      <MoveGrid v-show="humanState.select_human_flag" :top="80" />
      <MoveGrid v-show="humanState.select_human_flag" :left="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="16" :left="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="32" :left="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="48" :left="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="64" :left="16" />
      <MoveGrid v-show="humanState.select_human_flag" :top="32" :left="32" />
      <MoveGrid v-show="humanState.select_human_flag" :top="48" :left="32" />
      <MoveGrid v-show="humanState.select_human_flag" :top="32" :left="48" />
      <MoveGrid v-show="humanState.select_human_flag" :left="32" :color="GridColor.ATTACK" />
      <MoveGrid v-show="humanState.select_human_flag" :left="48" :color="GridColor.ATTACK" />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="16"
        :left="32"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="16"
        :left="48"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="32"
        :left="64"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="32"
        :left="80"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="48"
        :left="48"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="48"
        :left="64"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="64"
        :left="32"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="64"
        :left="48"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="80"
        :left="16"
        :color="GridColor.ATTACK"
      />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="80"
        :left="32"
        :color="GridColor.ATTACK"
      />
      <MoveGrid v-show="humanState.select_human_flag" :top="96" :color="GridColor.ATTACK" />
      <MoveGrid
        v-show="humanState.select_human_flag"
        :top="96"
        :left="16"
        :color="GridColor.ATTACK"
      />
      <MoveGrid v-show="humanState.select_human_flag" :top="112" :color="GridColor.ATTACK" />
    </div>

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
