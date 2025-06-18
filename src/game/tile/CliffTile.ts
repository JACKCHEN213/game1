import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';
import { CharacterType } from '@/types/character';

class CliffTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Cliff, '峭壁', {
      movementCost: 2,
      defenseBonus: 2,
      evadeBonus: 20,
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

export default CliffTile;
