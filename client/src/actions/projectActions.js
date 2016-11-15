/**
 * Created by Alex on 10.11.2016.
 */
import axios from 'axios';
import { ADD_PROJECT, GET_PROJECTS, DELETE_PROJECT } from './types';

export function addProject(project) {
    const request = axios.post('/api/projects/', {name: project.name, github: project.github});
    return dispatch => {
        return request.then(res => {
            project["id"] = res.data.id;
            console.log(project);
            if(res.data.id) {
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
            err => console.log(err));
    }
}