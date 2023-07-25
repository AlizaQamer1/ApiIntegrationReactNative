import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Registeration from './screens/Registration';
import Forgotpassword from './screens/ForgotPassword';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login', 
          headerStyle: {
            backgroundColor: '#52B2BF', 
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
            backgroundColor: '#52B2BF', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
        <Stack.Screen
        name="ForgotPassword"
        component={Forgotpassword}
        options={{
          title: 'ForgotPassword', 
          headerStyle: {
            backgroundColor: '#52B2BF', 
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

export default App;
