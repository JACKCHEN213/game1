import { onMounted, onUnmounted, type Ref } from 'vue';
import { useRelativePosition } from '@/hooks/useRelativePosition';
const GRID_SIZE: number = parseInt(import.meta.env.VITE_GRID_SIZE);

const VITE_ENABLE_MOUSE: boolean = parseInt(import.meta.env.VITE_ENABLE_MOUSE) === 1;

export function useMouseGridMovement(
  cursorX: Ref<number>,
  cursorY: Ref<number>,
  options: {
    mapWidth: number;
    mapHeight: number;
    elementRef: Ref<HTMLElement | null>;
  },
) {
  const moveInterval = 50;
  let moveTimer: number | null = null;
  let targetX = cursorX.value;
  let targetY = cursorY.value;

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
      cursorX.value += Math.sign(dx) * GRID_SIZE;
      if (Math.abs(dx) < GRID_SIZE) cursorX.value = targetX;
    }
    if (dy !== 0) {
      cursorY.value += Math.sign(dy) * GRID_SIZE;
      if (Math.abs(dy) < GRID_SIZE) cursorY.value = targetY;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!options.elementRef.value) return;
    const relativePosition = useRelativePosition(
      e.clientX,
      e.clientY,
      options.elementRef.value.getBoundingClientRect(),
      GRID_SIZE,
    );
    targetX = relativePosition.x;
    targetY = relativePosition.y;

    if (!moveTimer) {
      moveTimer = window.setInterval(moveTowardsTarget, moveInterval);
    }
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
