import router from '@/router';
import type { Extra, GameVersion, Machine, Move, Pokemon } from '@/tools/pokemon';
import { LogFormat } from '@/tools/pokemon';
import { LocalStorage, StorageKey } from '@/tools/storage';
import { reactive, watch } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

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
  selectedPokemonName: string | null;
  currentRoute: StoredRoute;
  previousRoute?: StoredRoute;
  extra: Extra;
}

export type StoredRoute = Omit<RouteLocationNormalized, 'matched'>;

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
  selectedPokemonName: null,
  currentRoute: <StoredRoute>{},
  extra: {
    min: 0,
    max: 0,
  },
});

watch(store.userOptions, (userOptions) => {
  LocalStorage.save(StorageKey.UserOptions, userOptions);
});

watch(
  () => store.currentRoute.hash?.replace('#', '') || '',
  (hash) => {
    store.selectedPokemonName = hash || null;
  },
);

watch(
  () => store.selectedPokemonName,
  (hash) => {
    if (store.selectedPokemonName !== (store.currentRoute.hash?.replace('#', '') || null)) {
      router.push({ hash: hash ? `#${hash}` : undefined });
    }
  },
);
