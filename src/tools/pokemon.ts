export enum LogFormat {
  Log = 'log',
  JSON = 'json',
}

export enum GameVersion {
  FireRed = 'Fire Red',
  LeafGreen = 'Leaf Green',
  HeartGold = 'HeartGold',
  SoulSilver = 'SoulSilver',
}

export enum Type {
  Normal = 'Normal',
  Fire = 'Fire',
  Water = 'Water',
  Grass = 'Grass',
  Electric = 'Electric',
  Ice = 'Ice',
  Fighting = 'Fighting',
  Poison = 'Poison',
  Ground = 'Ground',
  Flying = 'Flying',
  Psychic = 'Psychic',
  Bug = 'Bug',
  Rock = 'Rock',
  Ghost = 'Ghost',
  Dark = 'Dark',
  Dragon = 'Dragon',
  Steel = 'Steel',
  Fairy = 'Fairy',
}

export interface Move {
  level: number;
  name: string;
}

export interface Machine {
  number: number;
  move: string;
  isHM: boolean;
  gymLeader?: string;
}

export interface BasicInfo {
  number: number;
  name: string;
  type1: Type;
  type2?: Type;
}

export interface BaseStats extends BasicInfo {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  ability1?: string;
  ability2?: string;
  ability3?: string;
}

export interface Pokemon extends BaseStats {
  evolutions: BasicInfo[]; // name of Pokemon, as they are unique
  moves: Move[];
  machines: Machine[];
}

export interface Extra {
  // minHp: number;
  // maxHp: number;
  // minAttack: number;
  // maxAttack: number;
  // minDefense: number;
  // maxDefense: number;
  // minSpecialAttack: number;
  // maxSpecialAttack: number;
  // minSpecialDefense: number;
  // maxSpecialDefense: number;
  // minSpeed: number;
  // maxSpeed: number;
  min: number;
  max: number;
}

// -----------------------
