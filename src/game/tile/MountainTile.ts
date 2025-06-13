import BaseTile from './BaseTile';
import { TerrainType, type ITile } from '@/types/tile';
import { CharacterType } from '@/types/character';

class ForestTile extends BaseTile {
  constructor(options?: Partial<ITile>) {
    super(TerrainType.Mountain, '山地', {
      movementCost: 2,
      defenseBonus: 2,
      evadeBonus: 20,
      forbiddenCharacterTypes: [
        CharacterType.Warrior,
        CharacterType.Archer,
        CharacterType.Assassin,
        CharacterType.Wizard,
      ],
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

export default ForestTile;
