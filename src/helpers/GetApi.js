
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

  
  export const productlisting = async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  