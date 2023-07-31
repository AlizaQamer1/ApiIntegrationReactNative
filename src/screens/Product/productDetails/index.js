import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import {  Icon } from 'react-native-elements';


import styles from './Style';
import {productdetail} from '../../../helpers/GetApi';
import { images } from '../../../assets/images';

export default function ProductDetail() {
  const [productDetails, setProductDetails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const data = await productdetail();
      setProductDetails(data);
    } catch (error) {
      console.error('Error fetching ProductDetails:', error);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < productDetails.images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  
  

  return (
    <ScrollView>
    <View style={styles.detail}>
  
      <View style={styles.list}>
      <Image style={styles.image} source={{uri: productDetails.images[currentImageIndex]}} />
      <View style={styles.icons}>
    <TouchableOpacity onPress={handlePreviousImage}>
        <Image style={styles.icon} source={images.righticon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextImage}>
        <Image style={styles.icon} source={images.lefticon}/>
        </TouchableOpacity>
      </View>
        <Text style={[styles.listitem, styles.heading]}>
       
          {productDetails.title}
        </Text>
        <Text style={[styles.listitem, styles.categoryname]}>
          {productDetails.category}
        </Text>
        <View style={styles.ratingcontainer}>
          <Text style={styles.listitem}>{productDetails.rating}</Text>
          <Rating
          style={styles.starcontainer}
          type="star"
          ratingCount={5}
          imageSize={25}
          readonly
          startingValue={productDetails.rating}
        />
        </View>
        <Text style={styles.horizontalline}></Text>
        <View style={styles.pricecontainer}>
          <Text style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
            Price:
          </Text>
          <Text style={[styles.listitem,styles.price]}>$ {productDetails.price}</Text>
          <Text style={[styles.listitem,styles.discountedprice]}>
         
            $
            {(
              productDetails.price -
              productDetails.price * (productDetails.discountPercentage / 100)
            ).toFixed(2)}
          </Text>
        </View>
        <View style={styles.brandcontainer}>
          <Text style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
            Brand:
          </Text>
          <Text style={styles.listitem}>{productDetails.brand}</Text>
        </View>
        <View style={styles.instockcontainer}>
          <Text style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
            In Stock:
          </Text>
          <Text style={styles.listitem}>{productDetails.stock}</Text>
        </View>
        <Text style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
          Description:
        </Text>
        <Text style={styles.listitem}>{productDetails.description}</Text>
      </View>
    </View>
    </ScrollView>
  );
}
