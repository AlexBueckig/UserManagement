/**
 * Created by Alex on 15.11.2016.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getUsers} from '../../../actions/userActions';
import {getProjectWithUsers, addUserToProject, deleteUserFromProject} from '../../../actions/projectActions';
import UserList from '../user/UserList';
import TextFieldGroup from '../../common/TextFieldGroup';
import Modal from '../../common/Modal';

class ProjectEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteUserFromProject = this.deleteUserFromProject.bind(this);
    }

    componentWillMount() {
        this.props.getUsers();
        this.props.getProjectWithUsers(this.props.params.identifier);
    }

    onSubmit(e) {
        e.preventDefault();
        _.map(this.props.users, user => {
                console.log(user);
                if (user.username === this.state.username || user.email === this.state.username) {
                    this.props.addUserToProject(
                        this.props.params.identifier,
                        user
                    );

                }
            }
        );
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    deleteUserFromProject(user_id) {
        this.props.deleteUserFromProject(this.props.params.identifier, user_id);
    }

    render() {
        const {projects} = this.props;
        const {users} = projects[this.props.params.identifier] || {};
        return (
            <div>
                <div className="container-fluid">
                    <h2>Project Information</h2>
                    {projects[this.props.params.identifier] && <div><h3>Projectname:</h3> {projects[this.props.params.identifier].name}</div>}
                    {projects[this.props.params.identifier] && <div><h3>Github:</h3> {projects[this.props.params.identifier].github}</div>}
                </div>
                <div className="divider"></div>
                <UserList users={users} deleteUser={this.deleteUserFromProject}/>
                <Modal formName="addUser" title="Add a user to the project" buttonText="Add User">
                    <form id="addUser" onSubmit={this.onSubmit}>
                        <TextFieldGroup label="Username" onChange={this.onChange} field="username" value={this.state.username}/>
                    </form>
                </Modal>
            </div>
        );
    }
}

ProjectEditPage.propTypes = {
    projects: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    getProjectWithUsers: PropTypes.func.isRequired,
    deleteUserFromProject: PropTypes.func.isRequired
};
ProjectEditPage.defaultProps = {
    users: {},
    projects: {}
};

function mapStateToProps(state) {
    return {
        users: state.users,
        projects: state.projects
    }
}

export default connect(mapStateToProps, {getProjectWithUsers, addUserToProject, deleteUserFromProject, getUsers})(ProjectEditPage);