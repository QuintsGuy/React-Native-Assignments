// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WeatherAppScreen from './screens/WeatherAppScreen';
import HomeScreen from './screens/HomeScreen';
import PhotoGalleryScreen from './screens/PhotoGalleryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeAppScreen from './screens/BarcodeAppScreen';
import PhoneStatusScreen from './screens/PhoneStatusScreen';

export type RootStackParamList = {
  Home: undefined;
  PhotoGallery: undefined;
  PhotoDetail: { photo: { id: number; url: string } };
  PhotoModal: { photo: { id: number; url: string } };
  WeatherApp: undefined;
  BarcodeScanner: undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
      <Drawer.Screen name="BarcodeScanner" component={BarcodeAppScreen} />
      <Drawer.Screen name="PhoneStatus" component={PhoneStatusScreen} />
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
