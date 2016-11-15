/**
 * Created by Alex on 11.11.2016.
 */

import React, {
    Component,
    PropTypes
} from 'react';
import {connect} from 'react-redux';
import UserList from './UserList';
import {getUsers, deleteUser} from '../../../actions/userActions';

class UserManagementPage extends Component {
    componentWillMount() {
        this.props.getUsers();
    }

    render() {
        const {users, deleteUser} = this.props;
        return (
            <UserList users={users} deleteUser={deleteUser}/>
        );
    }
}

UserManagementPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};
UserManagementPage.defaultProps = {};

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, {getUsers, deleteUser})(UserManagementPage);
