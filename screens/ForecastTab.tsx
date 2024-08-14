// screens/ForecastTab.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import useWeather from '../hooks/useWeather';

interface ForecastTabProps {
    days: number;
}

const ForecastTab: React.FC<ForecastTabProps> = ({ days }) => {
    const { weatherData } = useWeather('North Kingstown');

    if (!weatherData) {
        return <Text>Unable to fetch weather data</Text>;
    }

    const forecast = weatherData.forecast.forecastday.slice(0, days);

    return (
        <FlatList
        data={forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
            <View style={styles.container}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.temp}>
                    {item.day.maxtemp_c}°C / {item.day.mintemp_c}°C
                </Text>
                <Text style={styles.description}>{item.day.condition.text}</Text>
                <Image source={{ uri: `https:${item.day.condition.icon}` }} style={styles.icon} />
            </View>
        )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    date: {
        fontSize: 18,
        marginBottom: 5,
    },
    temp: {
        fontSize: 16,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    icon: {
        width: 50,
        height: 50,
    },
});

export default ForecastTab;
