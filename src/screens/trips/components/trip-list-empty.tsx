import React from 'react';
//prettier-ignore
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../constants/colors';

export const TripListEmpty = () => {
  return (
    <View style={CONTAINER}>
      <Icon name="lightning-bolt" color={colors.primary} size={48} />
      <Text style={TITLE}>Couldn't find any trip.</Text>
      <Text style={SUBTITLE}>Start driving to earn oxygen points.</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const TITLE: TextStyle = {
  fontSize: 16,
  color: 'black',
  marginTop: 10,
};

const SUBTITLE: TextStyle = {
  fontSize: 16,
  color: 'black',
  marginTop: 10,
};
