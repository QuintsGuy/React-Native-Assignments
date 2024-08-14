// screens/ForecastScreen.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForecastTab from './ForecastTab';

const Tab = createMaterialTopTabNavigator();

const ForecastScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Today" component={() => <ForecastTab days={1} />} />
            <Tab.Screen name="3 Days" component={() => <ForecastTab days={3} />} />
            <Tab.Screen name="7 Days" component={() => <ForecastTab days={7} />} />
        </Tab.Navigator>
    );
};

export default ForecastScreen;
