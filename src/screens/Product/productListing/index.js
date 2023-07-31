import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useRoute} from '@react-navigation/native';

import styles from './Style';
import Title from '../../../components/Title';
import {productlisting} from '../../../helpers/GetApi';
import ProductListingSkeleton from '../../../skeleton/productListingSkeleton';

export default function ProductListing() {
  const [productListing, setProductListing] = useState();
  const route = useRoute();

  useEffect(() => {
    fetchProductListing();
  }, []);

  const fetchProductListing = async () => {
    try {
      const {category} = route.params || {};
      if (!category) {
        console.error('No category selected.');
        return;
      }

      const data = await productlisting(category);
      setProductListing(data);
    } catch (error) {
      console.error('Error fetching ProductListing:', error);
    }
  };

  const renderList = ({item, index}) => {
    return (
      productListing?
        
      <View style={styles.list}>
        <Image style={styles.image} source={{uri: item.thumbnail}} />

        <Text style={[styles.listitem, styles.heading]}>{item.title}</Text>

        <Rating
          style={styles.starcontainer}
          type="star"
          ratingCount={5}
          imageSize={25}
          readonly
          startingValue={item.rating}
        />
        <View style={styles.pricecontainer}>
          <Text style={[styles.listitem, styles.price]}>$ {item.price}</Text>
          <Text style={[styles.listitem, styles.discountedprice]}>
            $
            {(
              item.price -
              item.price * (item.discountPercentage / 100)
            ).toFixed(2)}
          </Text>
        </View>
      </View>
      :
      <ProductListingSkeleton/>

            
    );
  };
  return (
    <View style={styles.listing}>
      <Title title="Available Products" />
      <View style={styles.listingcontainer}>
        <FlatList data={productListing} renderItem={renderList} />
      </View>
    </View>
  );
}
