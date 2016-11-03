/**
 * Created by Alex on 03.11.2016.
 */

import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}