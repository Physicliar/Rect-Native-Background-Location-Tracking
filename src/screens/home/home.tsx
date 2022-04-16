import React, { useEffect, useRef, useState } from 'react';

//prettier-ignore
import BackgroundGeolocation, { Subscription } from "react-native-background-geolocation";
//prettier-ignore
import MapView, { EventUserLocation, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import * as turf from '@turf/turf';

import { fetchNearbyLocations, Place } from '../../services/api/nearby-api';
import { DrivingFinished } from './components/driving-finished';
import { useStore } from '../../services/store/store';
import { Header } from './components/header';
import { Footer } from './components/footer';

export const HomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const [markers, setMarkers] = useState<Place[]>([]);

  const freeDrivingMode = useStore(state => state.freeDrivingMode);
  const locations = useStore(state => state.locations);

  const setLastDrivingLength = useStore(state => state.setLastDrivingLength);
  const setGeolocationReady = useStore(state => state.setGeolocationReady);
  const setFreeDrivingMode = useStore(state => state.setFreeDrivingMode);
  const resetLocations = useStore(state => state.resetLocations);
  const addLocation = useStore(state => state.addLocation);
  const addTrip = useStore(state => state.addTrip);

  useEffect(() => {
    //prettier-ignore
    const onLocation: Subscription = BackgroundGeolocation.onLocation(async location => {
        const { coords, timestamp, activity } = location;

        addLocation({
          //@ts-ignore
          activity: activity.type,
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: timestamp,
        });

        const locations: Place[] = await fetchNearbyLocations(
          coords.latitude,
          coords.longitude,
        );

        setMarkers(locations);
      },
    );

    const initGeolocation = async () => {
      const state = await BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,
        enableHeadless: true,
        isMoving: true,
        notification: {
          title: 'Bluedot',
          text: 'Watching location for better experience.',
        },
      });

      setGeolocationReady(true);
      setFreeDrivingMode(state.enabled);
    };

    initGeolocation();

    return () => {
      onLocation.remove();
    };
  }, []);

  const toggleFreeDrivingMode = () => {
    if (freeDrivingMode) {
      setFreeDrivingMode(false);
      BackgroundGeolocation.stop();
      createTrip();
    } else {
      setFreeDrivingMode(true);
      BackgroundGeolocation.start();
    }
  };

  const createTrip = () => {
    const coords = locations.map(ping => [ping.longitude, ping.latitude]);
    if (coords.length > 1) {
      const line = turf.lineString(coords);
      const length = turf.length(line, { units: 'kilometers' });
      const [minX, minY, maxX, maxY] = turf.bbox(line);

      setLastDrivingLength(length);

      bottomSheetRef.current?.snapToIndex(0);

      addTrip({
        date: new Date(),
        locations,
        length,
        bbox: [
          { latitude: minY, longitude: minX },
          { latitude: maxY, longitude: maxX },
        ],
      });

      resetLocations();
    } else {
      setLastDrivingLength(0);
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  //prettier-ignore
  const flyToCoords = ({ latitude, longitude }: {latitude: number, longitude: number}) => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude, longitude
        },
      },
    );
  };

  const onUserLocationChange = (event: EventUserLocation) => {
    flyToCoords({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <Header />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsPointsOfInterest
        showsUserLocation
        showsMyLocationButton={false}
        onUserLocationChange={onUserLocationChange}>
        {markers.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.geometry.lat,
              longitude: place.geometry.lng,
            }}
            image={{ uri: place.icon }}
            title={place.name}
          />
        ))}
      </MapView>
      <Footer toggleFreeDrivingMode={toggleFreeDrivingMode} />
      <DrivingFinished ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

const initialRegion: Region = {
  latitude: 41.0508,
  longitude: 29.0256,
  latitudeDelta: 0.25,
  longitudeDelta: 0.25,
};
