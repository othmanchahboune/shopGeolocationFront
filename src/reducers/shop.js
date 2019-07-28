import {
    FETCH_GEOSORTED_SHOPS,
    FETCH_PREFERED_SHOPS,
    UPDATE_SHOP_LIKE_STATUS
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_GEOSORTED_SHOPS:
            return { ...state, geoSortedShops: action.payload}
        case FETCH_PREFERED_SHOPS :
        return { ...state, preferedShops: action.payload}
        case UPDATE_SHOP_LIKE_STATUS :
        return {...state ,updatedShop :action.payload}
        default:
            return state;
    }
};
