export enum GameVersion {
  FireRed = 'Fire Red',
  LeafGreen = 'Leaf Green',
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

export interface ParsedResults {
  pokemon: Pokemon[];
  version: GameVersion;
}

export interface Move {
  level: number;
  name: string;
}

export interface Machine {
  number: number;
  move: string;
  isHM: boolean;
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

export interface Meta {
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

export interface Log {
  pokemon?: PokemonEntity[] | null;
  starters?: number[] | null;
  encounters?: EncountersEntity[] | null;
  trainers?: TrainersEntity[] | null;
  movesets?: (EntityOrMovesetsEntityEntity[] | null)[] | null;
  statics?: StaticsEntity[] | null;
  totems?: null[] | null;
  tms?: ((string | null)[] | null)[] | null;
  tutors?: ((string | null)[] | null)[] | null;
  items?: string[] | null;
  field?: number[] | null;
  shops: Shops;
  pickup?: PickupEntity[] | null;
  trades?: TradesEntity[] | null;
  abilities?: string[] | null;
}
export interface PokemonEntity {
  name: string;
  number: number;
  formeSuffix: string;
  formeNumber: number;
  cosmeticForms: number;
  formeSpriteIndex: number;
  actuallyCosmetic: boolean;
  realCosmeticFormNumbers?: null[] | null;
  primaryType: string;
  secondaryType?: string | null;
  hp: number;
  attack: number;
  defense: number;
  spatk: number;
  spdef: number;
  speed: number;
  special: number;
  ability1: number;
  ability2: number;
  ability3: number;
  catchRate: number;
  expYield: number;
  guaranteedHeldItem: number;
  commonHeldItem: number;
  rareHeldItem: number;
  darkGrassHeldItem: number;
  genderRatio: number;
  frontSpritePointer: number;
  picDimensions: number;
  callRate: number;
  growthCurve: string;
  evolutionsFrom?: (EvolutionsFromEntityOrEvolutionsToEntity | null)[] | null;
  evolutionsTo?: (EvolutionsFromEntityOrEvolutionsToEntity1 | null)[] | null;
  megaEvolutionsFrom?: null[] | null;
  megaEvolutionsTo?: null[] | null;
  shuffledStatsOrder?: number[] | null;
  temporaryFlag: boolean;
}
export interface EvolutionsFromEntityOrEvolutionsToEntity {
  from: number;
  to: number;
  level: number;
}
export interface EvolutionsFromEntityOrEvolutionsToEntity1 {
  from: number;
  to: number;
  level: number;
}
export interface EncountersEntity {
  rate: number;
  encounters?: EncountersEntity1[] | null;
  bannedPokemon?: null[] | null;
  displayName: string;
  offset: number;
}
export interface EncountersEntity1 {
  level: number;
  maxLevel: number;
  pokemon: number;
  formeNumber: number;
  isSOS: boolean;
}
export interface TrainersEntity {
  offset: number;
  index: number;
  pokemon?: PokemonEntity1[] | null;
  importantTrainer: boolean;
  poketype: number;
  name: string;
  trainerclass: number;
  fullDisplayName: string;
  multiBattleStatus: string;
  forceStarterPosition: number;
  requiresUniqueHeldItems: boolean;
  tag?: string | null;
}
export interface PokemonEntity1 {
  pokemon: number;
  level: number;
  moves?: number[] | null;
  heldItem: number;
  hasMegaStone: boolean;
  hasZCrystal: boolean;
  abilitySlot: number;
  forme: number;
  formeSuffix: string;
  forcedGenderFlag: number;
  nature: number;
  hpEVs: number;
  atkEVs: number;
  defEVs: number;
  spatkEVs: number;
  spdefEVs: number;
  speedEVs: number;
  IVs: number;
  strength: number;
  resetMoves: boolean;
}
export interface EntityOrMovesetsEntityEntity {
  move: string;
  level: number;
}
export interface StaticsEntity {
  pkmn: number;
  forme: number;
  level: number;
  maxLevel: number;
  heldItem: number;
  isEgg: boolean;
  resetMoves: boolean;
  restrictedPool: boolean;
  restrictedList?: null[] | null;
  linkedEncounters?: null[] | null;
}
export interface Shops {
  12: a12Or13Or14;
  13: a12Or13Or14;
  14: a12Or13Or14;
}
export interface a12Or13Or14 {
  items?: number[] | null;
  name: string;
  isMainGame: boolean;
}
export interface PickupEntity {
  item: number;
  probabilities?: number[] | null;
}
export interface TradesEntity {
  id: number;
  requestedPokemon: number;
  givenPokemon: number;
  nickname: string;
  otName: string;
  otId: number;
  ivs?: number[] | null;
  item: number;
}
