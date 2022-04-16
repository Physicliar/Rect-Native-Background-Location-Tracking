import React, { useEffect } from 'react';
//prettier-ignore
import { Animated, Easing, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStore } from '../../../services/store/store';
import { colors } from '../../../constants/colors';

const opacity = new Animated.Value(0);

interface FreeDrivingButtonProps {
  onPress: () => void;
}

export const FreeDrivingButton = (props: FreeDrivingButtonProps) => {
  const { onPress } = props;
  const geolocationReady = useStore(state => state.geolocationReady);
  const freeDrivingMode = useStore(state => state.freeDrivingMode);

  useEffect(() => {
    if (freeDrivingMode) {
      runAnimation();
    } else {
      stopAnimation();
    }
  }, [freeDrivingMode]);

  const runAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopAnimation = () => {
    opacity.setValue(0);
  };

  return (
    <Pressable
      style={[FREE_DRIVING_BUTTON, { opacity: geolocationReady ? 1 : 0.8 }]}
      android_ripple={{ color: 'gray' }}
      onPress={onPress}
      disabled={!geolocationReady}>
      <View style={RECORDING_OUT}>
        <Animated.View style={[RECORDING_IN, { opacity: opacity }]} />
      </View>
      <Icon name="car" color={'white'} size={24} />
      <Text style={FREE_DRIVING_TEXT}>
        {freeDrivingMode ? 'Stop Free Driving' : 'Start Free Driving'}
      </Text>
    </Pressable>
  );
};

const FREE_DRIVING_BUTTON: ViewStyle = {
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: colors.primary,
};

const FREE_DRIVING_TEXT: TextStyle = {
  fontSize: 15,
  color: 'white',
  marginLeft: 10,
};

const RECORDING_OUT: ViewStyle = {
  borderWidth: 2,
  width: 24,
  height: 24,
  borderRadius: 12,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
};

const RECORDING_IN: ViewStyle = {
  backgroundColor: 'red',
  width: 12,
  height: 12,
  borderRadius: 9,
};
