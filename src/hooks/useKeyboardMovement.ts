import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const MOVE_INTERVAL = 100; // 可以根据需要调整

export function useKeyboardMovement(
  cursorX: Ref,
  cursorY: Ref,
  options: {
    step: number;
    mapWidth: number;
    mapHeight: number;
  },
) {
  // const cursorX = ref(initialX);
  // const cursorY = ref(initialY);
  const activeKeys = ref(new Set<string>());
  let moveTimer: number | null = null;

  const setCursorPosition = (ev: KeyboardEvent) => {
    if (ev.key === 'ArrowUp') {
      cursorY.value -= options.step;
      if (cursorY.value < 0) {
        cursorY.value = 0;
      }
    } else if (ev.key === 'ArrowDown') {
      cursorY.value += options.step;
      if (cursorY.value > options.mapHeight - options.step) {
        cursorY.value = options.mapHeight - options.step;
      }
    } else if (ev.key === 'ArrowLeft') {
      cursorX.value -= options.step;
      if (cursorX.value < 0) {
        cursorX.value = 0;
      }
    } else if (ev.key === 'ArrowRight') {
      cursorX.value += options.step;
      if (cursorX.value > options.mapWidth - options.step) {
        cursorX.value = options.mapWidth - options.step;
      }
    }
  };

  const handleKeyDown = (ev: KeyboardEvent) => {
    // 只处理方向键
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(ev.key)) {
      // 防止重复添加
      if (!activeKeys.value.has(ev.key)) {
        activeKeys.value.add(ev.key);
        // 第一次按下立即移动一次
        setCursorPosition(ev);
        // 如果还没有定时器，就创建一个
        if (!moveTimer) {
          moveTimer = window.setInterval(() => {
            // 遍历所有按下的方向键
            activeKeys.value.forEach((key: string) => {
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
  };

  const handleKeyUp = (ev: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(ev.key)) {
      activeKeys.value.delete(ev.key);
      // 如果没有按下的键了，清除定时器
      if (activeKeys.value.size === 0 && moveTimer) {
        clearInterval(moveTimer);
        moveTimer = null;
      }
    }
  };

  const setupListeners = () => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  };

  const cleanupListeners = () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (moveTimer) {
      clearInterval(moveTimer);
    }
  };

  onMounted(setupListeners);
  onUnmounted(cleanupListeners);
}
