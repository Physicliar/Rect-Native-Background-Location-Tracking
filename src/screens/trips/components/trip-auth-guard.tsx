import React from 'react';
//prettier-ignore
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../../constants/colors';

interface TripAuthGuardProps {
  authenticateUser: () => void;
}

export const TripAuthGuard = (props: TripAuthGuardProps) => {
  const { authenticateUser } = props;
  return (
    <View style={GUARD}>
      <Icon name="fingerprint" color={'black'} size={64} />
      <Text style={GUARD_TITLE}>Need authentication to continue.</Text>
      <Pressable onPress={authenticateUser} style={GUARD_BUTTON}>
        <Text style={GUARD_BUTTON_TEXT}>Authenticate</Text>
      </Pressable>
    </View>
  );
};

const GUARD: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  zIndex: 2,
};

const GUARD_TITLE: TextStyle = {
  fontSize: 16,
  color: 'black',
  marginTop: 12,
};

const GUARD_BUTTON: ViewStyle = {
  backgroundColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  marginTop: 16,
};

const GUARD_BUTTON_TEXT: TextStyle = {
  fontSize: 16,
  color: 'white',
};
