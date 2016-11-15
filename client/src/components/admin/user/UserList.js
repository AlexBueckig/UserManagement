/**
 * Created by Alex on 11.11.2016.
 */
import React, { Component,
    PropTypes
} from 'react';
import _ from 'lodash';

class UserList extends Component {

    constructor(props) {
        super(props);

        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(e) {
        e.preventDefault();
        this.props.deleteUser(e.target.dataset.id);
    }

    editUser(e) {
        e.preventDefault();
        this.props.editUser(e.target.dataset.id);
    }

    render(){
        const {users, editUser, deleteUser} = this.props;
        return (
            <div className="container-fluid">
                <h2>Users</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        {editUser && <th> </th>}
                        {deleteUser && <th> </th>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        _.map(users, user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                {editUser && <td className="list-button"><div className="glyphicon glyphicon-pencil" data-id={user.id} onClick={this.editUser} > </div></td>}
                                {deleteUser && <td className="list-button"><div className="glyphicon glyphicon-remove glyphicon-color-red" data-id={user.id} onClick={this.deleteUser}> </div></td>}
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.object.isRequired,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func
};
UserList.defaultProps = {
    users: {}
};

export default UserList;
