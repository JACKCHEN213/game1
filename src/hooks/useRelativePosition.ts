import type { GridPosition } from '@/types/grid';

export function useRelativePosition(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  step: number,
): GridPosition {
  // 计算相对位置
  const relativeX = clientX - rect.left;
  const relativeY = clientY - rect.top;
  let targetX = Math.floor(relativeX / step) * step;
  let targetY = Math.floor(relativeY / step) * step;
  // 边界检查
  targetX = Math.max(0, Math.min(targetX, rect.width - step));
  targetY = Math.max(0, Math.min(targetY, rect.height - step));
  return {
    x: targetX,
    y: targetY,
  };
}
