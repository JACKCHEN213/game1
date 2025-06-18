import { CharacterType } from './character';
import { ItemType } from './item';
import { SkillType } from './skill';

enum TerrainType {
  Plain = 'plain',
  Forest = 'forest',
  Mountain = 'mountain',
  Water = 'water',
  Cliff = 'cliff',
  Peak = 'peak',
  Architecture = 'architecture',
}

interface ITile {
  type: TerrainType; // 地形类型
  name: string; // 地形名称
  movementCost: number; // 移动成本
  defenseBonus: number; // 防御加成
  evadeBonus: number; // 闪避加成
  attackBonus: number; // 攻击加成
  accuracyBonus: number; // 攻击准确性加成
  healthPerRoundBonus: number; // 每回合恢复生命值
  healthPerRoundCost: number; // 每回合消耗生命值
  forbiddenCharacterTypes: CharacterType[]; // 禁止进入的角色类型
  allowedCharacterTypes: CharacterType[]; // 允许进入的角色类型
  // 例外规则（拥有指定技能/道具可覆盖禁止）
  accessExceptions: {
    requiredSkill?: SkillType; // 需要技能
    requiredItem?: ItemType; // 需要道具
    overrideForbidden: boolean; // 是否覆盖基础禁止规则
  }[];
}

export { TerrainType, type ITile };
