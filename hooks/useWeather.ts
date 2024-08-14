// hooks/useWeather.ts
import { useState, useEffect } from 'react';

interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                condition: {
                text: string;
                icon: string;
                };
            };
        }>;
    };
}

const useWeather = (location: string) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=4cae56e87b714703b9a182404241408&q=${location}&days=7`
            );
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchWeather();
    }, [location]);

    return { weatherData, loading };
};

export default useWeather;
