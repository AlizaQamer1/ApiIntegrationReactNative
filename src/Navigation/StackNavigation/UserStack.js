import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EditUserProfile from '../../screens/editUserProfile';
import LoginUser from '../../screens/LoginUser';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
 
      <Stack.Navigator initialRouteName="user" >
      <Stack.Screen
        name="user"
        component={LoginUser}
        options={{
          title: 'user', 
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0492C2', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
        <Stack.Screen
        name="profileinfo"
        component={EditUserProfile}
        options={{
          title: 'profileinfo', 
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0492C2', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
       
      </Stack.Navigator>
   
  );
};

export default UserStack;
