import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
            const getBarCodeScannerPermissions = async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            };

        getBarCodeScannerPermissions();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
        // Only allow QR codes
        if (type === BarCodeScanner.Constants.BarCodeType.qr) {
            setScanned(true);
            alert(`QR code with data ${data} has been scanned!`);
        } else {
            alert('Only QR codes are allowed.');
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