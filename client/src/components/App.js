import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import NavigationBar from './NavigationBar';
import SignupPage from './signup/SignupPage';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="container">
                <NavigationBar />
                <Match exactly pattern="/" render={() => (<div className="jumbotron"><h1>Home!</h1></div>)} />
                <Match pattern="/signup" component={SignupPage} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
