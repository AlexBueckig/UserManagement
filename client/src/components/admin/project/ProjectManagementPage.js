/**
 * Created by Alex on 09.11.2016.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ProjectAddForm from './ProjectAddForm';
import ProjectsList from './ProjectsList';
import Modal from '../../common/Modal';
import {addProject, fieldExists, getProjects, deleteProject} from '../../../actions/projectActions';
import {addFlashMessage} from '../../../actions/flashMessages';

class ProjectManagementPage extends Component {
    componentWillMount() {
        this.props.getProjects();
    }

    render() {
        const {addProject, fieldExists, addFlashMessage, projects, deleteProject} = this.props;
        return (
            <div className="row">
                <div className="col-md-12 ">
                    <ProjectsList projects={projects} deleteProject={deleteProject}/>
                </div>
                <div className="col-md-12 ">
                    <Modal formName="testForm" title="Add a new project" buttonText='Add new Project'>
                        <ProjectAddForm formName="testForm" addProject={addProject} fieldExists={fieldExists} addFlashMessage={addFlashMessage}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projects
    };
}

ProjectManagementPage.propTypes = {
    addProject: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    fieldExists: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {addProject, addFlashMessage, fieldExists, getProjects, deleteProject})(ProjectManagementPage);