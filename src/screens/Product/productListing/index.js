import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';

import styles from './Style';
import Title from '../../../components/Title';
import {images} from '../../../assets/images';

export default function ProductListing() {
  const List = [
    {name: 'Product1', key: 2},
    {name: 'Product2', key: 1},
    {name: 'Product3', key: 3},
    {name: 'Product4', key: 4},
    {name: 'Product5', key: 5},
    {name: 'Product6', key: 6},
   
  ];

  const renderList = ({item, index}) => {
    return (
      <View style={styles.list}>
        <Image style={styles.image} source={images.automotive} />
        <Text style={[styles.listitem, styles.heading]}>{item.name}</Text>
        <Text style={styles.listitem}>Rating</Text>
        <Text style={styles.listitem}>$ price</Text>
      </View>
    );
  };
  return (
    <View style={styles.listing}>
      <Title title="Available Products" />
      <View style={styles.listingcontainer}>
        <FlatList data={List} renderItem={renderList} />
      </View>
    </View>
  );
}
