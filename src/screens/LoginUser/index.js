
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from './Style';
import { storage } from '../../Storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const localStorageKey = 'todos'; // Or a different key if needed



export default function LoginUser() {
  const [userData, setUserData] = useState({});
  const userData_ = useSelector(state => state?.auth?.userData);

  console.log('userData::::',userData_);


  const navigation = useNavigation();
  const buttonPress = async () => {
    const id = await storage.getString('id');

    // Clear the tasks associated with the logged-out user from local storage
    storage.delete(`todos_${id}`);

    // Clear the completed tasks associated with the logged-out user from local storage
    const completedTodos = JSON.parse(storage.getString('completedTodos') || '{}');
    delete completedTodos[id];
    storage.set('completedTodos', JSON.stringify(completedTodos));

    // Clear the user ID and navigate to the AuthStack
    storage.delete('token');
    storage.delete('id');
    navigation.replace('AuthStack');
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: userData_?.image }} style={styles.image} />
        <View style={styles.user}>
          <Text style={styles.text}>{userData_?.firstName}</Text>
          <Text style={{ color: 'black' }}>{userData_?.lastName}</Text>
        </View>
      </View>
      <Text style={[styles.text, styles.userinfo]}>Username: {userData_?.username}</Text>
      <Text style={[styles.text, styles.userinfo]}>Email: {userData_?.email}</Text>
     
      <Text style={[styles.text, styles.userinfo]}>Gender: {userData_?.gender}</Text>
     
      <Button title="logout" onPress={buttonPress} />
    </View>
  );
}

 {/* <Text style={[styles.text, styles.userinfo]}>Age: {userData_.age}</Text> */}

 {/* <Text style={[styles.text, styles.userinfo]}>BirthDate: {userData_.birthDate}</Text>
      <Text style={[styles.text, styles.userinfo]}>Address: {userData_?.address?.address}</Text> */}