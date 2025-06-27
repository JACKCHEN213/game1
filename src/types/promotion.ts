import { CharacterType, type IStat } from './character';
import { type IUnit } from './unit';

const PROMOTION_PATHS: Record<CharacterType, CharacterType[]> = {
  [CharacterType.Swordsman]: [CharacterType.SwordMaster, CharacterType.Assassin],
  [CharacterType.Lord]: [CharacterType.GreatLord],
  [CharacterType.Archer]: [],
  [CharacterType.Thief]: [],
  [CharacterType.Dancer]: [],
  [CharacterType.Songstress]: [],
  [CharacterType.Fighter]: [],
  [CharacterType.Mercenary]: [],
  [CharacterType.Brigand]: [],
  [CharacterType.Pirate]: [],
  [CharacterType.Monk]: [],
  [CharacterType.Priest]: [],
  [CharacterType.Mage]: [],
  [CharacterType.Wizard]: [],
  [CharacterType.Knight]: [],
  [CharacterType.JungleKnight]: [],
  [CharacterType.LightCavalry]: [],
  [CharacterType.HeavyCavalry]: [],
  [CharacterType.PegasusKnight]: [],
  [CharacterType.WyvernKnight]: [],
  [CharacterType.SupplyTeam]: [],
  [CharacterType.GreatLord]: [],
  [CharacterType.Hero]: [],
  [CharacterType.Rogue]: [],
  [CharacterType.Paladin]: [],
  [CharacterType.Assassin]: [],
  [CharacterType.SwordMaster]: [],
  [CharacterType.Berserker]: [],
  [CharacterType.Sniper]: [],
  [CharacterType.General]: [],
  [CharacterType.GreatKnight]: [],
  [CharacterType.DragonRider]: [],
  [CharacterType.FalconKnight]: [],
  [CharacterType.Bishop]: [],
  [CharacterType.Sage]: [],
  [CharacterType.Druid]: [],
  [CharacterType.Valkyrie]: [],
  [CharacterType.MageKnight]: [],
  [CharacterType.Carriage]: [],
  [CharacterType.Warrior]: [],
};

function applyPromotionBonuses(stat: IStat, oldClass: CharacterType, newClass: CharacterType) {
  // TODO
  console.log(oldClass, newClass);
  return stat;
}

function promoteUnit(unit: IUnit, targetClass: CharacterType): boolean {
  const availablePromotions = PROMOTION_PATHS[unit.character.type];

  if (!availablePromotions.includes(targetClass)) {
    return false; // 不能晋升到该职业
  }

  const oldClass = unit.character.type;
  unit.character.type = targetClass;

  // 应用晋升属性加成
  unit.character.baseStats = applyPromotionBonuses(unit.character.baseStats, oldClass, targetClass);

  return true;
}

export { PROMOTION_PATHS, promoteUnit };
