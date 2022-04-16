import React from 'react';
//prettier-ignore
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { MenuButton } from './menu-button';

export const Header = () => {
  return (
    <View style={HEADER}>
      <MenuButton />
      <Image
        source={require('../../../assets/logo.png')}
        style={LOGO}
        resizeMode="contain"
      />
    </View>
  );
};

const HEADER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: 32,
  right: 0,
  left: 0,
  zIndex: 2,
  paddingHorizontal: 16,
};

const LOGO: ImageStyle = {
  width: 150,
  borderRadius: 8,
};
