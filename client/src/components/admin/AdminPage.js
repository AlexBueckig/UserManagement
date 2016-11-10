/**
 * Created by Alex on 01.11.2016.
 */
import React from 'react';
import MatchWithSubRoutes from '../common/MatchWithSubRoutes';

const AdminPage = ({routes}) => {
    return (
        <div className="jumbotron">
            {
                routes.map((route, i) => (
                    <MatchWithSubRoutes key={i} {...route}/>
                ))
            }
        </div>
    );
};

export default AdminPage;

