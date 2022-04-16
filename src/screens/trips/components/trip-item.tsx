import React, { memo, useRef } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { Trip } from '../../../services/store/store.types';
import { TripHeader } from './trip-header';

dayjs.extend(relativeTime);
interface TripItemProps {
  trip: Trip;
}

export const TripItem = memo((props: TripItemProps) => {
  const { trip } = props;
  const map = useRef<MapView>(null);

  return (
    <View style={CONTAINER}>
      <TripHeader trip={trip} />
      <MapView
        ref={map}
        liteMode
        style={MAP}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          map.current?.fitToCoordinates(trip.bbox);
        }}
        showsMyLocationButton={false}>
        <Polyline
          coordinates={trip.locations}
          strokeWidth={3}
          strokeColor={'blue'}
        />
      </MapView>
    </View>
  );
});

const CONTAINER: ViewStyle = {
  elevation: 4,
  backgroundColor: 'white',
  borderRadius: 15,
  marginHorizontal: 16,
  overflow: 'hidden',
  marginBottom: 20,
};

const HEADER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
};

const ROW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const MAP: ViewStyle = {
  height: 200,
};

const TEXT: TextStyle = {
  fontSize: 14,
  marginLeft: 10,
};
