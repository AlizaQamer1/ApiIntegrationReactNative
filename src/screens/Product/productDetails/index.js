import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import { useRoute } from '@react-navigation/native';



import styles from './Style';
import {productdetail} from '../../../helpers/GetApi';
import { images } from '../../../assets/images';

export default function ProductDetail() {
  const [productDetails, setProductDetails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const route = useRoute();


  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      const { product } = route.params || {};
      if (!product) {
        console.error('No product selected.');
        return;
      }
      const data = await productdetail(product.id); 
      setProductDetails(data);
    } catch (error) {
      console.error('Error fetching Product Detail:', error.message);
    }
  };

  
  const handleNextImage = () => {
    if (productDetails.images && currentImageIndex < productDetails.images.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (productDetails.images && currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
    }
  };
  

  return (
    <ScrollView>
    <View style={{backgroundColor:"white"}}>
  
      <View style={styles.list}>
      {productDetails.images && productDetails.images.length > 0 ? (
            <Image
              style={styles.image}
              source={{ uri: productDetails.images[currentImageIndex] }}
            />
          ) : (
            <Text>No image available</Text> 
          )}
          
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
