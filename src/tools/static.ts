import { GameVersion } from '@/tools/pokemon';

export interface GymTechnicalMachine {
  leader: string;
  number: number;
}

export const gymTechnicalMachines: Record<GameVersion, GymTechnicalMachine[]> = {
  [GameVersion.FireRed]: [
    { leader: 'Brock', number: 39 },
    { leader: 'Misty', number: 3 },
    { leader: 'Lt. Surge', number: 34 },
    { leader: 'Erika', number: 19 },
    { leader: 'Koga', number: 6 },
    { leader: 'Sabrina', number: 4 },
    { leader: 'Blaine', number: 38 },
    { leader: 'Giovanni', number: 26 },
  ],
  [GameVersion.LeafGreen]: [
    { leader: 'Brock', number: 39 },
    { leader: 'Misty', number: 3 },
    { leader: 'Lt. Surge', number: 34 },
    { leader: 'Erika', number: 19 },
    { leader: 'Koga', number: 6 },
    { leader: 'Sabrina', number: 4 },
    { leader: 'Blaine', number: 38 },
    { leader: 'Giovanni', number: 26 },
  ],
};
