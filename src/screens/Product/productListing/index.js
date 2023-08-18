import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useRoute, useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons/faShoppingCart';

import styles from './Style';
import Title from '../../../components/Title';
import {productlisting} from '../../../helpers/GetApi';
import ProductListingSkeleton from '../../../skeleton/productListingSkeleton';
import {images} from '../../../assets/images';
import {productListingSuccess} from '../../../redux/productactions';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  addToAddedToCartMap,

} from '../../../redux/cartactions';

export default function ProductListing() {
  const [productListing, setProductListing] = useState();
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addedToCartMap = useSelector(state => state.cart.addedToCartMap);
  const cartCount = useSelector(state => state.cart.cartCount);
  const productData_ = useSelector(state => state?.product?.productData);
  console.log('product listing data', productData_);

  const handleAddToCart = item => {
    dispatch(addProductToCart(item));
    dispatch(addToAddedToCartMap(item.id));
  };
 

  const handleProductClick = product => {
    navigation.navigate('productDetail', {product});
  };

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
      dispatch(productListingSuccess(data));

      setLoading(false);
      setProductListing(data);
    } catch (error) {
      console.error('Error fetching ProductListing:', error);
    }
  };

  const renderList = ({item, index}) => {
    return (
      <View style={styles.list}>
        <TouchableOpacity onPress={() => handleProductClick(item)}>
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
            <View style={{marginLeft: 'auto'}}>
              <Button
                onPress={() => handleAddToCart(item)}
                title="Add to Cart"
                disabled={addedToCartMap[item.id]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listing}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backicon} source={images.backarrow} />
        </TouchableOpacity>
        <Title title="Available Products" />
        <View style={styles.cartbutton}>
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <FontAwesomeIcon icon={faShoppingCart} size={25} color="teal" />
          </TouchableOpacity>
          <Text style={styles.cartnumbering}>{cartCount}</Text>
        </View>
      </View>

      <View style={styles.listingcontainer}>
        {!loading ? (
          <FlatList data={productListing} renderItem={renderList} />
        ) : (
          <ProductListingSkeleton />
        )}
      </View>
    </View>
  );
}
