import { type IUnit } from './unit';

interface ITeam {
  id: string;
  name: string;
  units: IUnit[];
  alignment: 'player' | 'enemy' | 'neutral';
}

export { type ITeam };
