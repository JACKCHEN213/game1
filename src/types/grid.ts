enum GridColor {
  SELF = '#0000FF',
  FRIEND = '#00FF00',
  ENEMY = '#FFFF00',
  ATTACK = '#FF0000',
}

interface GridPosition {
  x: number;
  y: number;
}

export { GridColor, type GridPosition };
