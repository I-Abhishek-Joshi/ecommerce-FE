import { CLEAR_CART_QUANTITY, UPDATE_CART_QUANTITY } from "../action/actionTypes";

const initialQuery = {quantity: 0}

const cartQuantityReducer = (state = initialQuery, action) => {
    switch (action.type) {
        case UPDATE_CART_QUANTITY:
            return {quantity: state.quantity + action.payload};
        case CLEAR_CART_QUANTITY:
            return { quantity: 0 }
        default:
            return state;
    }
}

export default cartQuantityReducer;