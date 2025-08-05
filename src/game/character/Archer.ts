import { type ICharacter, CharacterType } from '@/types/character';
import BaseCharacter from './BaseCharacter';
import $t from '@/utils/i18n';

class Archer extends BaseCharacter {
  constructor(options?: Partial<ICharacter>) {
    super({
      type: CharacterType.Archer,
      name: $t('character.archer'),
      characterImageUrl: 'res/entities/archer/archer map.png',
      characterPortraitUrl: 'res/entities/archer/a008.gif',
      spriteDefine: {
        move: {
          up: [
            {
              x: -85,
              y: -6,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -85,
              y: -31,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -85,
              y: -58,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -85,
              y: -83,
              scale: 0.8,
              scaleX: 1,
            },
          ],
          down: [
            {
              x: -58,
              y: -5,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -58,
              y: -30,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -58,
              y: -57,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -58,
              y: -82,
              scale: 0.8,
              scaleX: 1,
            },
          ],
          left: [
            {
              x: -35,
              y: -7,
              scale: 0.9,
              scaleX: 1,
            },
            {
              x: -35,
              y: -35,
              scale: 0.9,
              scaleX: 1,
            },
            {
              x: -35,
              y: -65,
              scale: 0.9,
              scaleX: 1,
            },
            {
              x: -35,
              y: -93,
              scale: 0.9,
              scaleX: 1,
            },
          ],
          right: [
            {
              x: -35,
              y: -7,
              scale: 0.9,
              scaleX: -1,
            },
            {
              x: -35,
              y: -35,
              scale: 0.9,
              scaleX: -1,
            },
            {
              x: -35,
              y: -65,
              scale: 0.9,
              scaleX: -1,
            },
            {
              x: -35,
              y: -93,
              scale: 0.9,
              scaleX: -1,
            },
          ],
          stand: [
            {
              x: -4,
              y: -36,
              scale: 0.9,
              scaleX: 1,
            },
            {
              x: -4,
              y: -65,
              scale: 0.9,
              scaleX: 1,
            },
            {
              x: -4,
              y: -93,
              scale: 0.9,
              scaleX: 1,
            },
          ],
          active: [
            {
              x: -108,
              y: -31,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -108,
              y: -57,
              scale: 0.8,
              scaleX: 1,
            },
            {
              x: -108,
              y: -82,
              scale: 0.8,
              scaleX: 1,
            },
          ],
          size: {
            width: 163,
            height: 128,
          },
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
