// screens/CurrentWeatherScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import useWeather from '../hooks/useWeather';

const CurrentWeatherScreen = () => {
    const { weatherData, loading } = useWeather('North Kingstown');

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!weatherData) {
        return <Text>Unable to fetch weather data</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.location}>{weatherData.location.name}</Text>
            <Text style={styles.temp}>{weatherData.current.temp_c}°C</Text>
            <Text style={styles.description}>{weatherData.current.condition.text}</Text>
            <Image source={{ uri: `https:${weatherData.current.condition.icon}` }} style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        fontSize: 24,
        marginBottom: 10,
    },
    temp: {
        fontSize: 48,
        marginBottom: 10,
    },
    description: {
        fontSize: 20,
        marginBottom: 10,
    },
    icon: {
        width: 100,
        height: 100,
    },
});

export default CurrentWeatherScreen;
