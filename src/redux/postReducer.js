import {POST_DETAIL, POST_LISTING} from './postactions';
const initialState = {
  postData: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LISTING:
      return {
        ...state,
        postData: action.payload,
      };
    case POST_DETAIL:
      return {
        ...state,
        postData: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
