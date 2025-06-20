import { CharacterType, type ICharacter } from '@/types/character';
import { SkillType } from '@/types/skill';
import { ItemType } from '@/types/item';

class BaseCharacter implements ICharacter {
  id: number = 0;
  type: CharacterType = CharacterType.Lord;
  name: string = '';
  level: number = 1;
  experience: number = 0;

  health: number = 0;
  strength: number = 0;
  magic: number = 0;
  speed: number = 0;
  technology: number = 0;
  defense: number = 0;
  magic_defense: number = 0;
  luck: number = 0;
  physique: number = 0;
  movementRange: number = 1;

  movementCostModifiers: { terrain: TerrainType; additive?: number }[] = [];
  skills: SkillType[] = [];
  items: ItemType[] = [];
}

export default BaseCharacter;
