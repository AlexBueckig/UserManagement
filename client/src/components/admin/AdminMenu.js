/**
 * Created by Alex on 09.11.2016.
 */
import React, { Component } from 'react';

import {Link} from 'react-router';

class AdminMenu extends Component {
    render() {
        return (
            <div><Link to="/admin/projects">Projects</Link></div>
        );
    }
}

export default AdminMenu;
