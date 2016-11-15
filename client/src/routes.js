/**
 * Created by Alex on 09.11.2016.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
//import AdminPage from './components/admin/AdminPage';
import IndexPage from './components/IndexPage'
//import ProjectsPage from './components/projects/ProjectsPage';
//import ProjectManagementPage from './components/admin/project/ProjectManagementPage';
//import AdminMenu from './components/admin/AdminMenu';
//import UserManagementPage from './components/admin/user/UserManagementPage';


//import requireAuth from './utils/requireAuth';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={IndexPage}/>
        <Route path="login" component={LoginPage}/>
        <Route path="signup" component={SignupPage}/>
    </Route>
);

export default routes;