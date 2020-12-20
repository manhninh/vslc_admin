import {LIST_CATEGORY_API} from '../actions/actionTypes';

const initialState = {
  listCategory: [],
};

export default function(state = initialState, action) {
  const {type, response} = action;
  switch (type) {
    case LIST_CATEGORY_API.SUCCESS: {
      return {
        ...state,
        listCategory: response,
      };
    }
    default:
      return state;
  }
}
