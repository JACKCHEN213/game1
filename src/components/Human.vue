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
    width: 30px;
    height: 40px;
    background-image: url('@/game/entities/t_sd_char_archer01.png');
    background-position: 0 0;
  }
</style>
