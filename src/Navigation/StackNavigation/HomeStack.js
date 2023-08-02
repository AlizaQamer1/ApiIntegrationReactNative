import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../../screens/home';
import ProductCategories from '../../screens/Product/productCategories';
import ProductListing from '../../screens/Product/productListing';
import ProductDetail from '../../screens/Product/productDetails';
import PostListing from '../../screens/Post/postListing';
import PostDetail from '../../screens/Post/postDetail';
import User from '../../screens/User';

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="postListing">
      <Stack.Screen
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
      <Stack.Screen
        name="productCategory"
        component={ProductCategories}
        options={{
          // headerShown: false,
          title: 'Product Categories',
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
        name="productListing" 
        component={ProductListing}
        options={{
          title: 'Product Listing',
          
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
        name="productDetail"
        component={ProductDetail}
        options={{
          title: 'Product Details',
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
};

export default HomeStack;
