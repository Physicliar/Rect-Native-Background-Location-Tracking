import React, { forwardRef, useMemo } from 'react';
//prettier-ignore
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import { useStore } from '../../../services/store/store';

interface DrivingFinishedProps {}

export const DrivingFinished = forwardRef<BottomSheet, DrivingFinishedProps>(
  (props, ref) => {
    const lastDrivingLength = useStore(state => state.lastDrivingLength);
    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        bottomInset={92}
        detached
        style={SHEET_CONTAINER}>
        {lastDrivingLength === 0 ? (
          <View style={INNER_CONTAINER}>
            <Text style={EMOJI_TEXT}>🚧</Text>
            <Text style={NEGATIVE_TEXT}>
              Hey! It seems like you haven't started driving yet. {'\n'} Start
              driving to get Oxygen Points.
            </Text>
          </View>
        ) : (
          <View style={INNER_CONTAINER}>
            <Text style={EMOJI_TEXT}>🔥</Text>
            <Text style={POSITIVE_TEXT}>
              Congratulations! You have driven {lastDrivingLength.toFixed(2)}{' '}
              kilometers
            </Text>
          </View>
        )}
      </BottomSheet>
    );
  },
);

const SHEET_CONTAINER: ViewStyle = {
  marginHorizontal: 16,
};

const INNER_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const EMOJI_TEXT: TextStyle = {
  fontSize: 64,
  color: 'black',
};

const POSITIVE_TEXT: TextStyle = {
  fontSize: 16,
  color: 'black',
  marginTop: 24,
};
const NEGATIVE_TEXT: TextStyle = {
  fontSize: 16,
  color: 'black',
  marginTop: 24,
  textAlign: 'center',
};
