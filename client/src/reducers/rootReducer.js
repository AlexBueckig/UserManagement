/**
 * Created by Alex on 03.11.2016.
 */

import { combineReducers } from 'redux';

import auth from './auth';
import flashMessages from './flashMessages';
import projects from './projects';
import users from './users';

export default combineReducers({
    auth,
    flashMessages,
    projects,
    users
});