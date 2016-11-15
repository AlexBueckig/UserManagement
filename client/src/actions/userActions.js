/**
 * Created by Alex on 11.11.2016.
 */

import axios from 'axios';

import {GET_USERS, DELETE_USER} from '../actions/types';

export function getUsers() {
    const request = axios.get('/api/users/');
    return dispatch => {
        return request.then(res => {
                const {users} = res.data;
                dispatch({type: GET_USERS, users});
            }
        );
    }
}

export function deleteUser(id) {
    const request = axios.delete(`/api/users/${id}`);
    return dispatch => {
        return request.then(res => {
            dispatch({type: DELETE_USER, id});
        },
        err => console.log(err));
    }
}