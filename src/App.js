import React, {useState} from 'react';

import AutheticationStack from './Navigation/StackNavigation/AuthenticationStack';  
import HomeStack from './Navigation/StackNavigation/HomeStack';
import SplashScreen from './splashScreen';
import {storage} from './Storage';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const token = storage.getString('token');

const Stack = createNativeStackNavigator();


const App = () => {
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="AuthStack"
          component={AutheticationStack}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
