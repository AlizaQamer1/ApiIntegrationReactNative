import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const quotations = async (currentPage = 1) => {
  try {
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    const response = await axios.get(`${BASE_URL}/quotes`, {
      params: {
        limit: limit,
        skip: skip,
      },
    });

    return response.data.quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const productcategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const productlisting = async category => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/category/${category}`,
    );
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const productdetail = async productId => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

export const postlisting = async (currentPage=1) => {
  try {
    const limit = 1;
    const skip = (currentPage - 1) * limit;

    const postresponse = await axios.get(`${BASE_URL}/posts`, {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    const usersResponse = await axios.get(`${BASE_URL}/users`)


    const post=postresponse.data;
    const user=usersResponse.data;
    return {post,user}
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};
