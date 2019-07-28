import axios from 'axios';
import History from '../history.js';
import Qs from 'qs';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_PREFERED_SHOPS,
    FETCH_GEOSORTED_SHOPS,
    UPDATE_SHOP_LIKE_STATUS
} from './types';



const ROOT_URL = 'http://localhost:8080/api';

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/auth/login`, { email, password })
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', response.data.token);

                // - redirect to the route '/geoSortedShops'
                History.push('/');

            }).catch(() => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    };
};

export const signupUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/auth/register`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                History.push('/');
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};

export const fetchGeolocatedShops = (page ,size ,longitude,latitude) => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/shops/geoSorted?page=${page}&size=${size}&longitude=${longitude}&latitude=${latitude}`, {
            headers: { authorization: "Bearer " +localStorage.getItem('token')  },
          
        })
        .then(response =>{
            dispatch({
                type: FETCH_GEOSORTED_SHOPS,
                payload: response.data
             });
        });
    };
};

export const fetchPreferedShops = (page ,size ,longitude,latitude) => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/shops/prefered?page=${page}&size=${size}&longitude=${longitude}&latitude=${latitude}`, {
            headers: { authorization: "Bearer " + localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_PREFERED_SHOPS,
                payload: response.data
             });
        });
    };
};
const config = {
    headers: {
        authorization:  "Bearer " + localStorage.getItem('token')
    }
};
export const updateShopLikeStatus = (status,id) => {
    return (dispatch) => {
              axios.put(`${ROOT_URL}/shops/likeStatus?likeStatus=${status}&shopId=${id}`, {}  ,config)
            .then(response => {
                dispatch({ 
                    type: UPDATE_SHOP_LIKE_STATUS,
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};
