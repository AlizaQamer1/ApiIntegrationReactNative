// import React, {useState, useEffect} from 'react';
// import {View, Text, Image, Button} from 'react-native';
// import styles from './Style';
// import {storage} from '../../Storage';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';


// export default function LoginUser() {
//     const [userData, setUserData] = useState([]);
  
//     useEffect(() => {
//       async function fetchUserData() {
//         try {
//           const id = await storage.getString('id');
//           // Replace the following fetch with Axios call to fetch user data based on the ID
//           const response = await axios.get(
//             `https://dummyjson.com/users/${id}/?limit=150`,
//           );
//           const data = response.data;
  
//           // Update the state with the fetched user data
//           setUserData(data);
         
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
  
//       fetchUserData();
//     }, []);
  
//     const navigation = useNavigation();
//     const buttonPress = async () => {
//         const id = await storage.getString('id');
      
//         // Clear the tasks associated with the logged-out user from local storage
//         storage.delete(localStorageKey);  // Use the variable localStorageKey
      
//         // Clear the completed tasks associated with the logged-out user from local storage
//         const completedTodos = JSON.parse(storage.getString('completedTodos') || '{}');
//         delete completedTodos[id];
//         storage.set('completedTodos', JSON.stringify(completedTodos));
      
//         // Clear the user ID and navigate to the AuthStack
//         storage.delete('token');
//         storage.delete('id');
//         navigation.replace('AuthStack');
//       };
  
//   return (
//     <View style={styles.container}>
  
//       <View style={{flexDirection: 'row'}}>
//         <Image source={{uri: userData.image}} style={styles.image} />
//         <View style={styles.user}>
//           <Text style={styles.text}>{userData.firstName}</Text>
//           <Text style={{color: 'black'}}>{userData.lastName}</Text>
//         </View>
//       </View>
//        <Text style={[styles.text, styles.userinfo]}>
//         Username: {userData.username}
//       </Text>
     
//       <Text style={[styles.text, styles.userinfo]}>
//         Email: {userData.email}
//       </Text>
       
//       <Text style={[styles.text, styles.userinfo]}>Age: {userData.age}</Text>
//       <Text style={[styles.text, styles.userinfo]}>
//         Gender: {userData.gender}
//       </Text>
//       <Text style={[styles.text, styles.userinfo]}>
//         BirthDate: {userData.birthDate}
//       </Text>
      
//       <Text style={[styles.text, styles.userinfo]}>
//         Address: {userData?.address?.address}

//       </Text>
//       <Button title="logout" onPress={buttonPress} />
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from './Style';
import { storage } from '../../Storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const localStorageKey = 'todos'; // Or a different key if needed

export default function LoginUser() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = await storage.getString('id');
      if (!id) {
        setUserData({});
        return;
      }

      const response = await axios.get(`https://dummyjson.com/users/${id}/?limit=150`);
      const data = response.data;

      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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
        <Image source={{ uri: userData.image }} style={styles.image} />
        <View style={styles.user}>
          <Text style={styles.text}>{userData.firstName}</Text>
          <Text style={{ color: 'black' }}>{userData.lastName}</Text>
        </View>
      </View>
      <Text style={[styles.text, styles.userinfo]}>Username: {userData.username}</Text>
      <Text style={[styles.text, styles.userinfo]}>Email: {userData.email}</Text>
      <Text style={[styles.text, styles.userinfo]}>Age: {userData.age}</Text>
      <Text style={[styles.text, styles.userinfo]}>Gender: {userData.gender}</Text>
      <Text style={[styles.text, styles.userinfo]}>BirthDate: {userData.birthDate}</Text>
      <Text style={[styles.text, styles.userinfo]}>Address: {userData?.address?.address}</Text>
      <Button title="logout" onPress={buttonPress} />
    </View>
  );
}
