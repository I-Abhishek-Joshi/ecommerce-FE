import {
  GET_PRODUCTLIST_FAILURE,
  GET_PRODUCTLIST_PENDING,
  GET_PRODUCTLIST_SUCCESS,
} from "../action/actionTypes";

const initialQuery = {};

const productListReducer = (state = initialQuery, action) => {
  switch (action.type) {
    case GET_PRODUCTLIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case GET_PRODUCTLIST_FAILURE:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case GET_PRODUCTLIST_PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default productListReducer;
