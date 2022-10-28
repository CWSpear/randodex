import type { Extra, GameVersion, Machine, Move, Pokemon } from '@/tools/pokemon';
import { LogFormat } from '@/tools/pokemon';
import { LocalStorage, StorageKey } from '@/tools/storage';
import { reactive, watch } from 'vue';

export interface UserOptions {
  filterGymTms: boolean;
}

export interface Store {
  pokemon: Pokemon[];
  moves: Move[];
  gameVersion: GameVersion | null;
  machines: Machine[];
  logFormat: LogFormat;
  userOptions: UserOptions;
  extra: Extra;
}

const defaultUserOptions: UserOptions = {
  filterGymTms: false,
};

export const store = reactive<Store>({
  pokemon: [],
  moves: [],
  gameVersion: null,
  machines: [],
  logFormat: LogFormat.Log,
  userOptions: LocalStorage.load(StorageKey.UserOptions) || defaultUserOptions,
  extra: {
    min: 0,
    max: 0,
  },
});

watch(store.userOptions, (userOptions) => {
  LocalStorage.save(StorageKey.UserOptions, userOptions);
});
