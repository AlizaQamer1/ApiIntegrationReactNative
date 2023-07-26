import React from 'react';
import {View, Text, FlatList, Button, Alert} from 'react-native';

import Title from '../../components/Title';
import styles from './Style';
import { storage } from '../../Storage';
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

  const token=storage.getString("token")
token?
  Alert.alert(token)
  :null
  

  return (
    <View>
    <Button title="logout" onPress={()=>storage.delete("token")}/>
   
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
