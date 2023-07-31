import React from 'react';

// Import Navigators from React Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Import Screens

import CustomDrawer from './CustomDrawer';
import Home from '../../screens/home';
import NavigationDrawerHeader from './NavigationDrawerHeader';


const NativeStack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <NativeStack.Navigator initialRouteName="Home">
      <NativeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#0492C2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </NativeStack.Navigator>
  );
};

const DrawerNavigation = (props) => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen
        name="HomeStack"
        options={{ drawerLabel: 'Home Screen' }}
        component={HomeStack}
      />
    </NativeStack.Navigator>
  );
};

export default DrawerNavigation;

