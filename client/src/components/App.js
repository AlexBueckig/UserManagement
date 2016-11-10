import React, {Component} from 'react';
import {Miss} from 'react-router';

import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import NotFound from './NotFound';

import MatchWithSubRoutes from './common/MatchWithSubRoutes';

import routes from '../routes';

class App extends Component {
    render() {
        return (
            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                {routes.map((route, i) => (<MatchWithSubRoutes key={i} {...route}/>))}
                <Miss component={NotFound}/>
            </div>
        );
    }
}

export default App;
