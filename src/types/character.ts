import { SkillType } from './skill';

enum CharacterType {
  // 基础职业
  Lord = 'lord', // 领主
  Archer = 'archer', // 弓箭手
  Thief = 'thief', // 盗贼
  Dancer = 'dancer', // 舞者
  Songstress = 'songstress', // 歌姬
  Fighter = 'fighter', // 战士
  Swordsman = 'swordsman', // 剑士
  Mercenary = 'mercenary', // 佣兵
  Brigand = 'brigand', // 山贼
  Pirate = 'pirate', // 海盗
  Monk = 'monk', // 修道士
  Priest = 'priest', // 修女
  Mage = 'mage', // 魔道士
  Wizard = 'wizard', // 巫师
  Knight = 'knight', // 骑士
  JungleKnight = 'jungle_knight', // 丛林骑士
  LightCavalry = 'light_cavalry', // 轻骑兵
  HeavyCavalry = 'heavy_cavalry', // 重骑兵
  PegasusKnight = 'pegasus_knight', // 天马骑士
  WyvernKnight = 'wyvern_knight', // 飞龙骑士
  SupplyTeam = 'supply_team', // 输送队
  // 上级职业
  GreatLord = 'great_lord', // 大领主
  Hero = 'hero', // 勇者
  Rogue = 'rogue', // 盗贼
  Paladin = 'paladin', // 圣骑士
  Assassin = 'assassin', // 暗杀者
  SwordMaster = 'sword_master', // 剑圣
  Berserker = 'berserker', // 狂战士
  Sniper = 'sniper', // 狙击手
  General = 'general', // 将军
  GreatKnight = 'great_knight', // 大骑士
  DragonRider = 'dragon_rider', // 龙骑将
  FalconKnight = 'falcon_knight', // 隼骑士
  Bishop = 'bishop', // 主教
  Sage = 'sage', // 贤者
  Druid = 'druid', // 德鲁伊
  Valkyrie = 'valkyrie', //  女武神
  MageKnight = 'mage_knight', // 法师骑士
  Carriage = 'carriage', // 马车
  Warrior = 'warrior', // 勇士
}

interface IMove {
  up: spritePosition[];
  down: spritePosition[];
  left: spritePosition[];
  right: spritePosition[];
  stand: spritePosition[];
  size: {
    width: number;
    height: number;
    scale: number;
  };
}

interface IStat {
  health: number; // 生命值
  strength: number; // 力量
  magic: number; // 魔力
  speed: number; // 速度
  technology: number; // 技术
  defense: number; // 防御力
  magicDefense: number; // 魔防
  luck: number; // 幸运
  physique: number; // 体格
  movementRange: number; // 移动范围
}

interface spritePosition {
  x: number;
  y: number;
}

interface ICharacter {
  id: string; // 角色ID
  type: CharacterType; // 角色类型
  name: string; // 角色名称
  level: number; // 角色等级
  experience: number; // 角色经验

  attackPoint: number; // 攻击点

  baseStats: IStat; // 基础属性

  maxStats: IStat; // 最大属性
  growthRates: IStat; // 成长属性

  characterImageUrl: string; // 角色形象
  spriteDefine: {
    // 移动动画
    move: IMove;
    attack: object;
  };
  characterPortraitUrl: string; // 角色立绘

  currentSpritePosition: spritePosition;

  // 角色修正
  movementCostModifiers: {
    // 地形移动成本修正
    terrain: TerrainType; // 地形类型
    additive?: number; // 加减修正
  }[];
  // 其他角色属性...
  skills: SkillType[]; // 技能列表
}

export { CharacterType, type ICharacter, type IStat, type spritePosition, type IMove };
