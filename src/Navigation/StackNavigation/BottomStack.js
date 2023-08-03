import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../../screens/home';
import Todo from '../../screens/todo';
import ProductStack from './ProductStack';
import PostStack from './PostStack';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: 'tomato',
        tabBarIcon: () => {
         
          return <AntDesign name={'home'} size={24} color="green" />;
        },
      })}
    >
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
          title: 'Post',
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
