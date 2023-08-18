import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useRoute} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons/faShoppingCart';

import styles from './Style';
import {productdetail} from '../../../helpers/GetApi';
import {images} from '../../../assets/images';
import ProductDetailSkeleton from '../../../skeleton/productDetailSkeleton';
import {productDetailSuccess} from '../../../redux/productactions';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  addToAddedToCartMap,
} from '../../../redux/cartactions';
import {logToConsole} from '../../../../ReactotronConfig';

export default function ProductDetail({navigation}) {
  const [productDetails, setProductDetails] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const dispatch = useDispatch();
  const addedToCartMap = useSelector(state => state.cart.addedToCartMap);
  const cartCount = useSelector(state => state.cart.cartCount);
  const productData = useSelector(state => state?.product?.productData);
  console.log('product detail', productData);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const addToCartItem = item => {
    dispatch(addProductToCart(item));
    dispatch(addToAddedToCartMap(item.id));
  };

  const fetchProductDetail = async () => {
    try {
      const {product} = route.params || {};
      if (!product) {
        console.error('No product selected.');
        return;
      }
      const data = await productdetail(product.id);
      dispatch(productDetailSuccess(data));
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Product Detail:', error.message);
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    if (
      productDetails.images &&
      currentImageIndex < productDetails.images.length - 1
    ) {
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
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backicon} source={images.backarrow} />
        </TouchableOpacity>
        <View style={styles.cartbutton}>
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <FontAwesomeIcon icon={faShoppingCart} size={25} color="teal" />
          </TouchableOpacity>
          <Text style={styles.cartnumbering}>{cartCount}</Text>
        </View>
        {loading ? (
          <ProductDetailSkeleton />
        ) : (
          <View style={styles.list}>
            {productDetails.images && productDetails.images.length > 0 ? (
              <Image
                style={styles.image}
                source={{uri: productDetails.images[currentImageIndex]}}
              />
            ) : (
              <Text>No image available</Text>
            )}

            <View style={styles.icons}>
              <TouchableOpacity onPress={handlePreviousImage}>
                <Image style={styles.icon} source={images.righticon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextImage}>
                <Image style={styles.icon} source={images.lefticon} />
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
            <View
              style={{marginLeft: 'auto', marginRight: 16, marginVertical: 10}}>
              <Button
                onPress={() => addToCartItem(productDetails)}
                title="Add to Cart"
                disabled={addedToCartMap[productDetails.id]}
              />
            </View>

            <View style={styles.pricecontainer}>
              <Text
                style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
                Price:
              </Text>
              <Text style={[styles.listitem, styles.price]}>
                $ {productDetails.price}
              </Text>
              <Text style={[styles.listitem, styles.discountedprice]}>
                $
                {(
                  productDetails.price -
                  productDetails.price *
                    (productDetails.discountPercentage / 100)
                ).toFixed(2)}
              </Text>
            </View>
            <View style={styles.brandcontainer}>
              <Text
                style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
                Brand:
              </Text>
              <Text style={styles.listitem}>{productDetails.brand}</Text>
            </View>
            <View style={styles.instockcontainer}>
              <Text
                style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
                In Stock:
              </Text>
              <Text style={styles.listitem}>{productDetails.stock}</Text>
            </View>
            <Text
              style={[styles.listitem, (style = {color: 'rgb(86, 89, 89)'})]}>
              Description:
            </Text>
            <Text style={styles.listitem}>{productDetails.description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
