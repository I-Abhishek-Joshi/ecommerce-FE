import { UPDATE_SHOP_QUERY } from "../action/actionTypes";

const initialQuery = {}

const queryReducer = (state = initialQuery, action) => {
    switch (action.type) {
        case UPDATE_SHOP_QUERY:
            return {...action.payload};
        default:
            return state;
    }
}

export default queryReducer;