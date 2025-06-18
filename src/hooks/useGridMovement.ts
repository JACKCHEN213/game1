import { type Ref } from 'vue';
import { useKeyboardMovement } from './useKeyboardMovement';
import { useMouseGridMovement } from './useMouseGridMovement';

export function useGridMovement(
  cursorX: Ref,
  cursorY: Ref,
  options: {
    step: number;
    mapWidth: number;
    mapHeight: number;
    elementRef?: Ref<HTMLElement | null>;
  },
) {
  useKeyboardMovement(cursorX, cursorY, options);
  options.elementRef
    ? useMouseGridMovement(cursorX, cursorY, {
        ...options,
        elementRef: options.elementRef,
      })
    : null;
}
