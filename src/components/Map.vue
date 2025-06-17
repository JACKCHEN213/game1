<script lang="ts" setup>
  import Cursor from './Cursor.vue';
  import { ref, onUnmounted, onMounted } from 'vue';

  const parentProps = defineProps({
    mapUrl: {
      type: String,
      required: true,
    },
    mapWidth: {
      type: Number,
      required: true,
    },
    mapHeight: {
      type: Number,
      required: true,
    },
    mapOffsetX: {
      type: Number,
      default: 0,
    },
    mapOffsetY: {
      type: Number,
      default: 0,
    },
    mapScale: {
      type: Number,
      default: 1,
    },
  });

  const cursorX = ref(0);
  const cursorY = ref(0);
  const cursorSize: number = parseInt(import.meta.env.VITE_GRID_SIZE);
  // 移动间隔时间(ms)
  const MOVE_INTERVAL: number = 100;
  // 存储当前按下的按键
  const activeKeys = new Set();
  // 移动定时器
  let moveTimer: number = 0;

  // 初始化事件监听
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  });

  // 清理事件监听
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    clearInterval(moveTimer);
  });

  function handleKeyDown(ev: KeyboardEvent) {
    // 只处理方向键
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(ev.key)) {
      // 防止重复添加
      if (!activeKeys.has(ev.key)) {
        activeKeys.add(ev.key);
        // 第一次按下立即移动一次
        setCursorPosition(ev);
        // 如果还没有定时器，就创建一个
        if (!moveTimer) {
          moveTimer = setInterval(() => {
            // 遍历所有按下的方向键
            activeKeys.forEach((key: any) => {
              // 创建一个模拟事件
              const simulatedEvent = new KeyboardEvent('keydown', { key });
              setCursorPosition(simulatedEvent);
            });
          }, MOVE_INTERVAL);
        }
      }
      // 阻止默认行为（如页面滚动）
      ev.preventDefault();
    }
  }

  function handleKeyUp(ev: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(ev.key)) {
      activeKeys.delete(ev.key);
      // 如果没有按下的键了，清除定时器
      if (activeKeys.size === 0 && moveTimer) {
        clearInterval(moveTimer);
        moveTimer = 0;
      }
    }
  }

  function setCursorPosition(ev: KeyboardEvent) {
    if (ev.key === 'ArrowUp') {
      cursorY.value -= cursorSize;
      if (cursorY.value < 0) {
        cursorY.value = 0;
      }
    } else if (ev.key === 'ArrowDown') {
      cursorY.value += cursorSize;
      if (cursorY.value > parentProps.mapHeight - cursorSize) {
        cursorY.value = parentProps.mapHeight - cursorSize;
      }
    } else if (ev.key === 'ArrowLeft') {
      cursorX.value -= cursorSize;
      if (cursorX.value < 0) {
        cursorX.value = 0;
      }
    } else if (ev.key === 'ArrowRight') {
      cursorX.value += cursorSize;
      if (cursorX.value > parentProps.mapWidth - cursorSize) {
        cursorX.value = parentProps.mapWidth - cursorSize;
      }
    }
  }
</script>

<template>
  <div class="wrapper">
    <img :src="mapUrl" alt="map" :width="mapWidth" :height="mapHeight" />

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
    transform: scale(v-bind('parentProps.mapScale'));
    transform-origin: top left;
  }
</style>
