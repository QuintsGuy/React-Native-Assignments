// screens/PhotoModalScreen.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type PhotoModalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoModal'>;
type PhotoModalScreenRouteProp = RouteProp<RootStackParamList, 'PhotoModal'>;

interface PhotoModalScreenProps {
  navigation: PhotoModalScreenNavigationProp;
  route: PhotoModalScreenRouteProp;
}

const PhotoModalScreen: React.FC<PhotoModalScreenProps> = ({ navigation, route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/close-window.png' }} style={styles.closeIcon} />
      </TouchableOpacity>
      <Image source={{ uri: photo.url }} style={styles.fullscreenPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  fullscreenPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default PhotoModalScreen;
