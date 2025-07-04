import { type ICharacter, CharacterType } from '@/types/character';
import BaseCharacter from './BaseCharacter';

class Archer extends BaseCharacter {
  constructor(options?: Partial<ICharacter>) {
    super({
      type: CharacterType.Archer,
      name: '弓箭手',
      characterImageUrl: '@/game/entities/archer/Archer-move-1.png',
      characterPortraitUrl: '@/game/entities/archer/a008.gif',
      ...options,
    });
  }
  attack() {
    console.log('archer attack');
  }
}

export default Archer;
