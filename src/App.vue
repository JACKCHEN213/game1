<script lang="ts" setup>
  import Map from './components/Map.vue';
  import map01 from './game/map/map01';
</script>

<template>
  <div id="app" @contextmenu.prevent>
    <Map
      :map-url="map01.url"
      :map-width="map01.width"
      :map-height="map01.height"
      :map-offset-x="map01.offset_x"
      :map-offset-y="map01.offset_y"
    />
  </div>
</template>

<style scoped></style>
