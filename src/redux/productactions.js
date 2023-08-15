export const PRODUCT_CATEGORY_SUCCESS = 'PRODUCT_CATEGORY_SUCCESS';
export const PRODUCT_LISTING_SUCCESS = 'PRODUCT_LISTING_SUCCESS';
export const PRODUCT_DETAIL_SUCCESS="PRODUCT_DETAIL_SUCCESS"

export const productCategorySuccess = productData => {
  return {
    type: PRODUCT_CATEGORY_SUCCESS,
    payload: productData,
  };
};


export const productListingSuccess = productData => {
  return {
    type: PRODUCT_LISTING_SUCCESS,
    payload: productData,
  };
};

export const productDetailSuccess = productData => {
  return {
    type: PRODUCT_DETAIL_SUCCESS,
    payload: productData,
  };
};

