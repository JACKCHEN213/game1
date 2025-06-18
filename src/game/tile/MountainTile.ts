import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';

class MountainTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Mountain, '山地', {
      movementCost: 2,
      defenseBonus: 2,
      evadeBonus: 20,
      ...options, // 允许覆盖
    });
  }
}

export default MountainTile;
