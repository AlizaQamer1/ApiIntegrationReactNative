import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation} from '@react-navigation/native';

import styles from './Style';


export default function Comments({username, title, image, id}) {
  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.commentcontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('user', {userId: id})
          }>
          <Image style={styles.image} source={{uri: image}} />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
    </ScrollView>
  );
}
