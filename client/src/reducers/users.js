/**
 * Created by Alex on 11.11.2016.
 */

import _ from 'lodash';
import {GET_USERS, DELETE_USER} from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case GET_USERS:
            const users = _.mapKeys(action.users, 'id');
            return {
                ...state,
                ...users
            };
        case DELETE_USER:
            return _.omit(state, action.id);
        default:
            return state;
    }
}