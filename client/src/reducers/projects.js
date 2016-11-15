/**
 * Created by Alex on 10.11.2016.
 */
import _ from 'lodash';
import {ADD_PROJECT, GET_PROJECTS, DELETE_PROJECT} from '../actions/types';

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
        case DELETE_PROJECT:
            return _.omit(state, action.id);
        default:
            return state;
    }
}