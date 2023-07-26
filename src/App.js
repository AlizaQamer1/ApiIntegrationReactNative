import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './screens/login';
import Registeration from './screens/registration';
import Forgotpassword from './screens/forgotPassword';
import Home from './screens/home';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home', 
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
