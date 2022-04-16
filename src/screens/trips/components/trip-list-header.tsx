import React from 'react';
import { Image, ImageStyle } from 'react-native';

export const TripListHeader = () => {
  return (
    <Image
      source={require('../../../assets/logo.png')}
      style={LOGO}
      resizeMode="contain"
    />
  );
};

const LOGO: ImageStyle = {
  width: 150,
  height: 50,
  borderRadius: 8,
  marginBottom: 20,
  marginHorizontal: 16,
};
