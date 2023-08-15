import { PRODUCT_CATEGORY_SUCCESS,PRODUCT_LISTING_SUCCESS,PRODUCT_DETAIL_SUCCESS } from "./productactions";


const initialState = {
  productData: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        productData: action.payload,
      };
      case PRODUCT_LISTING_SUCCESS:
        return {
          ...state,
          productData: action.payload,
        };
        case PRODUCT_DETAIL_SUCCESS:
          return{
            ...state,
            productData:action.payload
          }
    default:
      return state;
  }
};

export default productReducer;