import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Vibration, Alert, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Battery from 'expo-battery';

export default function ShakeToChargeApp() {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [fakeBatteryLevel, setFakeBatteryLevel] = useState<number>(0);
    const lastShakeTime = useRef<number>(0); 

    const MAX_FORCE_THRESHOLD = 2.0; 
    const SHAKE_DETECTION_INTERVAL = 500; 

    useEffect(() => {
        (async () => {
            try {
                const level = await Battery.getBatteryLevelAsync();
                setBatteryLevel(Math.round(level * 100));
                setFakeBatteryLevel(Math.round(level * 100));
            } catch (error) {
                console.error("Error fetching battery level:", error);
            }
        })();
    }, []);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener(accelerometerData => {
            try {
                // Calculate the total force from accelerometer data
                const totalForce = Math.sqrt(
                    Math.pow(accelerometerData.x, 2) +
                    Math.pow(accelerometerData.y, 2) +
                    Math.pow(accelerometerData.z, 2)
                );

                const cappedForce = Math.min(totalForce, MAX_FORCE_THRESHOLD);

                const currentTime = Date.now();
                if (cappedForce > 1.7 && fakeBatteryLevel < 100 && (currentTime - lastShakeTime.current) > SHAKE_DETECTION_INTERVAL) {
                    lastShakeTime.current = currentTime;

                    setFakeBatteryLevel(prev => Math.min(prev + 1, 100));
                    Vibration.vibrate(100); // Provide feedback for the shake
                }
            } catch (error) {
                console.error("Error in accelerometer listener:", error);
                Alert.alert("Error", "An error occurred with the accelerometer.");
            }
        });

        return () => {
            subscription.remove();
        };
    }, [fakeBatteryLevel]);

    const getBatteryColor = () => {
        if (fakeBatteryLevel < 20) return 'red';
        if (fakeBatteryLevel < 50) return 'yellow';
        return 'green';
    };

    const handleSetBatteryLevel = (level: number) => {
        setFakeBatteryLevel(level);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.percentageText}>Battery: {fakeBatteryLevel}%</Text>

            {/* Buttons to manually set the battery level */}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Set to 10%" onPress={() => handleSetBatteryLevel(10)} color="#f53d3d" />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Set to 30%" onPress={() => handleSetBatteryLevel(30)} color="#f0ad4e" />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Reset" onPress={() => handleSetBatteryLevel(batteryLevel || 0)} color="#5bc0de" />
                </View>
            </View>

            <View style={styles.batteryWrapper}>
                <View style={styles.batteryCap} />
                <View style={styles.batteryContainer}>
                    <View
                        style={[
                            styles.batteryLevel,
                            { width: `${fakeBatteryLevel}%`, backgroundColor: getBatteryColor() }
                        ]}
                    />
                </View>
            </View>

            {fakeBatteryLevel === 100 && (
                <Text style={styles.fullChargedText}>Device Fully Charged!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    percentageText: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '80%',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
        elevation: 3, // Adds shadow for Android
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    batteryWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    batteryContainer: {
        width: 250,
        height: 100,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ccc',
    },
    batteryCap: {
        width: 20,
        height: 60,
        backgroundColor: '#000',
        marginLeft: 4,
        marginRight: -10,
        borderRadius: 5,
    },
    batteryLevel: {
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    fullChargedText: {
        marginTop: 20,
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
    },
});
