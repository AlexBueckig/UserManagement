/**
 * Created by Alex on 03.11.2016.
 */

import { combineReducers } from 'redux';

import auth from './reducers/auth';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
    auth,
    flashMessages
});