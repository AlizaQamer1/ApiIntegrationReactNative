import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import styles from './Style';
import { images } from '../../../assets/images';
import Title from '../../../components/Title';
import { productCategorySuccess } from '../../../redux/productactions';
import { productcategories } from '../../../helpers/GetApi';
import ProductCategorySkeleton from '../../../skeleton/productCategorySkeleton';

export default function ProductCategories() {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const productData_ = useSelector(state => state?.product?.productData);
  console.log("product category data",productData_)

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const data = await productcategories();
      dispatch(productCategorySuccess(data))
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
    <View style={{flex:1, backgroundColor: 'white' }}>
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