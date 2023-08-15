import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

const BASE_URL = 'https://dummyjson.com';


export const loginUser = async (username, password) => {

      try {
   
        console.log(`Username ${username} Password ${password}`);
       
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          username: username,
          password: password,
        });
       
        
        console.log('API Response:', response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
    

  
