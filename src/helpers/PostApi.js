
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


