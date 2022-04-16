import Config from 'react-native-config';

export interface Place {
  id: string;
  name: string;
  icon: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

const API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/';

//prettier-ignore
export const fetchNearbyLocations = async (lat: number, lng: number): Promise<Place[]> => {
  const response = await fetch(
    API_URL + `json?location=${lat}%2C${lng}&radius=1000&key=${Config.GOOGLE_PLACES_API_KEY}`,
  );
  const res = await response.json();
  //@ts-ignore
  const places = res.results.map(place => ({
    id: place.place_id,
    name: place.name,
    icon: place.icon,
    geometry: place.geometry.location,
  }));

  return places;
};
