import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_ADDED_TO_CART_MAP,
  REMOVE_FROM_ADDED_TO_CART_MAP,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
} from './cartactions';
const initialState = {
  products: [],
  addedToCartMap: {},
  cartCount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedProducts = state.products.concat({
        ...action.product,
        selected: true,
        quantity: 1,
      });
      return {
        ...state,
        products: updatedProducts,
        cartCount: state.cartCount + 1,
      };

    case REMOVE_FROM_CART:
      const updateProducts = state.products.filter(
        product => product.id !== action.id,
      );
      const updatedAddedToCartMap = {...state.addedToCartMap};
      delete updatedAddedToCartMap[action.id];

      return {
        ...state,
        products: updateProducts,
        cartCount: state.cartCount - 1,
        addedToCartMap: updatedAddedToCartMap,
      };

    case REMOVE_FROM_ADDED_TO_CART_MAP:
      const updatedAddToCartMap = {...state.addedToCartMap};
      delete updatedAddToCartMap[action.id];
      return {
        ...state,
        addedToCartMap: updatedAddToCartMap,
      };

    case ADD_TO_ADDED_TO_CART_MAP:
      return {
        ...state,
        addedToCartMap: {
          ...state.addedToCartMap,
          [action.id]: true,
        },
      };

    case INCREMENT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id
            ? {...product, quantity: product.quantity + 1}
            : product,
        ),
      };

   
    case DECREMENT_PRODUCT:
      const updatedProductsAfterDecrement = state.products.map((product) =>
        product.id === action.id
          ? {
              ...product,
              quantity: product.quantity > 1 ? product.quantity - 1 : 0,
            }
          : product
      );
      const updatedProductsAfterRemove = updatedProductsAfterDecrement.filter(
        (product) => product.quantity > 0
      );
      return {
        ...state,
        products: updatedProductsAfterRemove,
        cartCount: updatedProductsAfterRemove.length,
      };
    
    

    default:
      return state;
  }
};

export default cartReducer;
