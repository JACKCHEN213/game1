<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const humanElement = ref();

  onMounted(() => {
    console.log(humanElement.value);
  });
</script>

<template>
  <div ref="humanElement" class="human" />
</template>

<style scoped>
  .human {
    position: absolute;
    top: 0;
    width: 16px;
    height: 16px;
    background-image: url('@/game/entities/Archer-move-1.png');
    background-position: 0 0;
  }
</style>
