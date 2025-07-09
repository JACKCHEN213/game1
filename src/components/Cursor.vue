<script lang="ts" setup>
  const { x, y, size, offsetX, offsetY, scale } = defineProps({
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
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 1,
    },
  });
</script>

<template>
  <div
    id="cursor"
    :style="{
      left: x + offsetX + 'px',
      top: y + offsetY + 'px',
      width: size + 'px',
      height: size + 'px',
      border: scale + 'px solid red',
    }"
  />
</template>

<style scoped>
  #cursor {
    position: absolute;
  }
</style>
