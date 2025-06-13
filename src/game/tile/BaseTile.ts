import { SkillType } from '@/types/skill';
import { ItemType } from '@/types/item';
import { CharacterType } from '@/types/character';
import { type ITile, TerrainType } from '@/types/tile';

class BaseTile implements ITile {
  type: TerrainType;
  name: string;
  movementCost: number;
  defenseBonus: number;
  evadeBonus: number;
  attackBonus: number;
  accuracyBonus: number;
  healthPerRoundBonus: number;
  healthPerRoundCost: number;
  forbiddenCharacterTypes: CharacterType[];
  allowedCharacterTypes: CharacterType[];
  accessExceptions: {
    requiredSkill?: SkillType; // 需要技能
    requiredItem?: ItemType; // 需要道具
    overrideForbidden: boolean; // 是否覆盖基础禁止规则
  }[];

  constructor(type: TerrainType, name: string, options?: Partial<ITile>) {
    this.type = type;
    this.name = name;
    this.movementCost = options?.movementCost ?? 1; // 默认值
    this.defenseBonus = options?.defenseBonus ?? 0;
    this.evadeBonus = options?.evadeBonus ?? 0;
    this.attackBonus = options?.attackBonus ?? 0;
    this.accuracyBonus = options?.accuracyBonus ?? 0;
    this.healthPerRoundBonus = options?.healthPerRoundBonus ?? 0;
    this.healthPerRoundCost = options?.healthPerRoundCost ?? 0;
    this.forbiddenCharacterTypes = options?.forbiddenCharacterTypes ?? [];
    this.allowedCharacterTypes = options?.allowedCharacterTypes ?? [];
    this.accessExceptions = options?.accessExceptions ?? [];
  }
}
export default BaseTile;
