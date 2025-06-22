import { CharacterType, type ICharacter } from '@/types/character';
import { SkillType } from '@/types/skill';
import { ItemType } from '@/types/item';

class BaseCharacter implements ICharacter {
  id: number = 0;
  type: CharacterType = CharacterType.Lord;
  name: string = '';
  level: number = 1;
  experience: number = 0;

  attack_point: number = 0;

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

  constructor(options: Partial<ICharacter>) {
    this.id = options.id ?? 0;
    this.type = options.type ?? CharacterType.Lord;
    this.name = options.name ?? '';
    this.level = options.level ?? 1;
    this.experience = options.experience ?? 0;

    this.attack_point = options.attack_point ?? 0;

    this.health = options.health ?? 0;
    this.strength = options.strength ?? 0;
    this.magic = options.magic ?? 0;
    this.speed = options.speed ?? 0;
    this.technology = options.technology ?? 0;
    this.defense = options.defense ?? 0;
    this.magic_defense = options.magic_defense ?? 0;
    this.luck = options.luck ?? 0;
    this.physique = options.physique ?? 0;
    this.movementRange = options.movementRange ?? 1;

    this.movementCostModifiers = options.movementCostModifiers ?? [];
    this.skills = options.skills ?? [];
    this.items = options.items ?? [];
  }
}

export default BaseCharacter;
