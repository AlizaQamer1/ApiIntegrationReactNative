export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_ADDED_TO_CART_MAP = 'ADD_TO_ADDED_TO_CART_MAP';
export const REMOVE_FROM_ADDED_TO_CART_MAP='REMOVE_FROM_ADDED_TO_CART_MAP'
export const INCREMENT_PRODUCT='INCREMENT_PRODUCT'
export const DECREMENT_PRODUCT='DECREMENT_PRODUCT'

export const addProductToCart = product => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeProductFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};

export const addToAddedToCartMap = id => {
  return {
    type: ADD_TO_ADDED_TO_CART_MAP,
    id,
  };
};

export const removeFromAddedToCartMap = productId => {
  return {
    type: REMOVE_FROM_ADDED_TO_CART_MAP,
    id: productId,
  };
};

export const incrementproductincart=id=>{
    return{
        type:INCREMENT_PRODUCT,
        id
    }
}

export const decrementproductincart=id=>{
    return{
        type:DECREMENT_PRODUCT,
        id
    }
}