/**
 * Created by Alex on 01.11.2016.
 */
import React from 'react';
import MatchWithSubRoutes from '../common/MatchWithSubRoutes';

const AdminPage = ({routes}) => {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {
                    routes.map((route, i) => (
                        <MatchWithSubRoutes key={i} {...route}/>
                    ))
                }
            </div>
        </div>
    );
};

export default AdminPage;