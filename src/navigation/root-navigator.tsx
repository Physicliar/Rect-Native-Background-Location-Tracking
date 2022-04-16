import React from 'react';
import { Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { BetterScreen } from '../screens/better/better';
import { TripsScreen } from '../screens/trips/trips';
import { HomeScreen } from '../screens/home/home';

import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.select({
            ios: 80,
            android: 60,
          }),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <Icon name="earth" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Better"
        component={BetterScreen}
        options={{
          tabBarLabel: 'Better',
          tabBarIcon: ({ color }) => (
            <Icon name="map-marker" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color }) => (
            <Icon name="road-variant" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: colors.primary,
      }}>
      <Drawer.Screen
        name="Drawer"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
    </Drawer.Navigator>
  );
};
