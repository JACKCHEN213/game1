import { type ICharacter, CharacterType } from '@/types/character';
import BaseCharacter from './BaseCharacter';
import $t from '@/utils/i18n';

class Myrmidon extends BaseCharacter {
  constructor(options?: Partial<ICharacter>) {
    super({
      type: CharacterType.Myrmidon,
      name: $t('character.myrmidon'),
      characterImageUrl: 'res/entities/swordman/Archer-move-1.png',
      characterPortraitUrl: 'res/entities/swordman/a008.gif',
      spriteDefine: {
        move: {
          up: [
            {
              x: -3,
              y: -49,
            },
            {
              x: -20,
              y: -49,
            },
            {
              x: -38,
              y: -49,
            },
          ],
          down: [
            {
              x: 1,
              y: -19,
            },
            {
              x: -15,
              y: -19,
            },
            {
              x: -32,
              y: -19,
            },
          ],
          left: [
            {
              x: -2,
              y: -66,
            },
            {
              x: -17,
              y: -66,
            },
            {
              x: -34,
              y: -66,
            },
          ],
          right: [
            {
              x: 0,
              y: -34,
            },
            {
              x: -16,
              y: -34,
            },
            {
              x: -33,
              y: -34,
            },
          ],
          stand: [
            {
              x: -1,
              y: -1,
            },
            {
              x: -16,
              y: -1,
            },
            {
              x: -33,
              y: -1,
            },
          ],
          size: {
            width: 72,
            height: 117,
            scale: 0.7,
          },
        },
        attack: {},
      },
      ...options,
    });
  }
  attack() {
    console.log('myrmidon attack');
  }
}

export default Myrmidon;
