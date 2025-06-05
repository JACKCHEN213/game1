<script lang="ts" setup>
import Cursor from './Cursor.vue'
import {ref, onUnmounted} from 'vue'

const parentProps = defineProps({
    mapUrl: {
        type: String,
        required: true
    },
    mapWidth: {
        type: Number,
        required: true
    },
    mapHeight: {
        type: Number,
        required: true
    },
    mapOffsetX: {
        type: Number,
        default: 0
    },
    mapOffsetY: {
        type: Number,
        default: 0
    }
})

const cursorX = ref(0)
const cursorY = ref(0)
const cursorSize = 16

function setCursorPosition(ev: KeyboardEvent) {
    if (ev.key === 'ArrowUp') {
        cursorY.value -= cursorSize
        if (cursorY.value < 0) {
            cursorY.value = 0
        }
    } else if (ev.key === 'ArrowDown') {
        cursorY.value += cursorSize
        if (cursorY.value > parentProps.mapHeight - cursorSize) {
            cursorY.value = parentProps.mapHeight - cursorSize
        }
    } else if (ev.key === 'ArrowLeft') {
        cursorX.value -= cursorSize
        if (cursorX.value < 0) {
            cursorX.value = 0
        }
    } else if (ev.key === 'ArrowRight') {
        cursorX.value += cursorSize
        if (cursorX.value > parentProps.mapWidth - cursorSize) {
            cursorX.value = parentProps.mapWidth - cursorSize
        }
    }
}

window.addEventListener('keyup', setCursorPosition)

onUnmounted(() => {
    window.removeEventListener('keyup', setCursorPosition)
})

</script>

<template>
  <div class="wrapper">
    <img
      :src="mapUrl"
      alt="map"
      :width="mapWidth"
      :height="mapHeight"
    />

    <Cursor
      :x="cursorX"
      :y="cursorY"
      :size="cursorSize"
      :offset_x="mapOffsetX"
      :offset_y="mapOffsetY"
    />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}
</style>
