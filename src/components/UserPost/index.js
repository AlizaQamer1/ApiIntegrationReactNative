import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

import styles from './Style';

export default function UserPost({ image, title, body, reactions, post }) {
  const navigation = useNavigation();

  const handlePostClick = () => {
    navigation.push('postDetail', { post });
    console.log(post)
  };

  const handleImageClick = () => {
    navigation.push('user', { userId: post?.user?.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image style={styles.image} source={{ uri: image }} />
        </TouchableOpacity>

        <Text style={[styles.listitem, styles.heading]}>{title}</Text>
      </View>
      <Text style={[styles.listitem, styles.body]}>{body}</Text>
      <View style={styles.likingcontainer}>
        <Rating
          style={styles.starcontainer}
          type="heart"
          ratingCount={1}
          imageSize={25}
          readonly
          startingValue={1}
        />
        <Text style={styles.reaction}>{reactions}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePostClick}>
        <Text style={styles.buttonText}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
}
