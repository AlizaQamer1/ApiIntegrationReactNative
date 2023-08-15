import React from 'react';
import axios from 'axios';
import {storage} from '../Storage';
import NetInfo from '@react-native-community/netinfo';
const BASE_URL = 'https://dummyjson.com';
import {Text} from 'react-native';

const getAPiResponse = (
  statusCode,
  success,
  message,
  data,
  isSessionExpired,
  isNetworkError,
) => {
  return {
    statusCode,
    success,
    message,
    data,
    isSessionExpired,
    isNetworkError,
  };
};

const callApi = async (url, params) => {
  const netInfoState = await NetInfo.fetch();

  if (netInfoState.isConnected) {
    const response = await axios.get(url, {...params});
    if (response.status === 200)
      return getAPiResponse(200, true, '', response.data, false, false);
    else if (response.status === 401) {
      return getAPiResponse(0, false, 'Session Expired', null, true, false);
    }
  } else {
    return getAPiResponse(
      0,
      false,
      'Internet not available',
      null,
      false,
      true,
    );
  }
};

export const quotations = async (currentPage = 1) => {
  try {
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    const response = await callApi(`${BASE_URL}/quotes`, {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    console.log(response);

    if (response.success) {
      return response.data.quotes;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const productcategories = async () => {
  try {
    const response = await callApi(`${BASE_URL}/products/categories`);
    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);

    throw error;
  }
};

export const productlisting = async category => {
  try {
    const response = await callApi(`${BASE_URL}/products/category/${category}`);
    if (response.success) {
      return response.data.products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const productdetail = async productId => {
  try {
    const response = await callApi(`${BASE_URL}/products/${productId}`);
    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

// export const postlisting = async (currentPage=1) => {
//   try {
//     const limit = 1;
//     const skip = (currentPage - 1) * limit;

//     const postresponse = await callApi(`${BASE_URL}/posts`, {
//       params: {
//         limit: limit,
//         skip: skip,
//       },
//     });
//     const usersResponse = await callApi(`${BASE_URL}/users`,{
//       params:{
//         limit:150
//       }
//     })

//     const post=postresponse.data;
//     const user=usersResponse.data;

//     return {post,user}

//   } catch (error) {
//     console.error('Error fetching posts', error);
//   }
// };

export const postlisting = async (currentPage = 1) => {
  try {
    const limit = 1;
    const skip = (currentPage - 1) * limit;

    const postresponse = await callApi(`${BASE_URL}/posts`, {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    const usersResponse = await callApi(`${BASE_URL}/users`, {
      params: {
        limit: 150,
      },
    });

    if (postresponse.success && usersResponse.success) {
      const post = postresponse.data;
      const user = usersResponse.data;
      return {post, user};
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching posts', error);
    return {};
  }
};

export const postdetail = async postId => {
  try {
    const response = await callApi(`${BASE_URL}/posts/${postId}`);

    const usersResponse = await callApi(`${BASE_URL}/users`, {
      params: {
        limit: 100,
      },
    });

    const commentsResponse = await callApi(
      `${BASE_URL}/posts/${postId}/comments`,
    );

    if(response.success && usersResponse.success && commentsResponse.success){

    const posts = response.data;
    const users = usersResponse.data;
    const comments = commentsResponse.data;

    return {posts, users, comments};
    }else{
      return {}
    }
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};

export const userprofile = async userId => {
  try {
    const response = await callApi(`${BASE_URL}/users/${userId}`);

    const userPostsResponse = await callApi(
      `${BASE_URL}/posts/user/${userId}`,
      {
        params: {
          limit: 150,
        },
      },
    );

    const usersResponse = await callApi(`${BASE_URL}/users`, {
      params: {
        limit: 150,
      },
    });
    if(response.success && userPostsResponse.success && usersResponse.success){
    const userPosts = userPostsResponse.data;
    const userinfo = usersResponse.data;
    const user = response.data;

    return {user, userinfo, userPosts};
    }else{
      return {}
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

export const todo = async () => {
  try {
    const id = storage.getString('id');
    console.log(id);
    if (!id) {
      throw new Error('User ID not available.');
    }

    const response = await callApi(`${BASE_URL}/todos/user/${id}`, {
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
