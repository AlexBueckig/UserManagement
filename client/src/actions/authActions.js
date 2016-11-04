/**
 * Created by Alex on 04.11.2016.
 */

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function login(data) {
    return dispatch => {
        return axios.post('/api/auth', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt_decode(token)));
        });
    };
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}