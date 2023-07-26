import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login';
import Registeration from '../screens/registration';
import ForgotPassword from '../screens/forgotPassword';

const Stack = createNativeStackNavigator();

const AutheticationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login', 
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
        name="Register"
        component={Registeration}
        options={{
          title: 'Register', 
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
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'ForgotPassword', 
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
    </NavigationContainer>
  );
};

export default AutheticationStack;
