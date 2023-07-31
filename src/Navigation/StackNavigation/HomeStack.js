import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../../screens/home';
import ProductCategories from '../../screens/Product/productCategories';
import ProductListing from '../../screens/Product/productListing';
import ProductDetail from '../../screens/Product/productDetails';

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="productDetail">
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
};

export default HomeStack;
