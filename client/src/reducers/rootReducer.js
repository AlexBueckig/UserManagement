/**
 * Created by Alex on 03.11.2016.
 */

import { combineReducers } from 'redux';

import auth from './auth';
import flashMessages from './flashMessages';

export default combineReducers({
    auth,
    flashMessages
});