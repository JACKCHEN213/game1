import { useTeamStore } from '@/stores/team';
import type { GridPosition } from '@/types/grid';

export function useCharacterMoveRange(characterId: string): {
  move_range: GridPosition[];
  attack_range: GridPosition[];
} {
  const teamState = useTeamStore();
  const character = teamState.getCharacterById(characterId);
  if (!character) {
    return {
      move_range: [],
      attack_range: [],
    };
  }
  console.log(character);
  return {
    move_range: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 16,
      },
      {
        x: 0,
        y: 32,
      },
      {
        x: 0,
        y: 48,
      },
      {
        x: 0,
        y: 64,
      },
      {
        x: 0,
        y: 80,
      },
      {
        x: 16,
        y: 0,
      },
      {
        x: 16,
        y: 16,
      },
      {
        x: 16,
        y: 32,
      },
      {
        x: 16,
        y: 48,
      },
      {
        x: 16,
        y: 64,
      },
      {
        x: 32,
        y: 32,
      },
      {
        x: 32,
        y: 48,
      },
      {
        x: 48,
        y: 32,
      },
    ],
    attack_range: [
      {
        x: 32,
        y: 0,
      },
      {
        x: 48,
        y: 0,
      },
      {
        x: 32,
        y: 16,
      },
      {
        x: 48,
        y: 16,
      },
      {
        x: 64,
        y: 32,
      },
      {
        x: 80,
        y: 32,
      },
      {
        x: 48,
        y: 48,
      },
      {
        x: 64,
        y: 48,
      },
      {
        x: 32,
        y: 64,
      },
      {
        x: 48,
        y: 64,
      },
      {
        x: 16,
        y: 80,
      },
      {
        x: 32,
        y: 80,
      },
      {
        x: 0,
        y: 96,
      },
      {
        x: 16,
        y: 96,
      },
      {
        x: 0,
        y: 112,
      },
    ],
  };
}
