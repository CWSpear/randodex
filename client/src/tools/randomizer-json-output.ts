export interface Log {
  pokemon: PokemonEntity[] | null;
  starters: number[] | null;
  encounters: EncountersEntity[] | null;
  trainers: TrainersEntity[] | null;
  movesets: (MovesetsEntity[] | null)[] | null;
  statics: StaticsEntity[] | null;
  totems: null[] | null;
  tms: ((string | null)[] | null)[] | null;
  tutors: ((string | null)[] | null)[] | null;
  items: string[] | null;
  field: number[] | null;
  shops: Shops;
  pickup: PickupEntity[] | null;
  trades: TradesEntity[] | null;
  abilities: string[] | null;
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
  evolutionsFrom?: (EvolutionEntity | null)[] | null;
  evolutionsTo?: (EvolutionEntity | null)[] | null;
  megaEvolutionsFrom?: null[] | null; // TODO need to view gen 5 logs
  megaEvolutionsTo?: null[] | null; // TODO need to view gen 5 logs
  shuffledStatsOrder?: number[] | null;
  temporaryFlag: boolean;
}

export interface EvolutionEntity {
  from: number;
  to: number;
  level: number;
}

export interface EncountersEntity {
  rate: number;
  encounters?: Encounters[] | null;
  bannedPokemon?: null[] | null;
  displayName: string;
  offset: number;
}

export interface Encounters {
  level: number;
  maxLevel: number;
  pokemon: number;
  formeNumber: number;
  isSOS: boolean;
}

export interface TrainersEntity {
  offset: number;
  index: number;
  pokemon?: PokemonInstance[] | null;
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

export interface PokemonInstance {
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

export interface MovesetsEntity {
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
  [shopIndex: string]: Shop;
}

export interface Shop {
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
