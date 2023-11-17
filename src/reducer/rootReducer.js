import { combineReducers } from "redux";
import queryReducer from "./queryReducer";
import productListReducer from "./productListReducer";
import productDetailsReducer from "./productDetailReducer";
import cartQuantityReducer from "./cartQuantityReducer";
import cartDetailsReducer from "./cartDetailsReducer";

const rootReducer = combineReducers({
    query: queryReducer,
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartQuantityReducer,
    cartDetails: cartDetailsReducer
})

export default rootReducer;