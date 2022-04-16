import { StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const store = new MMKV({
  id: 'store',
});

export const storage: StateStorage = {
  setItem: async (name, value) => {
    store.set(name, value);
  },
  getItem: name => {
    const value = store.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    store.delete(name);
  },
};
