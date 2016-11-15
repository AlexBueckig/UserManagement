/**
 * Created by Alex on 10.11.2016.
 */
import axios from 'axios';
import {ADD_PROJECT, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, ADD_USER_TO_PROJECT, DELETE_USER_FROM_PROJECT} from './types';

export function addProject(project) {
    const request = axios.post('/api/projects/', {name: project.name, github: project.github});
    return dispatch => {
        return request.then(res => {
            project["id"] = res.data.id;
            console.log(project);
            if (res.data.id) {
                dispatch({
                    type: ADD_PROJECT,
                    project
                });
            }
        });
    };
}

export function fieldExists(identifier) {
    return dispatch => {
        return axios.get(`/api/projects/${identifier}`);
    }
}

export function getProjects() {
    const request = axios.get('/api/projects/');
    return dispatch => {
        return request.then(
            (res) => {
                const {projects} = res.data;
                dispatch({type: GET_PROJECTS, projects});
            },
            (err) => console.log(err)
        );
    };
}

export function deleteProject(id) {
    const request = axios.delete(`/api/projects/${id}`);
    return dispatch => {
        return request.then(res => {
                dispatch({type: DELETE_PROJECT, id});
            },
            err => console.log(err)
        );
    }
}

export function getProjectWithUsers(id) {
    const request = axios.get(`/api/projects/${id}/users`);
    return dispatch => {
        return request.then(res => {
                const {project} = res.data;
                dispatch({type: GET_PROJECT, project});
            },
            err => console.log(err)
        );
    }
}

export function addUserToProject(project_id, user) {
    const request = axios.post(`/api/projects/${project_id}/users`, {user_id: user.id});
    return dispatch => {
        return request.then(res => {
                dispatch({
                    type: ADD_USER_TO_PROJECT,
                    id: project_id,
                    user
                })
            },
            err => console.log(err)
        );
    }
}

export function deleteUserFromProject(project_id, user_id) {
    const request = axios.delete(`/api/projects/${project_id}/users/${user_id}`);
    return dispatch => {
        return request.then(res => {
            dispatch({
                type: DELETE_USER_FROM_PROJECT,
                user_id,
                project_id
            })
        })
    }
}