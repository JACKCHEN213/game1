import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';

class PlainTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Plain, '平原', {
      movementCost: 1,
      ...options,
    });
  }
}

export default PlainTile;
