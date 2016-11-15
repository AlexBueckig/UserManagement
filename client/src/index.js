import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router';
import jwt_decode from 'jwt-decode';

import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/authActions';
import store from './store';

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
