// screens/PhotoDetailScreen.tsx
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type PhotoDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoDetail'>;
type PhotoDetailScreenRouteProp = RouteProp<RootStackParamList, 'PhotoDetail'>;

interface PhotoDetailScreenProps {
  navigation: PhotoDetailScreenNavigationProp;
  route: PhotoDetailScreenRouteProp;
}

const PhotoDetailScreen: React.FC<PhotoDetailScreenProps> = ({ navigation, route }) => {
  const photo = route.params?.photo;

  if (!photo) {
    return (
      <View style={styles.container}>
        <Text>No Photo Available</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.url}>{photo.url}</Text>
      <Image source={{ uri: photo.url }} style={styles.photo} />
      <Button title="Open in Fullscreen" onPress={() => navigation.navigate('PhotoModal', { photo })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  url: {
    marginBottom: 10,
    fontSize: 16,
  },
  photo: {
    width: 300,
    height: 300,
  },
});

export default PhotoDetailScreen;
