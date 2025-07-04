import { type ICharacter, CharacterType } from '@/types/character';
import BaseCharacter from './BaseCharacter';

class Archer extends BaseCharacter {
  constructor(options?: Partial<ICharacter>) {
    super({
      type: CharacterType.Archer,
      name: '弓箭手',
      characterImageUrl: 'src/game/entities/archer/Archer-move-1.png',
      characterPortraitUrl: '@/game/entities/archer/a008.gif',
      spriteDefine: {
        move: {
          up: [
            {
              x: -4,
              y: -72,
            },
            {
              x: -24,
              y: -72,
            },
            {
              x: -48,
              y: -72,
            },
          ],
          down: [
            {
              x: -4,
              y: -28,
            },
            {
              x: -24,
              y: -28,
            },
            {
              x: -48,
              y: -28,
            },
          ],
          left: [
            {
              x: -4,
              y: -96,
            },
            {
              x: -26,
              y: -95,
            },
            {
              x: -48,
              y: -100,
            },
          ],
          right: [
            {
              x: -4,
              y: -50,
            },
            {
              x: -24,
              y: -50,
            },
            {
              x: -48,
              y: -50,
            },
          ],
          stand: [
            {
              x: -4,
              y: -4,
            },
            {
              x: -24,
              y: -4,
            },
            {
              x: -48,
              y: -4,
            },
          ],
        },
        attack: {},
      },
      ...options,
    });
  }
  attack() {
    console.log('archer attack');
  }
}

export default Archer;
