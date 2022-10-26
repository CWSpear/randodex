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

export interface Machines {
  number: number;
  move: string;
  isHM: boolean;
}

export interface BaseStats {
  number: number;
  name: string;
  type1: Type;
  type2?: Type;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  ability1: string;
  ability2?: string;
}

export interface Pokemon extends BaseStats {
  evolutions: string[]; // name of Pokemon, as they are unique
  moves: Move[];
  machines: Machines[];
}

export interface Meta {
  minHp: number;
  maxHp: number;
  minAttack: number;
  maxAttack: number;
  minDefense: number;
  maxDefense: number;
  minSpecialAttack: number;
  maxSpecialAttack: number;
  minSpecialDefense: number;
  maxSpecialDefense: number;
  minSpeed: number;
  maxSpeed: number;
  min: number;
  max: number;
}
