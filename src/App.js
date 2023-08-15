import React, {useState} from 'react';

import AutheticationStack from './Navigation/StackNavigation/AuthenticationStack';  
import BottomStack from './Navigation/StackNavigation/BottomStack';
import SplashScreen from './splashScreen';
import {storage} from './Storage';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import rootReducer from './redux/store';
import { createStore } from 'redux';


const token = storage.getString('token');

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);


const App = () => {
  
  return(
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
       
       <Stack.Screen
          name="BottomStack"
          component={BottomStack}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthStack"
          component={AutheticationStack}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
       
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
};

export default App;