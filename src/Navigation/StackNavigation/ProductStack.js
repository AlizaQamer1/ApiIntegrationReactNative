// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetail from '../../screens/Product/productDetails';
import ProductListing from '../../screens/Product/productListing';
import AddProductCategory from '../../screens/addProductCategory';
import ProductCategories from '../../screens/Product/productCategories';
import AddToCart from '../../screens/addToCart';

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
       
        <Stack.Screen
        name="addproductcategory"
        component={AddProductCategory}
        options={{
          title: 'AddProductCategory',
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
        name="cart"
        component={AddToCart}
        options={{
          title: 'cart',
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

