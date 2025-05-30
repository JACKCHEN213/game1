<script lang="ts" setup>
import Cursor from './Cursor.vue'
import {ref, onUnmounted} from 'vue'

let parentProps = defineProps({
    map_url: {
        type: String,
        required: true,
    },
    map_width: {
        type: Number,
        required: true,
    },
    map_height: {
        type: Number,
        required: true,
    },
    map_offset_x: {
        type: Number,
        default: 0,
    },
    map_offset_y: {
        type: Number,
        default: 0,
    }
});

let cursorX = ref(0);
let cursorY = ref(0);
let cursorSize = 16;

function setCursorPosition(ev) {
    if (ev.key === 'ArrowUp') {
    cursorY.value -= cursorSize;
    if (cursorY.value < 0) {
      cursorY.value = 0;
    }
  } else if (ev.key === 'ArrowDown') {
    cursorY.value += cursorSize;
    if (cursorY.value > parentProps.map_height - cursorSize) {
      cursorY.value = parentProps.map_height - cursorSize;
    }
  } else if (ev.key === 'ArrowLeft') {
    cursorX.value -= cursorSize;
    if (cursorX.value < 0) {
      cursorX.value = 0;
    }
  } else if (ev.key === 'ArrowRight') {
    cursorX.value += cursorSize;
    if (cursorX.value > parentProps.map_width - cursorSize) {
      cursorX.value = parentProps.map_width - cursorSize;
    }
  }
}

window.addEventListener('keyup', setCursorPosition);

onUnmounted(() => {
  window.removeEventListener('keyup', setCursorPosition);
});

</script>

<template>
  <div class="wrapper">
    <img :src="map_url" alt="map" :width="map_width" :height="map_height">

    <Cursor :x=cursorX :y=cursorY :size="cursorSize" :offset_x="map_offset_x" :offset_y="map_offset_y" />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}
</style>
