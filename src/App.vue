<script lang="ts" setup>
  import Map from './components/Map.vue';
  import map01 from './game/map/map01';
</script>

<template>
  <Map
    :map-url="map01.url"
    :map-width="map01.width"
    :map-height="map01.height"
    :map-offset-x="map01.offset_x"
    :map-offset-y="map01.offset_y"
    :map-scale="map01.scale"
  />
</template>

<style scoped></style>
