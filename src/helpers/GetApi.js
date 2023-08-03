import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';
import { storage } from '../Storage';

const id = storage.getString('id');

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
    const usersResponse = await axios.get(`${BASE_URL}/users`,{
      params:{
        limit:150
      }
    })


    const post=postresponse.data;
    const user=usersResponse.data;
    return {post,user}
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};

export const postdetail = async postId => {
  try {

    const response = await axios.get(`${BASE_URL}/posts/${postId}`);

    const usersResponse = await axios.get(`${BASE_URL}/users`,{
      params:{
        limit:100
      }
    });

    const commentsResponse=await axios.get(`${BASE_URL}/posts/${postId}/comments`);

    const posts = response.data
    const users=usersResponse.data
    const comments=commentsResponse.data

    return {posts,users,comments}
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};

export const userprofile = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);

    const userPostsResponse = await axios.get(
      `${BASE_URL}/posts/user/${userId}`,{
        params:{
          limit:150
        }
      }
    );

    const usersResponse = await axios.get(`${BASE_URL}/users`,{
      params:{
        limit:150
      }
    });
    const userPosts=userPostsResponse.data
    const userinfo=usersResponse.data
    const user=response.data

    return {user,userinfo,userPosts};
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};


export const todo = async () => {
  try {
    const id = storage.getString('id');
    if (!id) {
      throw new Error('User ID not available.');
    }

    const response = await axios.get(`${BASE_URL}/todos/user/${id}`, {
      params: {
        limit: 150,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Todos:', error.message);
    throw error;
  }
};
