// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetail from '../../screens/Post/postDetail';
import PostListing from '../../screens/Post/postListing';
import User from '../../screens/User';

const Stack = createNativeStackNavigator();

export default function PostStack() {
  return (
      <Stack.Navigator
        initialRouteName="productCategories"
        screenOptions={{headerShown: false}}
        >
   <Stack.Screen
        name="postListing"
        component={PostListing}
        options={{
          title: 'Post Listing',
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
        name="postDetail"
        component={PostDetail}
        options={{
          title: 'Post Details',
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
        name="user"
        component={User}
        options={{
          title:"User",
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
  );
}

