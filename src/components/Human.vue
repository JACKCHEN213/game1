<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Archer from '@/game/character/Archer';
  const humanElement = ref();
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE);
  const archerObj = new Archer();

  onMounted(() => {
    humanElement.value.style['width'] = `${cursorSize}px`;
    humanElement.value.style['height'] = `${cursorSize}px`;
    humanElement.value.style['background-image'] = `url('${archerObj.characterImageUrl}')`;
    const defaultPosition = archerObj.spriteDefine.move.left[0];
    humanElement.value.style['background-position'] =
      `${defaultPosition.x}px ${defaultPosition.y}px`;
  });
</script>

<template>
  <div ref="humanElement" class="human" />
</template>

<style scoped>
  .human {
    position: absolute;
    top: 0;
    border: 1px solid yellow;
  }
</style>
