<script lang="ts">
  const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right', 'stand'] as const;
</script>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Archer from '@/game/character/Archer';
  import { useHumanStore } from '@/stores/human';

  const characterMove = defineModel('characterMove', {
    type: String,
    default: 'stand',
    validator: (value) => {
      return MOVE_DIRECTIONS.includes(value as (typeof MOVE_DIRECTIONS)[number]);
    },
  });
  const characterPositionIndex = defineModel('characterPositionIndex', {
    type: Number,
    default: 0,
  });

  // 计算背景位置
  const backgroundPosition = computed(() => {
    const position =
      archerObj.spriteDefine.move[characterMove.value as (typeof MOVE_DIRECTIONS)[number]][
        characterPositionIndex.value
      ];
    return `${position.x}px ${position.y}px`;
  });

  // 计算背景大小
  const backgroundSize = computed(() => {
    const { width, height, scale } = archerObj.spriteDefine.move.size;
    return `${Math.ceil(width * scale)}px ${Math.ceil(height * scale)}px`;
  });

  const humanElement = ref();
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE);
  const archerObj = new Archer();
  const humanState = useHumanStore();

  function humanClick() {
    if (humanState.select_human_flag) {
      humanState.select_human_flag = false;
    } else {
      humanState.select_human_flag = true;
    }
  }
</script>

<template>
  <div
    ref="humanElement"
    class="human"
    :style="{
      'background-image': `url('${archerObj.characterImageUrl}')`,
      'background-position': backgroundPosition,
      'background-size': backgroundSize,
      width: `${cursorSize}px`,
      height: `${cursorSize}px`,
    }"
    @click="humanClick"
  />
</template>

<style scoped>
  .human {
    position: absolute;
    top: 0;
    border: 1px solid yellow;
    image-rendering: pixelated;
  }
</style>
