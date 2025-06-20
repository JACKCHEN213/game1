import { onMounted, onUnmounted, type Ref } from 'vue';

const VITE_ENABLE_MOUSE: boolean = parseInt(import.meta.env.VITE_ENABLE_MOUSE) === 1;

export function useMouseGridMovement(
  cursorX: Ref<number>,
  cursorY: Ref<number>,
  options: {
    step: number;
    mapWidth: number;
    mapHeight: number;
    elementRef: Ref<HTMLElement | null>;
  },
) {
  const moveInterval = 50;
  let moveTimer: number | null = null;
  let targetX = cursorX.value;
  let targetY = cursorY.value;

  const snapToGrid = (value: number) => {
    return Math.floor(value / options.step) * options.step;
  };

  const setTargetPosition = (clientX: number, clientY: number) => {
    if (!options.elementRef.value) return;

    const rect = options.elementRef.value.getBoundingClientRect();

    // 考虑缩放因子计算相对位置
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    targetX = snapToGrid(relativeX);
    targetY = snapToGrid(relativeY);

    // 边界检查（使用原始尺寸，因为坐标已经过缩放调整）
    targetX = Math.max(0, Math.min(targetX, options.mapWidth - options.step));
    targetY = Math.max(0, Math.min(targetY, options.mapHeight - options.step));

    if (!moveTimer) {
      moveTimer = window.setInterval(moveTowardsTarget, moveInterval);
    }
  };

  const moveTowardsTarget = () => {
    const dx = targetX - cursorX.value;
    const dy = targetY - cursorY.value;

    if (dx === 0 && dy === 0) {
      if (moveTimer) {
        clearInterval(moveTimer);
        moveTimer = null;
      }
      return;
    }

    if (dx !== 0) {
      cursorX.value += Math.sign(dx) * options.step;
      if (Math.abs(dx) < options.step) cursorX.value = targetX;
    }
    if (dy !== 0) {
      cursorY.value += Math.sign(dy) * options.step;
      if (Math.abs(dy) < options.step) cursorY.value = targetY;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    setTargetPosition(e.clientX, e.clientY);
  };

  // 监听器设置和清理...
  if (VITE_ENABLE_MOUSE) {
    onMounted(() => {
      if (options.elementRef.value) {
        options.elementRef.value.addEventListener('mousemove', handleMouseMove);
      }
    });

    onUnmounted(() => {
      if (options.elementRef.value) {
        options.elementRef.value.removeEventListener('mousemove', handleMouseMove);
      }
      if (moveTimer) clearInterval(moveTimer);
    });
  }
}
