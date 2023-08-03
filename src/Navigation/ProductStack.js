// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetail from '../screens/Product/productDetails';
import ProductListing from '../screens/Product/productListing';
import ProductCategories from '../screens/Product/productCategories';

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  return (
      <Stack.Navigator
        initialRouteName="productCategories"
        screenOptions={{headerShown: false}}
        >
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
      </Stack.Navigator>
  );
}

