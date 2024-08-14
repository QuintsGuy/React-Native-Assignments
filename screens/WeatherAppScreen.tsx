// WeatherAppScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type WeatherAppScreenNavigationProp = DrawerNavigationProp<{}>

const WeatherAppScreen = () => {
    const navigation = useNavigation<WeatherAppScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather App</Text>
            <Button
                title="Open Left Drawer"
                onPress={() => navigation.openDrawer()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default WeatherAppScreen;
