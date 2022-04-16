import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from './App';
import { name as appName } from './app.json';

import BackgroundGeolocation from 'react-native-background-geolocation';

import { useStore } from './src/services/store/store';

AppRegistry.registerComponent(appName, () => App);

const BackgroundGeolocationHeadlessTask = async event => {
  try {
    console.log(event.name);
    switch (event.name) {
      case 'location':
        let location = await BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          persist: false,
        });

        const { coords, timestamp, activity } = location;

        const oldLocations = useStore.getState().locations;

        const newLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: timestamp,
          activity: activity.type,
        };

        useStore.setState({
          locations: [...oldLocations, newLocation],
        });

        break;
    }
  } catch (error) {
    console.log('headless task', error);
  }
};

BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);
