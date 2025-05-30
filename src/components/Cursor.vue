<script lang="ts" setup>
defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  offset_x: {
    type: Number,
    default: 0,
  },
  offset_y: {
    type: Number,
    default: 0,
  }
});
</script>

<template>
<div id="cursor" :style="{left: (x + offset_x) + 'px', top: (y + offset_y) + 'px', width: size + 'px', height: size + 'px'}"></div>
</template>

<style scoped>
#cursor {
  position: absolute;
  border: 1px solid red;
}
</style>