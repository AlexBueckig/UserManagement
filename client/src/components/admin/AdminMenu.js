/**
 * Created by Alex on 09.11.2016.
 */
import React, {Component} from 'react';

import {Link} from 'react-router';

class AdminMenu extends Component {
    render() {
        return (
            <div className="container-fluid">
                <ul>
                    <li>
                        <Link to="/admin/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AdminMenu;
