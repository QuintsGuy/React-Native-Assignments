// screens/PhotoGallery.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

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
      <FlatList
        data={filteredPhotos}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePhotoPress(item)}>
            <Image source={{ uri: item.url }} style={styles.photo} />
          </TouchableOpacity>
        )}
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
