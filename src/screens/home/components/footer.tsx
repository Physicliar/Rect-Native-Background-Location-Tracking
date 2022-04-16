import React from 'react';
//prettier-ignore
import { View, ViewStyle } from 'react-native';

import { FreeDrivingButton } from './free-driving-button';

interface FooterProps {
  toggleFreeDrivingMode: () => void;
}

export const Footer = (props: FooterProps) => {
  const { toggleFreeDrivingMode } = props;
  return (
    <View style={FOOTER}>
      <FreeDrivingButton onPress={toggleFreeDrivingMode} />
    </View>
  );
};

const FOOTER: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 16,
  zIndex: 2,
  paddingHorizontal: 16,
};
