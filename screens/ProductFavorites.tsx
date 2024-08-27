import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';

type RootTabParamList = {
    Scanner: undefined;
    Favorites: undefined;
    ProductDetail: { url: string };
};

type FavoritesScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Favorites'>;

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    url: string;
}

const FavoritesScreen = () => {
    const navigation = useNavigation<FavoritesScreenNavigationProp>();
    const [favorites, setFavorites] = useState<Product[]>([]);  // Initialize state to hold favorites

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(favorites);
        } catch (error) {
            console.error('Failed to load favorites from storage', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductDetail', { url: item.url })}
                        style={styles.itemContainer}
                    >
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        flexDirection: 'row', // Aligns image and text in a row
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center', // Aligns image and text vertically
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8, // Slightly rounded corners for the image
        marginRight: 16, // Space between image and text
    },
    textContainer: {
        flex: 1, // Take up the remaining space after the image
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e63946',
    },
});