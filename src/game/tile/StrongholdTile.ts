import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';

class StrongholdTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Architecture, '据点', {
      movementCost: 1,
      defenseBonus: 2,
      healthPerRoundBonus: 10,
      ...options, // 允许覆盖
    });
  }
}

export default StrongholdTile;
