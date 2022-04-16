import React, { useState } from 'react';
//prettier-ignore
import { FlatList, ImageStyle, ListRenderItemInfo, StatusBar, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { TripListHeader } from './components/trip-list-header';
import { TripListEmpty } from './components/trip-list-empty';
import { TripAuthGuard } from './components/trip-auth-guard';
import { Trip } from '../../services/store/store.types';
import { useStore } from '../../services/store/store';
import { TripItem } from './components/trip-item';
import { colors } from '../../constants/colors';

export const TripsScreen = () => {
  const trips = useStore(state => state.trips);
  const [blockScreenContent, setBlockScreenContent] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      authenticateUser();

      return () => {
        setBlockScreenContent(true);
      };
    }, []),
  );

  const authenticateUser = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setBlockScreenContent(false);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Trip>) => {
    return <TripItem trip={item} />;
  };

  const keyExtractor = (item: Trip) => item.date.toString();

  return (
    <SafeAreaView style={CONTAINER}>
      {blockScreenContent && (
        <TripAuthGuard authenticateUser={authenticateUser} />
      )}
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={trips.reverse()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<TripListHeader />}
        ListEmptyComponent={<TripListEmpty />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
};
