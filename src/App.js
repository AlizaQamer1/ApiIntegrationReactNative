import React, {useState} from 'react';
import { Text } from 'react-native';
import AutheticationStack from './Navigation/StackNavigation/AuthenticationStack';  
import BottomStack from './Navigation/StackNavigation/BottomStack';
import SplashScreen from './splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'



const Stack = createNativeStackNavigator();



const App = () => {
  
  return(
    <Provider store={store}>
     <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
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
    </PersistGate>
    </Provider>
  )
};

export default App;