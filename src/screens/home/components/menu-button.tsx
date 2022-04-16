import React from 'react';
//prettier-ignore
import { Pressable, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../constants/colors';

export const MenuButton = () => {
  const navigation = useNavigation();

  return (
    //@ts-ignore
    <Pressable onPress={() => navigation.toggleDrawer()} style={MENU_BUTTON}>
      <Icon name="menu" color={'white'} size={24} />
    </Pressable>
  );
};

const MENU_BUTTON: ViewStyle = {
  height: 45,
  width: 45,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.primary,
  marginRight: 10,
};
