import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';

class ForestTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Forest, '森林', {
      movementCost: 2,
      defenseBonus: 2,
      evadeBonus: 20,
      ...options,
    });
  }
}

export default ForestTile;
