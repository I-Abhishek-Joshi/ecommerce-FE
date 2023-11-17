import {
  GET_CART_DETAILS_PENDING,
  GET_CART_DETAILS_SUCCESS,
  GET_CART_DETAILS_FAILURE,
} from "../action/actionTypes";

const initialState = {};

const cartDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_DETAILS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartDetails: action.payload
      };
    case GET_CART_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        cartDetails: action.payload
      };
    default:
      return state;
  }
};

export default cartDetailsReducer;
