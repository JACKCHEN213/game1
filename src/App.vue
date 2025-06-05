<script lang="ts" setup>
import Map from './components/Map.vue'
</script>

<template>
  <Map
    map_url="src/assets/map/map1.png"
    :map_width="404"
    :map_height="386"
    :map_offset_x="1"
    :map_offset_y="0"
  />
</template>

<style scoped>
.wrapper {
  position: relative;
}
</style>
