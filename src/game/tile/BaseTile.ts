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
  }
}
export default BaseTile;
