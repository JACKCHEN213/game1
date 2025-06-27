import { type ICharacter, type IStat } from '@/types/character';

/**
 * 生成一个包含时间编码的唯一 ID，格式为 10 字符 - 4 字符 - 4 字符 - 4 字符 - 10 字符，总长度 36
 * @returns 符合格式要求的唯一 ID
 */
function generateId() {
  // 获取当前时间戳并转换为 36 进制字符串
  const timestampPart = Date.now().toString(36);
  // 生成随机字符串
  const randomPart = Math.random().toString(36).substring(2);

  // 组合时间戳和随机字符串
  const combined = (timestampPart + randomPart).substring(0, 32);

  // 格式化字符串为 10-4-4-4-10 的格式
  const formattedId = `${combined.substring(0, 10)}-${combined.substring(10, 14)}-${combined.substring(14, 18)}-${combined.substring(18, 22)}-${combined.substring(22)}`;

  return formattedId;
}

function calculateBaseStats(character: ICharacter, level: number): IStat {
  const baseStats: IStat = character.baseStats;
  for (let i = 0; i < level; i++) {
    baseStats.health += Math.round(Math.random());
    baseStats.strength += Math.round(Math.random());
    baseStats.magic += Math.round(Math.random());
    baseStats.speed += Math.round(Math.random());
    baseStats.technology += Math.round(Math.random());
    baseStats.defense += Math.round(Math.random());
    baseStats.magicDefense += Math.round(Math.random());
    baseStats.luck += Math.round(Math.random());
    baseStats.physique += Math.round(Math.random());
  }
  return baseStats;
}

export { generateId, calculateBaseStats };
