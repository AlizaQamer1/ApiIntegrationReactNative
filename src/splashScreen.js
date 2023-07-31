import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';

import {storage} from './Storage';
import { images } from './assets/images';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      const token = storage.getString('token');
      token ? navigation.replace('HomeStack') : navigation.replace('AuthStack');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={images.logo_image}
        style={{width: '30%', resizeMode: 'contain', margin: 30}}
      />
      <Text>Welcome to ApiIntegration</Text>
      <ActivityIndicator
        animating={animating}
        color="black"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
