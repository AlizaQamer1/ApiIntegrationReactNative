import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const quotations = async (currentPage) => {
    try {
      const limit = 10;
      const skip = (currentPage - 1) * limit;
  
      const response = await axios.get(`${BASE_URL}/quotes`);
      return response.data.quotes; 
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };