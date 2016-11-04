/**
 * Created by Alex on 01.11.2016.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions';

class NavigationBar extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Masterarbeit</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

NavigationBar.propTypes = {};
NavigationBar.defaultProps = {};

export default connect(mapStateToProps, { logout })(NavigationBar);
