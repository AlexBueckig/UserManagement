/**
 * Created by Alex on 04.11.2016.
 */

import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('/api/auth', data);
    };
}