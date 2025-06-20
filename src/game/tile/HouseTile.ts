import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';

class HouseTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.House, '房屋', {
      movementCost: 1,
      ...options, // 允许覆盖
    });
  }
}

export default HouseTile;
