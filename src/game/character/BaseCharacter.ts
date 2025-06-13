import { CharacterType, type ICharacter } from '@/types/character';
import { SkillType } from '@/types/skill';
import { ItemType } from '@/types/item';

class BaseCharacter implements ICharacter {
  id: number;
  type: CharacterType;
  name: string;
  experience: number;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
  };
  movementRange: number;
  movementCostModifiers: { terrain: TerrainType; additive?: number }[];
  skills: SkillType[];
  items: ItemType[];

  private _level: number = 1;

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = Math.max(1, Math.min(20, value)); // 强制限制在1-20
  }

  constructor(id: number, name: string, type: CharacterType, options?: Partial<ICharacter>) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.level = options?.level ?? 1;
    this.experience = options?.experience ?? 0;
    this.stats = options?.stats ?? {
      hp: 100,
      atk: 10,
      def: 10,
      spd: 10,
    };
    this.movementRange = options?.movementRange ?? 1;
    this.movementCostModifiers = options?.movementCostModifiers ?? [];
    this.skills = options?.skills ?? [];
    this.items = options?.items ?? [];
  }
}

export default BaseCharacter;
