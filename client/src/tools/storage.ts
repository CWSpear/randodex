import type { UserOptions } from '@/tools/store';

export enum StorageKey {
  UserOptions = 'UserOptions',
}

export interface StorageTypes {
  [StorageKey.UserOptions]: UserOptions;
}

export class LocalStorage {
  static save<K extends StorageKey>(key: K, data: StorageTypes[K]): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  static load<K extends StorageKey>(key: K): StorageTypes[K] | null {
    try {
      const strData: string | null = window.localStorage.getItem(key);
      if (!strData) {
        return null;
      }

      return JSON.parse(strData) || null;
    } catch (e) {
      console.error('JSON parse error?', e);
      return null;
    }
  }

  static remove<K extends StorageKey>(key: K): void {
    window.localStorage.removeItem(key);
  }

  static clear(): void {
    window.localStorage.clear();
  }
}
