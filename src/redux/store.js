import { combineReducers } from 'redux';
import authReducer from './reducer';
import productReducer from './productReducer';
import postReducer from './postReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product:productReducer,
  post:postReducer,
  cart:cartReducer
});

export default rootReducer;