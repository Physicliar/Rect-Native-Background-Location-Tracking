import React, { memo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { Trip } from '../../../services/store/store.types';
import { colors } from '../../../constants/colors';

dayjs.extend(relativeTime);
interface TripItemProps {
  trip: Trip;
}

export const TripHeader = memo((props: TripItemProps) => {
  const { trip } = props;

  return (
    <View style={HEADER}>
      <View style={ROW}>
        <Icon name="car" color={colors.primary} size={21} />
        <Text style={TEXT}>{trip.length.toFixed(2)} km logged.</Text>
      </View>
      <Text style={TEXT}>{dayjs(trip.date).fromNow()}</Text>
    </View>
  );
});

const HEADER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
};

const ROW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const TEXT: TextStyle = {
  fontSize: 14,
  marginLeft: 10,
  color: 'black',
};
