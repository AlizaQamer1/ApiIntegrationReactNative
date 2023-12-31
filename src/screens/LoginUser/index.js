import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from './Style';
import {storage} from '../../Storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const localStorageKey = 'todos'; // Or a different key if needed

export default function LoginUser() {
  const userData_ = useSelector(state => state?.auth?.userData);

  console.log('userData::::', userData_);

  const navigation = useNavigation();
  const buttonPress = async () => {
    const id = await storage.getString('id');

    // Clear the tasks associated with the logged-out user from local storage
    storage.delete(`todos_${id}`);

    // Clear the completed tasks associated with the logged-out user from local storage
    const completedTodos = JSON.parse(
      storage.getString('completedTodos') || '{}',
    );
    delete completedTodos[id];
    storage.set('completedTodos', JSON.stringify(completedTodos));

    // Clear the user ID and navigate to the AuthStack
    storage.delete('token');
    storage.delete('id');
    navigation.replace('AuthStack');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: userData_?.image}} style={styles.image} />
        <View style={styles.user}>
          <Text style={styles.text}>{userData_?.additionalData.firstName}</Text>
          <Text style={{color: 'black', marginLeft:2}}>
            {userData_?.additionalData.maidenName}
          </Text>
          <Text style={{color: 'black', marginLeft:2}}>
            {userData_?.additionalData.lastName}
          </Text>
       
        </View>
      </View>
      <Text style={[styles.text, styles.userinfo]}>
        Username: {userData_?.additionalData.userName}
      </Text>
      <Text style={[styles.text, styles.userinfo]}>User Role: {userData_?.additionalData.userRole}</Text>
      <Text style={[styles.text, styles.userinfo]}>
        Email: {userData_?.additionalData.email}
      </Text>

      <Text style={[styles.text, styles.userinfo]}>
        Gender: {userData_?.additionalData.gender}
      </Text>

      <Text style={[styles.text, styles.userinfo]}>Age: {userData_?.additionalData.age}</Text>
      <Text style={[styles.text, styles.userinfo]}>Phone: {userData_?.additionalData.phone}</Text>
      <View style={styles.infobutton}>
        <Button
          title="Edit Profile Information"
          color="teal"
          onPress={() => navigation.navigate('profileinfo')}
        />
      </View>
      <Button title="logout" onPress={buttonPress} />
    </View>
  );
}
