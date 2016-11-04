/**
 * Created by Alex on 04.11.2016.
 */

import axios from 'axios';

export default function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}