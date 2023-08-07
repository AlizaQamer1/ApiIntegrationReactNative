import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './Style';

import { images } from '../../../assets/images';
import Title from '../../../components/Title';
import HomeSkeleton from '../../../skeleton/homeSkeleton';
import { productcategories } from '../../../helpers/GetApi';
import ProductCategorySkeleton from '../../../skeleton/productCategorySkeleton';

export default function ProductCategories() {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const data = await productcategories();
      setLoading(false);
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
    <View style={{ backgroundColor: 'white' }}>
      <Title title="Available Products On Our Store" />
      <View style={styles.categorycontainer}>
      {!loading ? (
        <FlatList
          data={productCategory}
          renderItem={({ item, index }) => (
            <View style={styles.list}>
           
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                  <Image style={styles.image} source={productImages[index]} />
                  <Text style={styles.listitem}>{item}</Text>
                </TouchableOpacity>
             
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
         ) : (
                <ProductCategorySkeleton />
              )}
      </View>
    </View>
  );
}