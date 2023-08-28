import { combineReducers } from 'redux';
import authReducer from './reducer';
import productReducer from './productReducer';
import postReducer from './postReducer';
import cartReducer from './cartReducer';

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  post: postReducer,
  cart: cartReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
