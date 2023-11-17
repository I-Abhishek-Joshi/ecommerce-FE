import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_PENDING,
    GET_PRODUCT_SUCCESS,
  } from "../action/actionTypes";
  
  const initialQuery = {};
  
  const productDetailsReducer = (state = initialQuery, action) => {
    switch (action.type) {
      case GET_PRODUCT_SUCCESS:
        return {
          ...state,
          productDetails: action.payload,
          loading: false,
        };
      case GET_PRODUCT_FAILURE:
        return {
          ...state,
          productDetails: action.payload,
          loading: false,
        };
      case GET_PRODUCT_PENDING:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };
  
  export default productDetailsReducer;
  