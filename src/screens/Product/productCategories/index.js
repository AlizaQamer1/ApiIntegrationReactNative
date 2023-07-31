
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './Style';

import { images } from '../../../assets/images';
import Title from '../../../components/Title';
import ProductCategorySkeleton from '../../../skeleton/productCategorySkeleton';
import { productcategories } from '../../../helpers/GetApi';


export default function ProductCategories() {
  const [productCategory, setProductCategory] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const data = await productcategories();
      setProductCategory(data);
    } catch (error) {
      console.error('Error fetching ProductCategories:', error);
    }
  };

 
  const productImages = [
    images.smartphone,
    images.laptops,
    images.fragnance,
    images.skincare,
    images.groceries,
    images.homedecoration,
    images.furniture,
    images.tops,
    images.womendresses,
    images.womenshoes,
    images.menshirt,
    images.menshoes,
    images.menwatches,
    images.womenwatches,
    images.womenbags,
    images.womenjewerly,
    images.sunglasses,
    images.automotive,
    images.motorcycle,
    images.lighting,
  ];

  const handleItemPress = (category) => {
    navigation.navigate('productListing', { category });
  };

  return (
    <View style={styles.category}>
      <Title title="Available Products On Our Store" />
      <View style={styles.categorycontainer}>
        <FlatList
          data={productCategory}
          renderItem={({ item, index }) => (
            <View style={styles.list}>
              {item ? ( 
                <>
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <Image style={styles.image} source={productImages[index]} />
                    <Text style={styles.listitem}>{item}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <ProductCategorySkeleton />
              )}
            </View>
          )}
          numColumns={2}
        />
      </View>
    </View>
  );
}
