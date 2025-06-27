import { type ICharacter, type IStat } from './character';
import { ItemType } from './item';
import { SkillType } from './skill';
import { generateId, calculateBaseStats } from '@/utils';

interface IUnit {
  id: string;
  name: string;
  character: ICharacter;

  // 临时属性变化
  temporaryModifiers: {
    stat: keyof ICharacter['baseStats'];
    value: number;
    duration?: number; // 回合数，undefined表示永久
    source: string; // 修改来源
  }[];

  skills: SkillType[];
  items: ItemType[]; // 物品列表
  team: 'player' | 'enemy' | 'neutral'; // 所属队伍
}

function generateGenericEnemy(
  level: number,
  character: ICharacter,
  team: 'player' | 'enemy' | 'neutral',
): IUnit {
  const baseStats = calculateBaseStats(character, level);
  return {
    id: generateId(),
    name: character.name,
    character: {
      id: generateId(),
      type: character.type,
      name: character.name,
      level,
      experience: 0,
      attackPoint: 0,
      baseStats,
      maxStats: character.maxStats,
      growthRates: {
        health: 0,
        strength: 0,
        magic: 0,
        speed: 0,
        technology: 0,
        defense: 0,
        magicDefense: 0,
        luck: 0,
        physique: 0,
        movementRange: 0,
      },
      movementCostModifiers: [],
      skills: [],
    },

    temporaryModifiers: [],

    skills: [],
    items: [],
    team,
  };
}

function applyStatModifier(
  unit: IUnit,
  stat: keyof IStat,
  value: number,
  source: string,
  duration?: number,
) {
  unit.temporaryModifiers.push({ stat, value, duration, source });
  unit.character.baseStats[stat] += value;
}

function processEndOfTurn(unit: IUnit) {
  unit.temporaryModifiers = unit.temporaryModifiers.filter((mod) => {
    if (mod.duration === undefined) return true;
    mod.duration--;
    if (mod.duration <= 0) {
      unit.character.baseStats[mod.stat] -= mod.value;
      return false;
    }
    return true;
  });
}

export { type IUnit, generateGenericEnemy, applyStatModifier, processEndOfTurn };
