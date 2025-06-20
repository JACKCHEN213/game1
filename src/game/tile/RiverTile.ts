import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';
import { CharacterType } from '@/types/character';

class RiverTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.River, '河流', {
      movementCost: 1,
      allowedCharacterTypes: [
        CharacterType.Pirate,
        CharacterType.PegasusKnight,
        CharacterType.WyvernKnight,
        CharacterType.DragonRider,
        CharacterType.FalconKnight,
      ],
      ...options, // 允许覆盖
    });
  }
}

export default RiverTile;
