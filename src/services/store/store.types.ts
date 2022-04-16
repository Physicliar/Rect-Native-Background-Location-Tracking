import * as turf from '@turf/turf';
import { LatLng } from 'react-native-maps';
export interface Location {
  latitude: number;
  longitude: number;
  timestamp: string;
  activity: string;
}

export interface Trip {
  date: Date;
  locations: Location[];
  length: number;
  bbox: LatLng[];
}

export interface StoreState {
  geolocationReady: boolean;
  setGeolocationReady: (value: boolean) => void;
  freeDrivingMode: boolean;
  setFreeDrivingMode: (value: boolean) => void;
  lastDrivingLength: number;
  setLastDrivingLength: (value: number) => void;
  locations: Location[];
  addLocation: (value: Location) => void;
  trips: Trip[];
  addTrip: (value: Trip) => void;
  resetLocations: () => void;
}
