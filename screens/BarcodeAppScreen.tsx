// BarcodeAppScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import FavoritesScreen from './ProductFavorites';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from './ProductDetail';

type RootStackParamList = {
    BarcodeAppTabs: undefined;
    ProductDetail: { product: Product };
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
};

const BarcodeTab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const BarcodeAppScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BarcodeAppTabs" component={BarcodeAppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}

const BarcodeAppTabs = () => {
    return (
        <BarcodeTab.Navigator 
            initialRouteName='Scanner'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;        
                    if (route.name === 'Scanner') {
                        iconName = focused ? 'scan-circle' : 'scan-circle-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }
                    return <Icon name={iconName || 'help-circle-outline'} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
            <BarcodeTab.Screen name='Scanner' component={BarcodeScannerScreen} />
            <BarcodeTab.Screen name='Favorites' component={FavoritesScreen} />
        </BarcodeTab.Navigator>
    );
};

export default BarcodeAppScreen;
