import { combineReducers } from 'redux';
import authReducer from './reducer';
import productReducer from './productReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product:productReducer,
  post:postReducer
});

export default rootReducer;