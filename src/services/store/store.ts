import { persist } from 'zustand/middleware';
import create from 'zustand';

import { Location, StoreState, Trip } from './store.types';
import { storage } from './storage';

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      geolocationReady: false,
      freeDrivingMode: false,
      locations: [],
      trips: [],
      lastDrivingLength: 0,
      //prettier-ignore
      setLastDrivingLength: (value: number) => set({ lastDrivingLength: value }),
      setGeolocationReady: (value: boolean) => set({ geolocationReady: value }),
      setFreeDrivingMode: (value: boolean) => set({ freeDrivingMode: value }),
      //prettier-ignore
      addLocation: (value: Location) => set(state => ({ locations: [...state.locations, value ] })),
      //prettier-ignore
      addTrip: (value: Trip) => set(state => ({ trips: [...state.trips, value] })),
      resetLocations: () => set({ locations: [] }),
    }),
    {
      name: 'store',
      getStorage: () => storage,
    },
  ),
);
