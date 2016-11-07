import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import requireAuth from '../utils/requireAuth';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import NotFound from './NotFound';
import Greetings from './Greetings';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                <Match exactly pattern="/" render={() => (<div className="jumbotron"><h1>Home!</h1></div>)} />
                <Match pattern="/signup" component={SignupPage} />
                <Match pattern="/login" component={LoginPage} />
                <Match pattern="/greetings" component={requireAuth(Greetings, true)} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
