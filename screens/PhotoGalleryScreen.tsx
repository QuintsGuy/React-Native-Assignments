// screens/PhotoGallery.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface Photo {
  id: number;
  url: string;
}

type PhotoGalleryNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoGallery'>;

interface PhotoGalleryProps {
  navigation: PhotoGalleryNavigationProp;
}

const PhotoGalleryScreen: React.FC<PhotoGalleryProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const marginVertical = useSharedValue(5);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const fetchPhotos = () => {
      const images: Photo[] = [];
      for (let i = 1; i < 70; i++) {
        images.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
      }
      setPhotos(images);
    };

    fetchPhotos();
  }, []);
  
  const filteredPhotos = photos.filter(photo => photo.id.toString().includes(searchTerm));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const newMargin = 5 + event.contentOffset.y / 30;
      const newRotation = event.contentOffset.y / 10;
      
      marginVertical.value = Math.min(Math.max(newMargin, 5), 20);
      rotation.value = newRotation % 360; // Rotate images within 360 degrees
    },
  });
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: marginVertical.value,
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('PhotoDetail', { photo });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search photos by ID"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Animated.FlatList
        contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}
        data={filteredPhotos}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => handlePhotoPress(item)}>
            <Animated.Image 
              sharedTransitionTag={`tag-${item.url}`} 
              source={{ uri: item.url }} 
              style={[styles.photo, animatedStyle]} 
            />
          </TouchableOpacity>
        )}
        onScroll={scrollHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default PhotoGalleryScreen;
