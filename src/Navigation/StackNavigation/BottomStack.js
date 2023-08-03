import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from '../../screens/home';
import ProductCategories from '../../screens/Product/productCategories';
import PostListing from '../../screens/Post/postListing';
import User from '../../screens/User';
import ProductStack from '../ProductStack';
import PostStack from './PostStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomStack = ({navigation}) => {
  return (
    
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#0492C2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="productStack"
        component={ProductStack}
        options={{
          // headerShown: false,
          title: 'Products',
          headerStyle: {
            backgroundColor: '#0492C2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
     
      
        <Tab.Screen
        name="postStack"
        component={PostStack}
        options={{
          title: 'Post ',
          headerStyle: {
            backgroundColor: '#0492C2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
       
       
    </Tab.Navigator>
   
  );
};

export default BottomStack;
