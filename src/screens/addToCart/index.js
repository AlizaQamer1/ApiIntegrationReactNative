import React, {useState} from 'react';
import styles from './Style';
import {
  FlatList,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Title from '../../components/Title';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

import {images} from '../../assets/images';
import {logToConsole} from '../../../ReactotronConfig';
import {useDispatch} from 'react-redux';
import {
  removeProductFromCart,
  removeFromAddedToCartMap,
  incrementproductincart,
  decrementproductincart,
} from '../../redux/cartactions';

export default function AddToCart({navigation}) {
  const cartProducts = useSelector(state => state.cart.products);
  const quantity = useSelector(state => state.cart.quantity);
  const dispatch = useDispatch();

  const handleRemoveFromCart = productId => {
    dispatch(removeProductFromCart(productId));
    dispatch(removeFromAddedToCartMap(productId));
  };

  logToConsole('products', cartProducts);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backicon} source={images.backarrow} />
        </TouchableOpacity>
        <Title title="Products In Cart" />
      </View>
      <FlatList
        data={cartProducts}
        renderItem={({item, index}) => {
          const newPrice =
            (item.price - item.price * (item.discountPercentage / 100)) *
            item.quantity;
          return (
            <View style={styles.list}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.numbering}>{index + 1}</Text>

                  <Text style={styles.name}>{item.title}</Text>
                </View>

                <Image style={styles.image} source={{uri: item.thumbnail}} />
              </View>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

              <Text style={styles.price}>Price: $ {newPrice.toFixed(2)}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 50,
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => dispatch(incrementproductincart(item.id))}>
                  <FontAwesomeIcon
                    style={styles.plusicon}
                    icon={faPlus}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => dispatch(decrementproductincart(item.id))}>
                  <FontAwesomeIcon
                    style={styles.minusicon}
                    icon={faMinus}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => handleRemoveFromCart(item.id)}
                  title="Remove Item"
                  color="red"
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
