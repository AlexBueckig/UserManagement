/**
 * Created by Alex on 09.11.2016.
 */
import React from 'react';
import { Match } from 'react-router';
const MatchWithSubRoutes = (route) => {
    return (
        <Match {...route} render={(props) => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes}/>
        )}/>
    );
};
export default MatchWithSubRoutes;