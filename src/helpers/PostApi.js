import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { logToConsole } from '../../ReactotronConfig';

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
    
export const registerUser=async(username, password, firstName,lastName, age, confirmpassword,image,email)=>{
  try{
    const response=await axios.post(`${BASE_URL}/users/add`,{
      username:username,
      password:password,
      firstName,firstName,
      lastName,lastName,
      age:age,
      image:image,
      email:email,
      confirmpassword:confirmpassword
    })
    console.log("registeration data", response.data);
    return response.data
  }catch (error){
    throw error
  }
}
  
