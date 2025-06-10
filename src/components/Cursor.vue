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
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
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
    }"
  />
</template>

<style scoped>
  #cursor {
    position: absolute;
    border: 1px solid red;
  }
</style>
