/**
 * Created by Alex on 09.11.2016.
 */
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import AdminPage from './components/admin/AdminPage';
import IndexPage from './components/IndexPage'
import ProjectsPage from './components/projects/ProjectsPage';
import ProjectManagementPage from './components/admin/project/ProjectManagementPage';
import AdminMenu from './components/admin/AdminMenu';

import requireAuth from './utils/requireAuth';

const routes = [
    {
        pattern: '/',
        component: IndexPage,
        exactly: true
    },
    {
        pattern: '/admin',
        component: AdminPage,
        routes: [
            {
                pattern: '/admin',
                exactly: true,
                component: requireAuth(AdminMenu, true)
            },
            {
                pattern: '/admin/projects',
                component: requireAuth(ProjectManagementPage, true)
            }
        ]
    },
    {
        pattern: '/myprojects',
        component: requireAuth(ProjectsPage)
    },
    {
        pattern: '/signup',
        component: SignupPage
    },
    {
        pattern: '/login',
        component: LoginPage
    }
];

export default routes;