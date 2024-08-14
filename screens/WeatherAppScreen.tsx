// WeatherAppScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import ForecastScreen from './ForecastScreen';
import CurrentWeatherScreen from './CurrentWeatherScreen';


const WeatherDrawer = createDrawerNavigator();

const WeatherAppScreen = () => {
    return (
        <WeatherDrawer.Navigator initialRouteName='CurrentWeather'>
            <WeatherDrawer.Screen name='CurrentWeather' component={CurrentWeatherScreen} />
            <WeatherDrawer.Screen name='Forecast' component={ForecastScreen} />
        </WeatherDrawer.Navigator>
    );
};

export default WeatherAppScreen;
