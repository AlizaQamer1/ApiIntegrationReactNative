import React from 'react';
import {View, Text, FlatList} from 'react-native';

import Title from '../../components/Title';
import styles from './Style';
export default function Home() {
  const List = [
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 1,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 2,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 3,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 4,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 5,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 6,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 7,
    },
    {
      name: 'Contents in this project Simple Custom GridView Layout Tutorial :',
      key: 8,
    },
  ];
  return (
    <View>
      <Title title={'Quotations That Inspire'} />
      <FlatList
        data={List}
        renderItem={({item}) => (
          <View style={styles.GridViewBlockStyle}>
            <Text style={styles.GridViewInsideTextItemStyle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
