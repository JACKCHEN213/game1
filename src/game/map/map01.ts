import { TerrainType } from '@/types/tile';
export default {
  width: 240,
  height: 160,
  scale: 4,
  offset_x: 1,
  offset_y: 0,
  tiles: [
    {
      x: 0,
      y: 0,
      terrain_type: TerrainType.Mountain,
    },
    {
      x: 1,
      y: 0,
      terrain: TerrainType.Mountain,
      movementCost: 2,
    },
  ],
};
