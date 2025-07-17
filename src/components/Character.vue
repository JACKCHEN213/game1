<script lang="ts">
  const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right', 'stand'] as const;
</script>

<script setup lang="ts">
  import { ref, computed, type Ref } from 'vue';
  import BaseCharacter from '@/game/character/BaseCharacter';

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
  const characterObj = defineModel('character', {
    type: BaseCharacter,
    validator: (value) => {
      return value instanceof BaseCharacter;
    },
  }) as Ref<BaseCharacter>;

  // 计算背景位置
  const backgroundPosition = computed(() => {
    const position =
      characterObj.value.spriteDefine.move[characterMove.value as (typeof MOVE_DIRECTIONS)[number]][
        characterPositionIndex.value
      ];
    return `${position.x}px ${position.y}px`;
  });

  // 计算背景大小
  const backgroundSize = computed(() => {
    const { width, height, scale } = characterObj.value.spriteDefine.move.size;
    return `${Math.ceil(width * scale)}px ${Math.ceil(height * scale)}px`;
  });

  const characterElement = ref();
  const GRID_SIZE: number = parseInt(import.meta.env.VITE_GRID_SIZE);
</script>

<template>
  <div
    ref="characterElement"
    class="character"
    :style="{
      'background-image': `url('${characterObj.characterImageUrl}')`,
      'background-position': backgroundPosition,
      'background-size': backgroundSize,
      width: `${GRID_SIZE}px`,
      height: `${GRID_SIZE}px`,
      top: `${characterObj.currentSpritePosition.y}px`,
      left: `${characterObj.currentSpritePosition.x}px`,
    }"
  />
</template>

<style scoped>
  .character {
    position: absolute;
    z-index: var(--z-index-map);
    top: 0;
    border: 1px solid yellow;
    image-rendering: pixelated;
  }
</style>
