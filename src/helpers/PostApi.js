import axios from 'axios';
import { storage } from '../Storage';

const BASE_URL =
  'http://ec2-18-144-155-86.us-west-1.compute.amazonaws.com:3000';
// http://ec2-18-144-155-86.us-west-1.compute.amazonaws.com:3000
const token=storage.getString("token")
export const loginUser = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    console.log('email,password', email, password);
    const response = await axios.post(`${BASE_URL}/auth/signin`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  userName,
  password,
  firstName,
  lastName,
  age,
  email,
  gender,
  phone,
  maidenName,
  userRole
) => {
  try {
    
    const data = {
      userName: userName,
      password: password,
      firstName:firstName,
      lastName:lastName,
      age: parseInt(age),
      email: email,
      gender:gender,
      phone:phone,
      maidenName:maidenName,
      userRole:userRole,
     
    };

    console.log(' data axios : ', data)
    const response = await axios.post(`${BASE_URL}/auth/signup`, data, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization':`Bearer ${token}`
      },
    });
    console.log('registeration data', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
