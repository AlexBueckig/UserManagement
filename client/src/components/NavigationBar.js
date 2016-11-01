/**
 * Created by Alex on 01.11.2016.
 */
import React from 'react';
import { Link } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Masterarbeit</Link>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup">Sign up</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
