/**
 * Created by Alex on 03.11.2016.
 */
import shortid from 'shortid';
import _ from 'lodash';

import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            const id = shortid.generate();
            return {
                ...state, [id]: {
                    id: id,
                    type: action.message.type,
                    text: action.message.text,
                }
            };
        case DELETE_FLASH_MESSAGE:
            return _.omit(state, action.id);
        default:
            return state;
    }
}