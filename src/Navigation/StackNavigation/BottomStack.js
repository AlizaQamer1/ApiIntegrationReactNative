import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import Todo from '../../screens/todo';
import ProductStack from './ProductStack';
import PostStack from './PostStack';
import LoginUser from '../../screens/LoginUser';
import {images} from '../../assets/images';
import {Image} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomStack = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? images.homefilled : images.homeunfilled}
              style={{
                width: 25,
                height: 25,
             
              }}
            />
          ),
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
          title: 'Products',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image 
            source={focused ? images.productfilled : images.productunfilled}
             style={{width: 25, height: 25}} />
          ),
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
          title: 'Post',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image 
            source={focused ? images.postfilled : images.postunfilled}
             style={{width: 25, height: 25}} />
          ),
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
        name="todo"
        component={Todo}
        options={{
          title: 'Todo',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image 
            source={focused ? images.todofilled : images.todounfilled}
             style={{width: 25, height: 25}} />
          ),
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
        name="user"
        component={LoginUser}
        options={{
          title: 'User',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image 
            source={focused ? images.userfilled : images.userunfilled}
             style={{width: 25, height: 25}} />
          ),
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
