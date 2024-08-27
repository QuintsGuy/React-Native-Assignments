import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Scanner: undefined;
    ProductDetail: { url: string };
    Favorites: undefined;
};

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

type BarcodeScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scanner'>;

const BarcodeScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation<BarcodeScannerScreenNavigationProp>();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setScanned(false);
        }, [])
    );
    
    const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        setScanned(true);
        try {
            const url = data.trim();
            navigation.navigate('ProductDetail', { url });
        } catch (error) {
            console.error('Failed to handle QR code data:', error);
        }
    };
    
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

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

export default BarcodeScannerScreen;