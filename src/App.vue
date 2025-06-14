<script lang="ts" setup>
  import Map from './components/Map.vue';
</script>

<template>
  <Map
    map-url="src/game/map/map01-240x160.png"
    :map-width="240"
    :map-height="160"
    :map-offset-x="1"
    :map-offset-y="0"
  />
</template>

<style scoped>
  .wrapper {
    position: relative;
    transform: scale(2, 2);
    transform-origin: top left;
  }
</style>
