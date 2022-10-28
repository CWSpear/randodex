import { GameVersion } from '@/tools/pokemon';

export interface GymTechnicalMachine {
  leader: string;
  number: number;
}

const fireRedAndLeafGreen: GymTechnicalMachine[] = [
  { leader: 'Brock', number: 39 },
  { leader: 'Misty', number: 3 },
  { leader: 'Lt. Surge', number: 34 },
  { leader: 'Erika', number: 19 },
  { leader: 'Koga', number: 6 },
  { leader: 'Sabrina', number: 4 },
  { leader: 'Blaine', number: 38 },
  { leader: 'Giovanni', number: 26 },
];

const heartGoldAndSoulSilver: GymTechnicalMachine[] = [
  // not in Gym leader order
  { leader: 'Blue', number: 92 },
  { leader: 'Bugsy', number: 89 },
  { leader: 'Janine', number: 84 },
  { leader: 'Brock', number: 80 },
  { leader: 'Clair', number: 59 },
  { leader: 'Faulkner', number: 51 },
  { leader: 'Blaine', number: 50 },
  { leader: 'Sabrina', number: 48 },
  { leader: 'Whitney', number: 45 },
  { leader: 'Lt. Surge', number: 34 },
  { leader: 'Morty', number: 30 },
  { leader: 'Jasmine', number: 23 },
  { leader: 'Erika', number: 19 },
  { leader: 'Pryce', number: 7 },
  { leader: 'Misty', number: 3 },
  { leader: 'Chuck', number: 1 },
];

export const gymTechnicalMachines: Record<GameVersion, GymTechnicalMachine[]> = {
  [GameVersion.FireRed]: fireRedAndLeafGreen,
  [GameVersion.LeafGreen]: fireRedAndLeafGreen,
  [GameVersion.HeartGold]: heartGoldAndSoulSilver,
  [GameVersion.SoulSilver]: heartGoldAndSoulSilver,
};
