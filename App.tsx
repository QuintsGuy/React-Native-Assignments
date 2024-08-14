// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhotoDetailScreen from './screens/PhotoDetailScreen';
import PhotoModalScreen from './screens/PhotoModalScreen';
import WeatherAppScreen from './screens/WeatherAppScreen';
import HomeScreen from './screens/HomeScreen';
import PhotoGalleryScreen from './screens/PhotoGalleryScreen';

export type RootStackParamList = {
  Home: undefined;
  PhotoGallery: undefined;
  PhotoDetail: { photo: { id: number; url: string } };
  PhotoModal: { photo: { id: number; url: string } };
  WeatherApp: undefined;
};

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
      <Drawer.Screen name="WeatherApp" component={WeatherAppScreen} />
    </Drawer.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <MainDrawerNavigation />
    </NavigationContainer>
  );
};

export default App;
