/**
 * Created by Alex on 10.11.2016.
 */
import _ from 'lodash';
import {ADD_PROJECT, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, ADD_USER_TO_PROJECT, DELETE_USER_FROM_PROJECT} from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                [action.project.id]: {
                    id: action.project.id,
                    name: action.project.name,
                    github: action.project.github
                }
            };
        case GET_PROJECTS:
            const projects = _.mapKeys(action.projects, 'id');
            return {
                ...state,
                ...projects
            };
        case GET_PROJECT:
            const {project} = action;
            return {
                ..._.omit(state, project.id),
                [project.id] : {
                    id: project.id,
                    name: project.name,
                    github: project.github,
                    users: _.mapKeys(project.users, 'id')
                }
            };
        case DELETE_PROJECT:
            return _.omit(state, action.id);
        case ADD_USER_TO_PROJECT:
            const {user} = action;
            let returnData = {...state};
            if(returnData[action.id].users)
                returnData[action.id].users[user.id] = user;
            else
                returnData[action.id]["users"] = {[user.id]: user};
            return returnData;
        case DELETE_USER_FROM_PROJECT:
            let returnData2 = {...state};
            returnData2[action.project_id].users = _.omit(returnData2[action.project_id].users, action.user_id);
            return returnData2;
        default:
            return state;
    }
}