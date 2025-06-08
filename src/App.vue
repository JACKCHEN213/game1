<script lang="ts" setup>
import Map from './components/Map.vue'
</script>

<template>
  <Map
    map-url="src/assets/map/map1.png"
    :map-width="404"
    :map-height="386"
    :map-offset-x="1"
    :map-offset-y="0"
  />
</template>

<style scoped>
.wrapper {
  position: relative;
}
</style>
