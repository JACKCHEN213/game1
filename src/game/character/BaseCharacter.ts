import { CharacterType, type ICharacter, type spritePosition } from '@/types/character';
import { SkillType } from '@/types/skill';
import { generateId } from '@/utils';

class BaseCharacter implements ICharacter {
  id: string = '';
  type: CharacterType = CharacterType.Lord;
  name: string = '';
  level: number = 1;
  experience: number = 0;

  attackPoint: number = 0;

  baseStats: {
    health: number;
    strength: number;
    magic: number;
    speed: number;
    technology: number;
    defense: number;
    magicDefense: number;
    luck: number;
    physique: number;
    movementRange: number;
  } = {
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
  };

  maxStats: {
    health: number;
    strength: number;
    magic: number;
    speed: number;
    technology: number;
    defense: number;
    magicDefense: number;
    luck: number;
    physique: number;
    movementRange: number;
  } = {
    health: 70,
    strength: 20,
    magic: 20,
    speed: 20,
    technology: 20,
    defense: 20,
    magicDefense: 20,
    luck: 30,
    physique: 20,
    movementRange: 5,
  };

  growthRates: {
    health: number;
    strength: number;
    magic: number;
    speed: number;
    technology: number;
    defense: number;
    magicDefense: number;
    luck: number;
    physique: number;
    movementRange: number;
  } = {
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
  };

  characterImageUrl: string = '';
  characterPortraitUrl: string = '';
  spriteDefine: {
    move: {
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
    };
    attack: object;
  } = {
    move: {
      up: [],
      down: [],
      left: [],
      right: [],
      stand: [],
      size: {
        width: 0,
        height: 0,
        scale: 1,
      },
    },
    attack: {},
  };

  currentSpritePosition: spritePosition;

  movementCostModifiers: { terrain: TerrainType; additive?: number }[] = [];
  skills: SkillType[] = [];

  constructor(options?: Partial<ICharacter>) {
    this.id = options?.id ?? generateId();
    this.type = options?.type ?? CharacterType.Lord;
    this.name = options?.name ?? '';
    this.level = options?.level ?? 1;
    this.experience = options?.experience ?? 0;

    this.attackPoint = options?.attackPoint ?? 0;

    this.baseStats = {
      health: options?.baseStats?.health ?? 70,
      strength: options?.baseStats?.strength ?? 0,
      magic: options?.baseStats?.magic ?? 0,
      speed: options?.baseStats?.speed ?? 0,
      technology: options?.baseStats?.technology ?? 0,
      defense: options?.baseStats?.defense ?? 0,
      magicDefense: options?.baseStats?.magicDefense ?? 0,
      luck: options?.baseStats?.luck ?? 0,
      physique: options?.baseStats?.physique ?? 0,
      movementRange: options?.baseStats?.movementRange ?? 1,
    };

    this.maxStats = {
      health: options?.maxStats?.health ?? 70,
      strength: options?.maxStats?.strength ?? 0,
      magic: options?.maxStats?.magic ?? 0,
      speed: options?.maxStats?.speed ?? 0,
      technology: options?.maxStats?.technology ?? 0,
      defense: options?.maxStats?.defense ?? 0,
      magicDefense: options?.maxStats?.magicDefense ?? 0,
      luck: options?.maxStats?.luck ?? 0,
      physique: options?.maxStats?.physique ?? 0,
      movementRange: options?.maxStats?.movementRange ?? 1,
    };

    this.characterImageUrl = options?.characterImageUrl ?? '';
    this.characterPortraitUrl = options?.characterPortraitUrl ?? '';
    this.spriteDefine = options?.spriteDefine ?? {
      move: {
        up: [],
        down: [],
        left: [],
        right: [],
        stand: [],
        size: {
          width: 0,
          height: 0,
          scale: 1,
        },
      },
      attack: {},
    };

    this.currentSpritePosition = options?.currentSpritePosition ?? { x: 0, y: 0 };

    this.movementCostModifiers = options?.movementCostModifiers ?? [];
    this.skills = options?.skills ?? [];
  }
}

export default BaseCharacter;
