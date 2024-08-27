import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type RootTabParamList = {
    Scanner: undefined;
    Favorites: undefined;
    ProductDetail: { url: string };
};

type ProductDetailRouteProp = RouteProp<RootTabParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
    route: ProductDetailRouteProp;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    url: string;
}

const ProductDetail: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { url } = route.params;
    const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductDetails(url);
    }, [url]);

    useEffect(() => {
        if (fetchedProduct) {
            checkIfFavorite(fetchedProduct.id);
        }
    }), [fetchedProduct];

    const fetchProductDetails = async (url: string) => {
        try {
            console.log(url);
            const response = await fetch(url);
            const data: Product = await response.json();
            const productWithUrl = { ...data, url };
            setFetchedProduct(productWithUrl);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch product details:', error);
            setLoading(false);
        }
    };

    const checkIfFavorite = async (productId: number) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setIsFavorite(favorites.some((item: Product) => item.id === productId));
        } catch (error) {
            console.error('Failed to load favorites from storage', error);
        }
    };

    const toggleFavorite = async() => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            if (isFavorite) {
                favorites = favorites.filter((item: Product) => item.id !== fetchedProduct?.id);
            } else {
                if (fetchedProduct) {
                    favorites.push(fetchedProduct);
                }
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

            const updatedFavorites = await AsyncStorage.getItem('favorites');
            console.log('Updated favorites:', JSON.parse(updatedFavorites || '[]'));

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Failed to update favorites in storage', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!fetchedProduct) {
        return <Text>Failed to fetch product details</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: fetchedProduct.image }} style={styles.productImage} />
            <Text style={styles.title}>{fetchedProduct.title}</Text>
            <Text style={styles.category}>{fetchedProduct.category}</Text>
            <Text style={styles.price}>${fetchedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{fetchedProduct.description}</Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Text style={styles.favoriteButtonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    category: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#e63946',
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    favoriteButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});