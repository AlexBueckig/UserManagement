import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import jwt_decode from 'jwt-decode';
import './styles/index.css';
import 'jquery/jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap';

import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/authActions';
import store from './store';
import routes from './routes';
import NotFound from './components/NotFound';

const history = syncHistoryWithStore(browserHistory, store);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}>
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('root')
);






















