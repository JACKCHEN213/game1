import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';
import { CharacterType } from '@/types/character';

class SeaTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Sea, '深海', {
      movementCost: 1,
      allowedCharacterTypes: [
        CharacterType.PegasusKnight,
        CharacterType.WyvernKnight,
        CharacterType.DragonRider,
        CharacterType.FalconKnight,
      ],
      ...options, // 允许覆盖
    });
  }
}

export default SeaTile;
