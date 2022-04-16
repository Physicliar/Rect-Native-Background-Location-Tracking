import React, { useEffect, useMemo, useRef, useState } from 'react';
//prettier-ignore
import { LogBox, Platform, Text, View } from 'react-native';

import MapboxGL, { Logger, OnPressEvent } from '@rnmapbox/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import Config from 'react-native-config';

MapboxGL.setAccessToken('');

if (Platform.OS === 'android') {
  MapboxGL.setConnected(true);
}

LogBox.ignoreLogs([
  'Mapbox',
  'Mapbox [info]',
  '[react-native-gesture-handler]',
]);

//  This screen shows how to show thousands (even millions) of points in a map
//  without any performance issues even on low end android devices
//  It uses Maplibre (OSS fork of Mapbox) to render custom vector tiles
//  This tiles comes from a tile server i wrote in nodejs

//  You can also click features coming from vector tile to get more info
//  This can be used to render info about chargers

export const BetterScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [index, setIndex] = useState<string>('');

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
    Logger.setLogCallback(log => {
      const { message } = log;

      if (message.match('Request failed due to a permanent error')) {
        return true;
      }
      return false;
    });
  }, []);

  const onVectorSourcePress = (event: OnPressEvent) => {
    if (event.features.length > 0) {
      const [feature] = event.features;
      setIndex(feature.id?.toString() ?? '');
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <MapboxGL.MapView
        styleURL={Config.MAP_STYLE_URL}
        style={{ flex: 1 }}
        attributionEnabled={false}
        logoEnabled={false}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        compassEnabled={false}>
        <MapboxGL.Camera
          followUserLocation
          followUserMode="compass"
          defaultSettings={{
            centerCoordinate: [29.0256, 41.0508],
            zoomLevel: 9,
          }}
        />
        <MapboxGL.UserLocation animated showsUserHeadingIndicator visible />
        <MapboxGL.VectorSource
          id="unitsv2"
          tileUrlTemplates={[Config.TILE_SERVER_URL]}
          onPress={onVectorSourcePress}>
          <MapboxGL.CircleLayer
            id="units"
            sourceID="unitsv2"
            sourceLayerID="dbunits"
            style={{
              circleRadius: 4,
              circleStrokeColor: 'blue',
            }}
          />
        </MapboxGL.VectorSource>
      </MapboxGL.MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black' }}>
            Charger {index} Info
          </Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
